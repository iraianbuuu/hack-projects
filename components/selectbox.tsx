"use client";

import React from "react";

export default function SelectBox({
  selectedLanguage,
  setSelectedLanguage,
}: {
  selectedLanguage: string | null;
  setSelectedLanguage: (lang: string | null) => void;
}) {
  const availableLanguages = [
    "python",
    "javascript",
    "html",
    "typescript",
    "java",
    "cpp",
    "php",
    "go",
    "css",
    "c",
  ];

  return (
    <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
      <div className="select-wrapper">
        <label className="block mb-1 text-xs font-medium" htmlFor="language">
          Choose language
        </label>
        <select
          id="language"
          value={selectedLanguage ?? ""}
          onChange={(e) => setSelectedLanguage(e.target.value || null)}
          className="cursor-pointer block w-full border border-neutral-200 dark:border-neutral-700 px-4 py-2 pr-10 text-sm"
        >
          {availableLanguages.map((language) => (
            <option value={language} key={language} className="dark:text-white dark:bg-[#0a0a0a]">
              {language}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}