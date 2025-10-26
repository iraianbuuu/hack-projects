"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import RepoDiv from "../../components/card";
import SelectBox from "../../components/selectbox";
import { Button } from "@/components/ui/button";

import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";

const availableLanguages = [
  { value: "python", label: "python" },
  { value: "javascript", label: "javascript" },
  { value: "html", label: "html" },
  { value: "typescript", label: "typescript" },
  { value: "java", label: "java" },
  { value: "cpp", label: "cpp" },
  { value: "php", label: "php" },
  { value: "go", label: "go" },
  { value: "css", label: "css" },
  { value: "c", label: "c" },
];

const sortingOptions = [
  { value: "desc-stars", label: "Most stars" },
  { value: "asc-stars", label: "Fewest stars" },
  { value: "desc-forks", label: "Most forks" },
  { value: "asc-forks", label: "Least forks" },
  { value: "desc-updated", label: "Recently updated" },
  { value: "asc-updated", label: "Least recently Updated" },
];

const LanguageSelectBox = ({
  selectedLanguage,
  setSelectedLanguage,
}: {
  selectedLanguage: string | null;
  setSelectedLanguage: (lang: string | null) => void;
}) => {
  return (
    <SelectBox
      id="language"
      label="Choose language"
      value={selectedLanguage}
      onChange={setSelectedLanguage}
      options={availableLanguages}
    />
  );
};

const SortingSelectBox = ({
  selectedSortOption,
  setSelectedSort,
}: {
  selectedSortOption: string | null;
  setSelectedSort: (sort: string | null) => void;
}) => {
  return (
    <SelectBox
      id="sorting"
      label="Sort by"
      value={selectedSortOption}
      onChange={setSelectedSort}
      options={sortingOptions}
    />
  );
};

const getURLParams = (searchParams: URLSearchParams) => {
  const order = searchParams.get("order");
  const sort = searchParams.get("sort");
  const lang = searchParams.get("lang");
  return { order, sort, lang };
};

const updateURLParams = (
  params: URLSearchParams,
  router: ReturnType<typeof useRouter>
) => {
  const url = params.toString() ? `/explore?${params.toString()}` : `/`;
  router.replace(url);
};

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
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null);

  useEffect(() => {
    const { lang, order, sort } = getURLParams(searchParams);
    setSelectedLanguage(lang);
    setSelectedSortOption(`${order}-${sort}`);
  }, [searchParams]);

  const updateLanguage = (lang: string | null) => {
    setSelectedLanguage(lang);
    const params = new URLSearchParams(searchParams.toString());
    // Update lang param
    if (lang) {
      params.set("lang", lang);
    }
    updateURLParams(params, router);
  };

  const updateSortingOption = (option: string | null) => {
    setSelectedSortOption(option);
    const params = new URLSearchParams(searchParams.toString());
    // Update sort/order params
    if (option) {
      const [orderParam, sortParam] = option.split("-");
      params.set("order", orderParam);
      params.set("sort", sortParam);
    } 
    updateURLParams(params, router);
  };

  return (
    <div className="">
      <HeroHeader show_left_buttons={true} />
      <div className="container mx-auto p-4 pt-24 space-y-4">
        {/* <BackButton /> */}
        <div className="flex flex-row md:flex-row gap-4">
          <LanguageSelectBox
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={updateLanguage}
          />
          <SortingSelectBox
            selectedSortOption={selectedSortOption}
            setSelectedSort={updateSortingOption}
          />
        </div>
        <RepoDiv
          selectedLanguage={selectedLanguage}
          selectedSort={selectedSortOption}
        />
      </div>
      <FooterSection />
    </div>
  );
}
