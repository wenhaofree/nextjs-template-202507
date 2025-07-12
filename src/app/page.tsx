
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Since we're using 'as-needed' localePrefix,
  // the default locale (en) should redirect to root path
  redirect('/');
}
