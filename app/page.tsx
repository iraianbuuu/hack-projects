import { Metadata } from 'next';
import WelcomePage from './welcome/_components/welcome-page';

export const metadata: Metadata = {
  title: 'HackProjects | Welcome',
  description: 'Welcome page for HackProjects.'
};

export default function Page() {
  return <WelcomePage />;
}
