/**
 * Constants for the Averdi secure transfer system (.averdi file format).
 * Uses Web Crypto API — no external dependencies.
 */

/** Magic bytes identifying an .averdi encrypted file (ASCII "AVRD01") */
export const MAGIC_BYTES = new Uint8Array([0x41, 0x56, 0x52, 0x44, 0x30, 0x31]);

/** AES-256-GCM configuration */
export const ALGORITHM = 'AES-GCM' as const;
export const KEY_LENGTH = 256;
export const IV_LENGTH = 12; // 96 bits, recommended for GCM
export const TAG_LENGTH = 128; // GCM auth tag bits (appended automatically by Web Crypto)

/** PBKDF2 configuration for deriving AES key from PIN */
export const PBKDF2_ITERATIONS = 600_000; // OWASP 2023 recommendation
export const PBKDF2_HASH = 'SHA-256' as const;
/** Length of random per-file salt for PBKDF2 (bytes). Prevents pre-computation attacks. */
export const PBKDF2_SALT_LENGTH = 16;

/** Payload limits */
export const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25 MB

/** PIN configuration */
export const PIN_LENGTH = 6;
