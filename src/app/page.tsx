import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/request';

// This page only renders when the user visits the root URL (/)
// It redirects to the default locale
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
