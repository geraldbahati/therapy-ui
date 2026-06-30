"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface SearchFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  clearable?: boolean;
  className?: string;
  inputClassName?: string;
  clearButtonClassName?: string;
  clearIcon?: ReactNode;
}

export function SearchField({
  label,
  name,
  placeholder,
  defaultValue = "",
  clearable = false,
  className,
  inputClassName,
  clearButtonClassName,
  clearIcon = <XIcon className="size-[18px]" />,
}: SearchFieldProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="text"
        name={name}
        autoComplete="off"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={cn(
          "dashed-rule-x h-15 w-full bg-transparent text-2xl font-light caret-secondary outline-none",
          inputClassName,
        )}
      />

      {clearable && value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label={`Clear ${label}`}
          className={cn("absolute top-5.25 right-0", clearButtonClassName)}
        >
          {clearIcon}
        </button>
      )}
    </div>
  );
}
