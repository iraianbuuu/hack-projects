"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import RepoDiv from "../../components/card";
import SelectBox from "../../components/selectbox";
import { Button } from "@/components/ui/button";

export default function AppPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const lang = searchParams.get("lang");
    setSelectedLanguage(lang);
  }, [searchParams]);

  const updateLanguage = (lang: string | null) => {
    setSelectedLanguage(lang);
    const url = lang ? `/explore?lang=${encodeURIComponent(lang)}` : `/`;
    router.replace(url);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* back button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="cursor-pointer mb-4 bg-white dark:bg-neutral-900 text-card-foreground transition ease-in-out"
      >
        <i className="bi bi-arrow-left" /> Back
      </Button>
      <SelectBox selectedLanguage={selectedLanguage} setSelectedLanguage={updateLanguage} />
      <RepoDiv selectedLanguage={selectedLanguage} />
    </div>
  );
}