"use client";

import RepoCard from "@/components/repoCard";
import { setServers } from "dns";
import { useEffect, useState } from "react";

async function fetchRepos(language = "python") {
  const res = await fetch(
    `https://arpy8-hackprojects-server.hf.space/data/${language}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch repository data");
  }

  return res.json();
}

export default function Home() {
  const [repos, setRepos] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        var repos = await fetchRepos();
        setRepos(repos);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadRepos();
  }, []);

  return (
    <>
      <p>{JSON.stringify()}</p>
      <div className="container mx-auto p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {repos.map((item) => {
          <RepoCard user={item.repo} repo={item.username} />;
        })}
      </div>
    </>
  );
}
