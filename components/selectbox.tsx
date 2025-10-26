"use client";

import React from "react";

interface SelectBoxProps {
  id: string;
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  options: Option[];
}

type Option = {
  value: string;
  label: string;
};

export default function SelectBoxx({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
}: SelectBoxProps) {
  return (
    <div>
      <div className="select-wrapper">
        <label className="block mb-1 text-xs font-medium" htmlFor={id}>
          {label}
        </label>
        <select
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value || null)}
          className="cursor-pointer block w-full border border-neutral-200 dark:border-neutral-700 px-4 py-2 pr-10 text-sm"
        >
          {value === null && placeholder && (
            <option
              value=""
              disabled
              className="dark:text-white dark:bg-[#0a0a0a]"
            >
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              value={option.value}
              key={option.value}
              className="dark:text-white dark:bg-[#0a0a0a]"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
