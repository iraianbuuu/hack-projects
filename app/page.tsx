"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import RepoDiv from "../components/card";
import SelectBox from "../components/selectbox";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const lang = searchParams.get("lang");
    setSelectedLanguage(lang);
  }, [searchParams]);

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