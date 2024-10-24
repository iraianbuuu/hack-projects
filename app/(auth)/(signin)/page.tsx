import { Metadata } from 'next';
import SignInViewPage from '../_components/sigin-view';
import OverViewPage from '../../dashboard/overview/page';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default function Page() {
  return <SignInViewPage />;
}
