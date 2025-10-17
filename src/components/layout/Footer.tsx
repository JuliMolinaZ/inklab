import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/lib/seo';

const socialLinks = [
  { name: 'Instagram', href: siteConfig.social.instagram, icon: Instagram },
  { name: 'Facebook', href: siteConfig.social.facebook, icon: Facebook },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-muted">
      <Container>
        <div className="py-12 sm:py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <h3 className="font-display text-xl font-bold">Inklab Mastery</h3>
              <p className="mt-2 text-sm text-fg-muted">
                Estudio de tatuajes profesional especializado en arte corporal de alta calidad.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 font-medium">Contacto</h4>
              <address className="space-y-2 text-sm not-italic text-fg-muted">
                <p>{siteConfig.business.streetAddress}</p>
                <p>
                  {siteConfig.business.city}, {siteConfig.business.region}
                </p>
                <p>Colombia</p>
                <p>
                  <a href={`tel:${siteConfig.business.phone}`} className="hover:text-accent">
                    {siteConfig.business.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${siteConfig.business.email}`} className="hover:text-accent">
                    {siteConfig.business.email}
                  </a>
                </p>
              </address>
            </div>

            {/* Hours */}
            <div>
              <h4 className="mb-4 font-medium">Horario</h4>
              <div className="space-y-2 text-sm text-fg-muted">
                <p>Lunes - Viernes</p>
                <p className="font-medium text-fg">10:00 AM - 8:00 PM</p>
                <p>Sábados</p>
                <p className="font-medium text-fg">10:00 AM - 6:00 PM</p>
                <p>Domingos</p>
                <p className="text-fg-subtle">Cerrado</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="mb-4 font-medium">Síguenos</h4>
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target flex h-10 w-10 items-center justify-center rounded-lg bg-bg-subtle text-fg-muted transition-colors hover:bg-accent hover:text-accent-fg"
                      aria-label={link.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 border-t border-border pt-8">
            <div className="flex flex-col items-center justify-between gap-4 text-sm text-fg-muted sm:flex-row">
              <p>&copy; {currentYear} Inklab Mastery. Todos los derechos reservados.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-accent">
                  Privacidad
                </Link>
                <Link href="/terms" className="hover:text-accent">
                  Términos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
