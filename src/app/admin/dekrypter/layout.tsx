import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dekrypter — Averdi Admin',
  robots: 'noindex, nofollow',
};

export default function DekrypterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
