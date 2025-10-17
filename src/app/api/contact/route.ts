import { NextResponse } from 'next/server';
import { z } from 'zod';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit: 5 requests per 15 minutes per IP
const RATE_LIMIT_REQUESTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function getRateLimitKey(request: Request): string {
  // In production, use x-forwarded-for or x-real-ip
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0] || 'unknown';
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(key);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (limit.count >= RATE_LIMIT_REQUESTS) {
    return false;
  }

  limit.count += 1;
  return true;
}

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido').max(20),
  bodyArea: z.string().min(2).max(100),
  size: z.string().min(2).max(100),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(2000),
  reference: z.string().url('URL inválida').optional().or(z.literal('')),
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' },
        { status: 429 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      return NextResponse.json({ errors }, { status: 400 });
    }

    const data = result.data;

    // Basic anti-spam check
    const spamKeywords = ['viagra', 'casino', 'lottery', 'pills'];
    const containsSpam = spamKeywords.some(
      (keyword) =>
        data.message.toLowerCase().includes(keyword) || data.name.toLowerCase().includes(keyword)
    );

    if (containsSpam) {
      return NextResponse.json({ error: 'Mensaje rechazado' }, { status: 400 });
    }

    // In production, send email using services like:
    // - Resend: https://resend.com
    // - SendGrid: https://sendgrid.com
    // - Postmark: https://postmarkapp.com

    // Example with Resend (uncomment when you have API key):
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Inklab Mastery <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'info@inklabmastery.com',
      subject: `Nueva consulta de ${data.name}`,
      html: `
        <h2>Nueva consulta de reserva</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.phone}</p>
        <p><strong>Zona:</strong> ${data.bodyArea}</p>
        <p><strong>Tamaño:</strong> ${data.size}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${data.message}</p>
        ${data.reference ? `<p><strong>Referencia:</strong> <a href="${data.reference}">${data.reference}</a></p>` : ''}
      `,
    });
    */

    // For now, just log to console (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Contact Form]', data);
    }

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);
