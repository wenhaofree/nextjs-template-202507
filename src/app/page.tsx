
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the default locale page
  // Since we're using 'as-needed' localePrefix, /en will be shown as /
  redirect('/en');
}
