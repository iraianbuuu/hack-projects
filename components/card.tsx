"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import  useInfiniteScroll  from "react-infinite-scroll-hook";
import { Spinner } from "@/components/ui/spinner"

async function fetchRepos(language = "python", page = 1, signal?: AbortSignal) {
  const REPOS_PER_PAGE = 20;
  const res = await fetch(
    `https://api.github.com/search/repositories?q=topic:hacktoberfest+language:${language}&sort=stars&order=desc&per_page=${REPOS_PER_PAGE}&page=${page}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        // "X-GitHub-Api-Version": "2022-11-28",
      },
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
  forkers,
  description,
}: {
  user: string;
  repo: string;
  stars: number;
  forkers: number;
  description?: string | null;
}) {
  return (
    <div
      className="border border-neutral-200 dark:border-neutral-700 hover:border-neutral-200 hover:scale-102 hover:shadow-sm bg-white dark:bg-neutral-900 text-card-foreground transition ease-in-out cursor-pointer"
      onClick={() => window.open(`https://github.com/${user}/${repo}`, "_blank")}
    >
      <div className="flex flex-row items-center justify-between p-6 pb-0">
        <h3 className="tracking-tight text-sm font-medium text-gray-500">
          <a
            href={`https://github.com/${user}`}
            target="_blank"
            className="hover:text-amber-500 hover:drop-shadow-lg transition ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {user}
          </a>
        </h3>
        <i className="bi bi-github"></i>
      </div>
      <div className="p-6 pt-0">
        <div className="pb-2 text-2xl font-bold">
          <a href={`https://github.com/${user}/${repo}`} target="_blank" onClick={(e) => e.stopPropagation()}>
            {repo.slice(0, 19)}
          </a>
        </div>
        <HoverCard>


          <HoverCardTrigger>
            <p className="text-xs text-muted-foreground mb-3">
              {description?.slice(0, 80) + "..." || "No description provided."}
            </p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-xs">
              {description || "No description provided."}
            </p>
          </HoverCardContent>
        </HoverCard>

        {/* Stats */}
        <p className="text-xs text-muted-foreground space-x-4">
          <a
            href={`https://github.com/${user}/${repo}/stargazers`}
            target="_blank"
            className="hover:text-amber-500"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hover:text-amber-500">
              <i className="bi bi-star"></i>{" "}{stars}
            </span>
          </a>
          <a
            href={`https://github.com/${user}/${repo}/forks`}
            target="_blank"
            className="hover:text-amber-500"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hover:text-amber-500">
              <i className="bi bi-diagram-2"></i>{" "}{forkers}
            </span>
          </a>
        </p>
      </div>
    </div>
  );
}

export function RepoCardSkeleton() {
  return (
    <div className="border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-card-foreground transition ease-in-out animate-pulse">
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-6 pb-0">
        <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        <div className="h-5 w-5 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
      </div>
      {/* Body */}
      <div className="p-6 pt-0">
        {/* Repo Name */}
        <div className="h-8 w-40 bg-neutral-200 dark:bg-neutral-700 rounded mb-3"></div>

        {/* Description lines */}
        <div className="h-3 w-full max-w-[85%] bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
        <div className="h-3 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function ErrorCard({ message }: { message?: string | null }) {
  return (
    <div className="border border-red-300 dark:border-red-800 w-96 bg-red-50 dark:bg-red-950/30 shadow-sm p-6 flex flex-col justify-center items-center">
      <Image src="/frog.gif" height={20} width={128} alt="sad" className="border border-neutral-700 mb-4" />
      <div className="text-center text-sm text-red-600 dark:text-red-400 font-medium">
        {message || "Something went wrong while loading this repository."}
      </div>
    </div>
  );
}

export default function RepoDiv({ selectedLanguage }: { selectedLanguage: string | null }) {
  const [repos, setRepos] = useState<any>(null);
  const [page, setPage]= useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadRepos = async () => {
      try {
        setError(null);
        if (page === 1) {
          setRepos(null);
        }
        setLoading(true);
        const data = await fetchRepos(selectedLanguage || "python", page, controller.signal);
        if (!controller.signal.aborted) {
          if (page === 1) {
            // First page - set initial data
            setRepos(data);
          } else {
            // Append to existing data
            setRepos((prev: any) => ({
              ...prev,
              items: [...(prev?.items || []), ...(data.items || [])],
            }));            
          }
          
          // Check if there are more pages
          const totalItems = page * 20; // REPOS_PER_PAGE
          const hasMore = data.total_count && totalItems < data.total_count;
          setHasNextPage(hasMore);
        }
      } catch (err: any) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadRepos();
    return () => controller.abort();
  }, [selectedLanguage, page]);

  // Reset to page 1 when language changes
  useEffect(() => {
    setPage(1);
    setHasNextPage(true);
  }, [selectedLanguage]);

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      setPage((prev) => prev + 1);
    },
    disabled: Boolean(error),
  });

  if (error) return <ErrorCard message={error} />;
  if (loading && !repos) return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <RepoCardSkeleton key={i} />
      ))}
    </div>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pb-14">
      {repos?.items?.map(
        (item: { name: string; owner: any; stargazers_count: number; forks_count: number; description: string | null }, idx: number) => (
          <RepoCard
            key={`${item.name}/${item.owner.login}-${idx}`}
            user={item.owner.login}
            repo={item.name}
            description={item.description}
            stars={item.stargazers_count}
            forkers={item.forks_count}
          />
        )
      )}
    {
      hasNextPage && (
        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center items-center py-4">
          <Spinner ref={infiniteRef} className="size-6"/>
        </div>
      )
    }
    </div>
  );
}