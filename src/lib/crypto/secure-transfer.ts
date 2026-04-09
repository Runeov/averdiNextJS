/**
 * Core encryption/decryption and .averdi file format handling.
 * Uses Web Crypto API only — zero dependencies.
 */

import { ALGORITHM, IV_LENGTH, MAGIC_BYTES, MAX_TOTAL_SIZE } from './constants';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TransferMetadata {
  senderName: string;
  orgNumber: string;
  timestamp: string;
  dataType: 'vipps-config' | 'api-credentials' | 'document' | 'other';
  fileCount: number;
  description?: string;
  /** Base64-encoded per-file PBKDF2 salt for PIN-based key derivation. */
  keySalt: string;
}

export interface PayloadItem {
  type: 'text' | 'file';
  name: string;
  mimeType: string;
  data: Uint8Array;
}

// ---------------------------------------------------------------------------
// Encrypt / Decrypt
// ---------------------------------------------------------------------------

/** Encrypts raw bytes with AES-256-GCM. Returns IV + ciphertext (with appended auth tag). */
export async function encryptPayload(
  key: CryptoKey,
  data: ArrayBuffer
): Promise<{ iv: Uint8Array<ArrayBuffer>; ciphertext: ArrayBuffer }> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH)) as Uint8Array<ArrayBuffer>;
  const ciphertext = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    data
  );
  return { iv, ciphertext };
}

/** Decrypts AES-256-GCM ciphertext. Throws if the passphrase or data is wrong (auth tag failure). */
export async function decryptPayload(
  key: CryptoKey,
  iv: Uint8Array<ArrayBuffer>,
  ciphertext: ArrayBuffer
): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt({ name: ALGORITHM, iv }, key, ciphertext);
}

// ---------------------------------------------------------------------------
// Multi-item payload packing
// ---------------------------------------------------------------------------

/**
 * Packs multiple PayloadItems into a single binary buffer.
 *
 * Format per item:
 *   [4 bytes: header JSON length (uint32 BE)]
 *   [N bytes: header JSON — { type, name, mimeType, dataLength }]
 *   [M bytes: raw data]
 */
export function packPayload(items: PayloadItem[]): ArrayBuffer {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];

  for (const item of items) {
    const header = encoder.encode(
      JSON.stringify({
        type: item.type,
        name: item.name,
        mimeType: item.mimeType,
        dataLength: item.data.byteLength,
      })
    );

    // 4-byte header length prefix
    const lenBuf = new ArrayBuffer(4);
    new DataView(lenBuf).setUint32(0, header.byteLength, false);

    chunks.push(new Uint8Array(lenBuf), header, item.data);
  }

  // Concatenate all chunks
  const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0);
  if (totalLength > MAX_TOTAL_SIZE) {
    throw new Error(`Payload exceeds ${MAX_TOTAL_SIZE / 1024 / 1024} MB limit`);
  }

  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return result.buffer;
}

/** Unpacks a binary buffer back into PayloadItems. */
export function unpackPayload(buffer: ArrayBuffer): PayloadItem[] {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  const decoder = new TextDecoder();
  const items: PayloadItem[] = [];
  let offset = 0;

  while (offset < buffer.byteLength) {
    // Read header length
    const headerLen = view.getUint32(offset, false);
    offset += 4;

    // Read header JSON
    const headerBytes = bytes.slice(offset, offset + headerLen);
    const header = JSON.parse(decoder.decode(headerBytes));
    offset += headerLen;

    // Read data
    const data = new Uint8Array(bytes.slice(offset, offset + header.dataLength));
    offset += header.dataLength;

    items.push({
      type: header.type,
      name: header.name,
      mimeType: header.mimeType,
      data,
    });
  }

  return items;
}

// ---------------------------------------------------------------------------
// .averdi file format
// ---------------------------------------------------------------------------

/**
 * Builds a downloadable .averdi Blob from metadata + encrypted payload.
 *
 * Layout:
 *   [6 bytes]  Magic "AVRD01"
 *   [4 bytes]  Metadata JSON length (uint32 big-endian)
 *   [N bytes]  Metadata JSON (UTF-8, unencrypted)
 *   [12 bytes] IV
 *   [rest]     Ciphertext + GCM auth tag
 */
export function buildAverdiFile(
  metadata: TransferMetadata,
  iv: Uint8Array<ArrayBuffer>,
  ciphertext: ArrayBuffer
): Blob {
  const encoder = new TextEncoder();
  const metaBytes = encoder.encode(JSON.stringify(metadata));

  const metaLenBuf = new ArrayBuffer(4);
  new DataView(metaLenBuf).setUint32(0, metaBytes.byteLength, false);

  return new Blob(
    [MAGIC_BYTES, metaLenBuf, metaBytes, iv, ciphertext],
    { type: 'application/octet-stream' }
  );
}

/**
 * Parses an .averdi file buffer back into its components.
 * Throws on invalid magic bytes.
 */
export function parseAverdiFile(buffer: ArrayBuffer): {
  metadata: TransferMetadata;
  iv: Uint8Array<ArrayBuffer>;
  ciphertext: ArrayBuffer;
} {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);

  // Verify magic bytes
  for (let i = 0; i < MAGIC_BYTES.length; i++) {
    if (bytes[i] !== MAGIC_BYTES[i]) {
      throw new Error('Ugyldig fil — dette er ikke en .averdi-fil');
    }
  }

  let offset = MAGIC_BYTES.length;

  // Read metadata length
  const metaLen = view.getUint32(offset, false);
  offset += 4;

  // Read metadata JSON
  const metaBytes = bytes.slice(offset, offset + metaLen);
  const metadata: TransferMetadata = JSON.parse(new TextDecoder().decode(metaBytes));
  offset += metaLen;

  // Read IV (12 bytes)
  const ivSlice = bytes.slice(offset, offset + IV_LENGTH);
  const iv = new Uint8Array(ivSlice.length) as Uint8Array<ArrayBuffer>;
  iv.set(ivSlice);
  offset += IV_LENGTH;

  // Remaining bytes = ciphertext + GCM auth tag
  const ciphertext = buffer.slice(offset);

  return { metadata, iv, ciphertext };
}
