"use client";

import type { FocusEvent, ReactNode } from "react";

import { XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface AutocompleteOption {
  id: string;
  name: string;
}

export interface AutocompleteFieldProps<
  TOption extends AutocompleteOption = AutocompleteOption,
> {
  label: string;
  name: string;
  value: string;
  suggestions: TOption[];
  open: boolean;
  placeholder?: string;
  clearable?: boolean;
  className?: string;
  inputClassName?: string;
  inputBaseClassName?: string;
  dropdownClassName?: string;
  dropdownBaseClassName?: string;
  optionClassName?: string;
  optionBaseClassName?: string;
  listItemClassName?: string;
  listItemBaseClassName?: string;
  clearButtonClassName?: string;
  clearButtonBaseClassName?: string;
  clearIcon?: ReactNode;
  getOptionLabel?: (option: TOption) => ReactNode;
  onValueChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  onSelect: (option: TOption) => void;
  onClear?: () => void;
}

export function AutocompleteField<TOption extends AutocompleteOption>({
  label,
  name,
  value,
  suggestions,
  open,
  placeholder,
  clearable = false,
  className,
  inputClassName,
  inputBaseClassName = "dashed-rule-x h-15 w-full bg-transparent text-2xl font-light caret-secondary outline-none",
  dropdownClassName,
  dropdownBaseClassName = "specialism-dropdown absolute z-[9999] mt-1.25 max-h-[290px] w-[min(100%,400px)] list-none overflow-hidden border-3 border-secondary bg-background p-0 text-[22px] shadow-none",
  optionClassName,
  optionBaseClassName = "block w-full cursor-pointer px-5 py-3.75 text-left transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground focus-visible:outline-none",
  listItemClassName,
  listItemBaseClassName = "border-0 p-0 text-[22px]",
  clearButtonClassName,
  clearButtonBaseClassName = "absolute top-5.25 right-0",
  clearIcon = <XIcon className="size-[18px]" />,
  getOptionLabel = (option) => option.name,
  onValueChange,
  onOpenChange,
  onSelect,
  onClear,
}: AutocompleteFieldProps<TOption>) {
  const listOpen = open && suggestions.length > 0;

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    onOpenChange(false);
  }

  function handleClear() {
    if (onClear) {
      onClear();
      return;
    }

    onValueChange("");
    onOpenChange(false);
  }

  return (
    <div
      className={cn("search_input_wrap relative", className)}
      onBlur={handleBlur}
    >
      <input
        type="text"
        name={name}
        autoComplete="off"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          onValueChange(event.target.value);
          onOpenChange(true);
        }}
        onFocus={() => onOpenChange(true)}
        className={cn(inputBaseClassName, inputClassName)}
      />

      {clearable && value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label={`Clear ${label}`}
          className={cn(clearButtonBaseClassName, clearButtonClassName)}
        >
          {clearIcon}
        </button>
      )}

      {listOpen && (
        <ul className={cn(dropdownBaseClassName, dropdownClassName)}>
          {suggestions.map((option) => (
            <li
              key={option.id}
              className={cn(listItemBaseClassName, listItemClassName)}
            >
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onSelect(option)}
                className={cn(optionBaseClassName, optionClassName)}
              >
                {getOptionLabel(option)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
