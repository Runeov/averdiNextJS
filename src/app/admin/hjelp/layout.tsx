import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brukerveiledning — Averdi Admin',
  robots: 'noindex, nofollow',
};

export default function HjelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
