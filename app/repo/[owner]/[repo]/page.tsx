"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import RepoDiv from "@/components/card";
import SelectBox from "@/components/selectbox";
import { Button } from "@/components/ui/button";

import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.back()}
      className="cursor-pointer mb-4 bg-white dark:bg-neutral-900 text-card-foreground transition ease-in-out"
    >
      <i className="bi bi-arrow-left" /> Back
    </Button>
  )
}

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
    <div className="">
      <HeroHeader show_left_buttons={true} />
      <div className="container mx-auto p-4 pt-24 space-y-4">
        {/* <BackButton /> */}
        <SelectBox selectedLanguage={selectedLanguage} setSelectedLanguage={updateLanguage} />
        <RepoDiv selectedLanguage={selectedLanguage} />
      </div>
      <FooterSection />
    </div>
  );
}