
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_FORM_TO_EMAIL || 'ditt-email@example.com';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Börsanalys.se <noreply@borsanalys.se>',
      to: [toEmail],
      subject: `Nytt meddelande från ${name} via Börsanalys.se`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Nytt meddelande från kontaktformuläret</h2>
          <p><strong>Namn:</strong> ${name}</p>
          <p><strong>E-post:</strong> ${email}</p>
          <hr>
          <h3>Meddelande:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!', data });
  } catch (e) {
    const error = e as Error;
    console.error("Contact form error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
