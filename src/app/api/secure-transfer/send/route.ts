import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSiteUrl } from '@/lib/site-url';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = process.env.SECURE_TRANSFER_RECIPIENT || 'support@averdi.no';
const FROM_EMAIL = process.env.SECURE_TRANSFER_FROM || 'sikker@averdi.no';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const senderName = formData.get('senderName') as string;
    const orgNumber = formData.get('orgNumber') as string;
    const description = formData.get('description') as string;
    const recipientOverride = formData.get('recipient') as string | null;

    if (!file || !senderName || !orgNumber) {
      return NextResponse.json(
        { error: 'Mangler påkrevde felt (fil, navn, orgnummer)' },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const recipient = recipientOverride || RECIPIENT_EMAIL;
    const isExternalRecipient = !!recipientOverride;
    const siteUrl = getSiteUrl();

    // External recipients (partners) get the public /dekrypter link.
    // Internal (Averdi) recipients get the admin /admin/dekrypter link.
    const decryptUrl = isExternalRecipient
      ? `${siteUrl}/dekrypter`
      : `${siteUrl}/admin/dekrypter`;

    const { error } = await resend.emails.send({
      from: `Averdi Sikker Overlevering <${FROM_EMAIL}>`,
      to: [recipient],
      subject: `Sikker overlevering fra ${senderName} (${orgNumber})`,
      html: `
        <h2>Kryptert fil mottatt</h2>
        <p><strong>Avsender:</strong> ${senderName}</p>
        <p><strong>Org.nr:</strong> ${orgNumber}</p>
        ${description ? `<p><strong>Beskrivelse:</strong> ${description}</p>` : ''}
        <p>Vedlagt finner du en kryptert <code>.averdi</code>-fil. Dekrypteringskoden mottas via telefon eller SMS.</p>
        <p>Dekrypter filen her: <a href="${decryptUrl}">${decryptUrl}</a></p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Denne e-posten ble sendt automatisk fra Averdi Sikker Overlevering.
          Filen er kryptert med AES-256-GCM og kan ikke leses uten dekrypteringskoden.
        </p>
      `,
      attachments: [
        {
          filename: file.name,
          content: fileBuffer,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error));
      return NextResponse.json(
        { error: `E-post feilet: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Secure transfer send error:', err);
    return NextResponse.json(
      { error: 'En feil oppsto. Prøv igjen eller last ned filen manuelt.' },
      { status: 500 }
    );
  }
}
