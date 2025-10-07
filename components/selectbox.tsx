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
    // "python",
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
    <div className="w-91 max-w-sm">
      <label className="block mb-1 text-xs font-medium" htmlFor="language">
        Choose language
      </label>
      <select
        id="language"
        value={selectedLanguage ?? ""}
        onChange={(e) => setSelectedLanguage(e.target.value || null)}
        className="block w-full appearance-none bg-transparent border border-neutral-200 dark:border-neutral-700 px-4 py-2 pr-10 rounded-md text-sm"
      >
        <option value="" className="text-white bg-[#0a0a0a] border border-xl">python</option>
        {availableLanguages.map((language) => (
          <option value={language} key={language} className="text-white bg-[#0a0a0a] border border-xl">
            {language}
          </option>
        ))}
      </select>
    </div>
  );
}