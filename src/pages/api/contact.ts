import type { APIRoute } from 'astro';

// Seule route rendue à la demande du site.
export const prerender = false;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// import.meta.env ne porte que ce qui est connu au build (fichier .env local).
// Une variable posée dans le tableau de bord Vercel n'arrive qu'au runtime,
// dans process.env. On lit les deux, dans cet ordre. Vérifié : sans ce repli,
// la route répond 503 alors que les variables sont bien posées.
const readEnv = (name: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[name] ??
  (typeof process !== 'undefined' ? process.env?.[name] : undefined);

export const POST: APIRoute = async ({ request }) => {
  const key = readEnv('RESEND_API_KEY');
  const to = readEnv('CONTACT_TO');

  let payload: Record<string, string>;
  try {
    const form = await request.formData();
    payload = Object.fromEntries(
      Array.from(form.entries()).map(([k, v]) => [k, String(v)])
    );
  } catch {
    return json({ error: 'Could not read the form.' }, 400);
  }

  // Pot de miel. Rempli signifie robot. On répond 200 sans rien envoyer.
  if (payload.website) return json({ ok: true }, 200);

  const email = (payload.email || '').trim();
  const message = (payload.message || '').trim();
  const name = (payload.name || '').trim();

  // Le bloc Subscribe n'envoie qu'un email, le formulaire de contact exige
  // un message. Un des deux au moins doit être présent.
  if (!email && !message) {
    return json({ error: 'Tell us how to reach you.' }, 400);
  }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: 'That email address does not look right.' }, 400);
  }

  // Variables absentes : on le dit franchement, le client affiche l'adresse
  // de repli. Aucune clé n'est jamais écrite dans le repo.
  if (!key || !to) {
    return json(
      {
        error: 'The form is not connected yet.',
        fallback: 'office@syntexia.ai',
      },
      503
    );
  }

  const lines = [
    name && `Name: ${name}`,
    payload.company && `Company: ${payload.company}`,
    payload.sector && `Sector: ${payload.sector}`,
    email && `Email: ${email}`,
    message && `\n${message}`,
  ].filter(Boolean);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Syntexia website <onboarding@resend.dev>',
        to: [to],
        reply_to: email || undefined,
        subject: message ? `Website enquiry from ${name || 'a visitor'}` : 'Insights subscription',
        text: lines.join('\n'),
      }),
    });

    if (!res.ok) {
      return json({ error: 'The message could not be sent.', fallback: 'office@syntexia.ai' }, 502);
    }
    return json({ ok: true }, 200);
  } catch {
    return json({ error: 'The message could not be sent.', fallback: 'office@syntexia.ai' }, 502);
  }
};
