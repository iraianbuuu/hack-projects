'use client';

import { useRouter } from 'next/navigation';
import { SquareChevronRight } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();

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
              <span className="text-gray-500">Welcome,&nbsp;</span>{' '}
              <span className="text-primary">Hacker</span>
            </h1>
          </div>
          <button
            type="button"
            className="continue shadow-black-500/50 hover:bg-primary-300 mb-2 me-2 rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg dark:shadow-lg dark:shadow-black"
            onClick={() => router.push('/dashboard')}
          >
            Continue
          </button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                by <a href="https://github.com/arpy8">arpy8</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
