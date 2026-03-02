import { NextResponse } from 'next/server';

function isTrue(value: string | undefined): boolean {
  if (!value) return false;
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

/**
 * In production, writes are enabled unless explicitly disabled.
 * Set ADMIN_WRITE_ENABLED=false to force read-only mode.
 */
export function isAdminWriteEnabled(): boolean {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  const configured = process.env.ADMIN_WRITE_ENABLED;

  // Default to enabled when not configured
  if (!configured || configured.trim() === '') {
    return true;
  }

  return isTrue(configured);
}

export function getAdminReadOnlyResponse(): NextResponse | null {
  if (isAdminWriteEnabled()) {
    return null;
  }

  return NextResponse.json(
    {
      success: false,
      error:
        'Admin skriveoperasjoner er deaktivert i produksjon (ADMIN_WRITE_ENABLED=false).',
    },
    { status: 403 }
  );
}
