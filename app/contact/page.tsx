import { Metadata } from 'next';
import ContactUsPage from './_components/contact-us';

export const metadata: Metadata = {
  title: 'HackProjects | Contact Us',
  description: 'Contact Us.'
};

export default function Page() {
  return <ContactUsPage />;
}
