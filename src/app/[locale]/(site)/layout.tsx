import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton
        phoneNumber="573243582350"
        message="Hola! Me gustaría consultar sobre hacer un tatuaje en Inklab Mastery"
      />
    </>
  );
}
