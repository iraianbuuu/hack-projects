"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

async function fetchRepos(language = "python", signal?: AbortSignal) {
  const res = await fetch(
    `https://arpy8-hackprojects-server.hf.space/data/${language}`,
    {
      next: { revalidate: 60 },
      signal,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch repository data");
  }

  return res.json();
}

export function RepoCard({
  user,
  repo,
  stars,
}: {
  user: string;
  repo: string;
  stars: string;
}) {
  return (
    <div
      className="rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-200 hover:scale-102 bg-white dark:bg-neutral-900 text-card-foreground transition ease-in-out cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between p-6 pb-0">
        <h3 className="tracking-tight text-sm font-medium text-gray-500">
          <a
            href={`https://github.com/${user}`}
            target="_blank"
            className="hover:text-amber-500 hover:drop-shadow-lg transition ease-in-out"
          >
            {user}
          </a>
        </h3>
        <a href={`https://github.com/${user}/${repo}`} target="_blank">
          <i className="bi bi-github"></i>
        </a>
      </div>
      <div className="p-6 pt-0">
        <div className="pb-2 text-2xl font-bold">
          <a href={`https://github.com/${user}/${repo}`} target="_blank">
            {repo}
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          <a
            href={`https://github.com/${user}/${repo}/stargazers`}
            target="_blank"
            className="hover:text-amber-500"
          >
            <span className="hover:text-amber-500">
              <i className="bi bi-star"></i> &nbsp; {stars}k
            </span>
          </a>
          {/* <a
            href={`https://github.com/${user}/${repo}/stargazers`}
            className="px-3"
            target="_blank"
          >
            <span className="hover:text-amber-500">
              <i className="bi bi-bullseye"></i> &nbsp; {stars}k
            </span>
          </a> */}
        </p>
      </div>
    </div>
  );
}

export function RepoCardSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 w-91 bg-white dark:bg-neutral-900 shadow-sm p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        <div className="h-5 w-5 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
      </div>

      {/* Repo Name */}
      <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-700 rounded mb-3"></div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
      </div>
    </div>
  );
}

export function ErrorCard({ message }: { message?: string | null }) {
  return (
    <div className="rounded-xl border border-red-300 dark:border-red-800 w-96 bg-red-50 dark:bg-red-950/30 shadow-sm p-6 flex flex-col justify-center items-center">
      <Image src="/frog.gif" height={20} width={128} alt="sad" className="border border-neutral-700 rounded-xl mb-4" />
      <div className="text-center text-sm text-red-600 dark:text-red-400 font-medium">
        {message || "Something went wrong while loading this repository."}
      </div>
    </div>
  );
}

export default function RepoDiv({ selectedLanguage }: { selectedLanguage: string | null }) {
  const [repos, setRepos] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadRepos = async () => {
      try {
        setError(null);
        setRepos(null);
        setLoading(true);
        const data = await fetchRepos(selectedLanguage || "python", controller.signal);
        if (!controller.signal.aborted) setRepos(data);
      } catch (err: any) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadRepos();
    return () => controller.abort();
  }, [selectedLanguage]);

  if (error) return <ErrorCard message={error} />;
  if (loading) return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <RepoCardSkeleton key={i} />
      ))}
    </div>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {repos &&
        repos.map(
          (item: { user: string; repo: string; stars: string }, idx: number) => (
            <RepoCard
              key={`${item.user}/${item.repo}-${idx}`}
              user={item.user}
              repo={item.repo}
              stars={item.stars}
            />
          )
        )}
    </div>
  );
}