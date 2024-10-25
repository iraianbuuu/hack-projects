import { get } from 'http';
import UserAuthForm from './user-auth-form';
import { SquareChevronRight } from 'lucide-react';

async function get_ip() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
  }
}

const ip = get_ip();

export default function WelcomePage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <SquareChevronRight className="company-logo size-4" />
          <p className="px-3">HackProjects</p>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Your go-to platform for discovering and contributing to
              Hacktoberfest project.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              <span className="text-gray-500">Welcome,</span>{' '}
              <span className="text-primary">{ip}</span>
            </h1>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
