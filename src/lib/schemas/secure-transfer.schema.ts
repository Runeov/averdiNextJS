import { z } from 'zod';

export const transferMetadataSchema = z.object({
  senderName: z.string().min(1, 'Navn er påkrevd'),
  orgNumber: z
    .string()
    .regex(/^\d{9}$/, 'Organisasjonsnummer må være 9 siffer'),
  timestamp: z.string().datetime(),
  dataType: z.enum(['vipps-config', 'api-credentials', 'document', 'other']),
  fileCount: z.number().int().min(0),
  description: z.string().optional(),
});

export const secureTransferFormSchema = z.object({
  senderName: z.string().min(1, 'Navn er påkrevd'),
  orgNumber: z
    .string()
    .regex(/^\d{9}$/, 'Organisasjonsnummer må være 9 siffer'),
  dataType: z.enum(['vipps-config', 'api-credentials', 'document', 'other']),
  description: z.string().optional(),
  message: z.string().optional(),
});

export type TransferMetadataInput = z.infer<typeof transferMetadataSchema>;
export type SecureTransferFormInput = z.infer<typeof secureTransferFormSchema>;
