import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const RECIPIENT_EMAIL = 'post@averdi.no';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'noreply@averdi.no';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'E-posttjenesten er ikke konfigurert.' },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Navn, e-post og melding er påkrevd.' },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: `Averdi Kontaktskjema <${FROM_EMAIL}>`,
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `Ny henvendelse fra ${name}${company ? ` (${company})` : ''}`,
      html: `
        <h2>Ny henvendelse via kontaktskjemaet</h2>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Bedrift:</strong> ${company}</p>` : ''}
        <hr>
        <p><strong>Melding:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Sendt fra kontaktskjemaet på averdi.no
        </p>
      `,
    });

    if (error) {
      console.error('Resend contact form error:', JSON.stringify(error));
      return NextResponse.json(
        { error: 'Kunne ikke sende meldingen. Prøv igjen.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'En feil oppsto. Prøv igjen.' },
      { status: 500 }
    );
  }
}
