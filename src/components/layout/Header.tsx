'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  const locale = useLocale();

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('portfolio'), href: `/${locale}/portfolio` },
    { name: t('artists'), href: `/${locale}/artists` },
    { name: t('booking'), href: `/${locale}/booking` },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-fixed transition-all duration-300',
        isScrolled ? 'glass border-b border-border shadow-lg' : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Inklab <span className="text-accent">Mastery</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  pathname === item.href ? 'text-accent' : 'text-fg-muted'
                )}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="tap-target rounded-lg p-2 text-fg hover:bg-bg-muted md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-bg md:hidden"
          >
            <Container>
              <div className="flex flex-col gap-1 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'tap-target rounded-lg px-4 py-3 text-base font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-accent/10 text-accent'
                        : 'text-fg hover:bg-bg-muted'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-2 px-4">
                  <LanguageSelector />
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
