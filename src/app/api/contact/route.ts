import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createRateLimiter } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_FORM_TO_EMAIL;

const checkRateLimit = createRateLimiter({ limit: 5, windowSeconds: 60 });

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  const rateLimitResponse = checkRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    if (!toEmail) {
      logger.error("CONTACT_FORM_TO_EMAIL is not configured");
      return NextResponse.json({ error: 'Serverkonfiguration saknas.' }, { status: 500 });
    }

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Alla fält är obligatoriska.' }, { status: 400 });
    }

    if (typeof name !== 'string' || name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: 'Ogiltigt namn.' }, { status: 400 });
    }

    if (typeof email !== 'string' || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Ogiltig e-postadress.' }, { status: 400 });
    }

    if (typeof message !== 'string' || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: 'Meddelandet är för långt.' }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const { data, error } = await resend.emails.send({
      from: 'Börsanalys.se <noreply@borsanalys.se>',
      to: [toEmail],
      subject: `Nytt meddelande från ${safeName} via Börsanalys.se`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Nytt meddelande från kontaktformuläret</h2>
          <p><strong>Namn:</strong> ${safeName}</p>
          <p><strong>E-post:</strong> ${safeEmail}</p>
          <hr>
          <h3>Meddelande:</h3>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      logger.error("Resend API error", { error: String(error) });
      return NextResponse.json({ error: 'Kunde inte skicka meddelandet.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Meddelandet har skickats!' });
  } catch (error: unknown) {
    logger.error("Contact form error", { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Ett oväntat fel uppstod.' }, { status: 500 });
  }
}
