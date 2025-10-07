"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import RepoDiv from "../components/repoDiv";
import SelectBox from "../components/selectbox";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // initialize from ?lang=...
  useEffect(() => {
    const lang = searchParams.get("lang");
    setSelectedLanguage(lang);
  }, [searchParams]);

  // update both state and URL (replace so back button isn't spammed)
  const updateLanguage = (lang: string | null) => {
    setSelectedLanguage(lang);
    const url = lang ? `/?lang=${encodeURIComponent(lang)}` : `/`;
    router.replace(url);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <SelectBox selectedLanguage={selectedLanguage} setSelectedLanguage={updateLanguage} />
      <RepoDiv selectedLanguage={selectedLanguage} />
    </div>
  );
}