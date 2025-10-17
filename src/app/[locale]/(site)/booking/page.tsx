'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { MessageCircle, Mail, Phone, Clock } from 'lucide-react';
import { trackContactSubmit } from '@/lib/analytics';
import { siteConfig } from '@/lib/seo';
import { useTranslations } from 'next-intl';

export default function BookingPage() {
  const t = useTranslations('booking');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Validación básica
    if (!data.name || !data.phone || !data.bodyArea || !data.size || !data.message) {
      setErrors({ submit: 'Por favor completa todos los campos requeridos' });
      setIsSubmitting(false);
      return;
    }

    // Construir mensaje de WhatsApp con todos los datos del formulario
    const message = `*NUEVA SOLICITUD DE TATUAJE*

*DATOS DE CONTACTO*
Nombre: ${data.name}
Email: ${data.email || 'No proporcionado'}
Teléfono: ${data.phone}

*DETALLES DEL TATUAJE*
Zona del cuerpo: ${data.bodyArea}
Tamaño aproximado: ${data.size}

*DESCRIPCIÓN DE LA IDEA:*
${data.message}
${data.reference ? `\n*Referencia:*\n${data.reference}` : ''}

━━━━━━━━━━━━━━━━━━━━
Enviado desde Inklab Mastery
https://inklab-mastery.vercel.app`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

    // Mostrar mensaje de éxito
    setIsSuccess(true);
    trackContactSubmit(true);
    e.currentTarget.reset();
    setIsSubmitting(false);
  }

  const whatsappNumber = '573243582350'; // Tu número de WhatsApp
  const whatsappMessage = 'Hola! Me gustaría consultar sobre hacer un tatuaje en Inklab Mastery';

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Section spacing="lg">
      <Container size="md">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-fg-muted">
            {t('subtitle')}
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {/* WhatsApp Option */}
          <Card className="relative overflow-hidden border-2 border-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-300 group cursor-pointer">
            <div
              role="button"
              tabIndex={0}
              onClick={handleWhatsAppClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleWhatsAppClick();
                }
              }}
              className="p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="h-8 w-8 text-[#25D366]" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">WhatsApp</h3>
              <p className="text-fg-muted mb-4">
                {t('quickContact.whatsapp.description')}
              </p>
              <div className="inline-flex items-center gap-2 text-[#25D366] font-medium">
                <span>{t('quickContact.whatsapp.button')}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-xs text-fg-subtle mt-4">
                {t('quickContact.whatsapp.response')}
              </p>
            </div>
          </Card>

          {/* Email Option */}
          <Card className="relative overflow-hidden border-2 border-accent/20 hover:border-accent/50 transition-all duration-300 group">
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Mail className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">{t('quickContact.form.title')}</h3>
              <p className="text-fg-muted mb-4">
                {t('quickContact.form.description')}
              </p>
              <div className="inline-flex items-center gap-2 text-accent font-medium">
                <span>{t('quickContact.form.button')}</span>
                <span className="group-hover:translate-y-1 transition-transform">↓</span>
              </div>
              <p className="text-xs text-fg-subtle mt-4">
                {t('quickContact.form.response')}
              </p>
            </div>
          </Card>
        </div>

        <Card>
          {isSuccess ? (
            <div className="text-center">
              <div className="bg-[#25D366]/10 text-[#25D366] mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">{t('success.title')}</h2>
              <p className="mt-2 text-fg-muted">
                {t('success.message')}
              </p>
              <p className="mt-4 text-sm text-[#25D366] font-medium">
                {t('success.response')}
              </p>
              <Button onClick={() => setIsSuccess(false)} className="mt-6" variant="outline">
                {t('success.another')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  name="name"
                  label={t('form.name')}
                  required
                  error={errors.name}
                  placeholder={t('form.namePlaceholder')}
                />
                <Input
                  name="email"
                  type="email"
                  label={t('form.email')}
                  required
                  error={errors.email}
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>

              <PhoneInput
                name="phone"
                label={t('form.phone')}
                required
                error={errors.phone}
              />

              <Input
                name="bodyArea"
                label={t('form.bodyArea')}
                required
                error={errors.bodyArea}
                placeholder={t('form.bodyAreaPlaceholder')}
              />

              <Input
                name="size"
                label={t('form.size')}
                required
                error={errors.size}
                placeholder={t('form.sizePlaceholder')}
              />

              <Textarea
                name="message"
                label={t('form.message')}
                required
                error={errors.message}
                placeholder={t('form.messagePlaceholder')}
                rows={6}
              />

              <Input
                name="reference"
                type="url"
                label={t('form.reference')}
                error={errors.reference}
                placeholder={t('form.referencePlaceholder')}
                helperText={t('form.referenceHelper')}
              />

              {errors.submit && (
                <div className="bg-error/10 text-error rounded-lg p-4 text-sm" role="alert">
                  {errors.submit}
                </div>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <p className="text-sm text-fg-muted">
                  {t('form.disclaimer')}
                </p>
                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t('form.submit')}
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Contact Info */}
        <div className="mt-12 grid gap-6 text-center sm:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-medium">{t('contact.phone')}</h3>
              <a
                href={`tel:${siteConfig.business.phone}`}
                className="mt-1 text-fg-muted hover:text-accent transition-colors"
              >
                {siteConfig.business.phone}
              </a>
            </div>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-medium">{t('contact.email')}</h3>
              <a
                href={`mailto:${siteConfig.business.email}`}
                className="mt-1 text-fg-muted hover:text-accent transition-colors break-all"
              >
                {siteConfig.business.email}
              </a>
            </div>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-medium">{t('contact.hours')}</h3>
              <p className="mt-1 text-fg-muted text-sm">{t('contact.weekdays')}</p>
              <p className="text-fg-muted text-sm">{t('contact.saturday')}</p>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
