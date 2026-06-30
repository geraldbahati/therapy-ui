"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

import {
  AutocompleteField,
  type AutocompleteFieldProps,
  type AutocompleteOption,
} from "@/components/ui/autocomplete-field";
import { ChevronDownIcon, XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  name: string;
}

export interface FilterBlockProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

export function FilterBlock({ title, children, className }: FilterBlockProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <h3 className="mb-3 text-base leading-tight font-normal tracking-normal text-primary-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

export interface FilterDisclosureProps {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function FilterDisclosure({
  title,
  children,
  defaultOpen = false,
  className,
}: FilterDisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={cn("flex flex-col", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex items-center justify-between gap-2.5 text-base leading-tight font-medium tracking-normal text-primary-foreground"
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={cn(
            "size-4 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div id={panelId} className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export type FilterAutocompleteInputProps<
  TOption extends AutocompleteOption = AutocompleteOption,
> = Omit<
  AutocompleteFieldProps<TOption>,
  | "dropdownBaseClassName"
  | "dropdownClassName"
  | "inputBaseClassName"
  | "inputClassName"
  | "listItemBaseClassName"
  | "listItemClassName"
  | "optionBaseClassName"
  | "optionClassName"
  | "clearButtonBaseClassName"
  | "clearIcon"
> & {
  inputClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  clearIcon?: ReactNode;
};

export function FilterAutocompleteInput<TOption extends AutocompleteOption>({
  className,
  inputClassName,
  dropdownClassName,
  optionClassName,
  clearButtonClassName,
  clearIcon = <XIcon className="size-[18px]" />,
  ...props
}: FilterAutocompleteInputProps<TOption>) {
  return (
    <AutocompleteField
      {...props}
      className={cn("relative", className)}
      inputBaseClassName={cn(
        "h-10 rounded-full border border-dashed border-primary-foreground bg-transparent px-5 py-2.5 pr-11 text-sm text-primary-foreground caret-secondary placeholder:text-primary-foreground/60 focus-visible:ring-2 focus-visible:ring-primary-foreground/70",
        inputClassName,
      )}
      dropdownBaseClassName={cn(
        "absolute z-[1002] mt-1 max-h-60 w-full overflow-y-auto rounded-2xl border border-primary-foreground/30 bg-background py-2 text-sm text-foreground shadow-lg",
        dropdownClassName,
      )}
      listItemBaseClassName="p-0"
      optionBaseClassName={cn(
        "block w-full cursor-pointer px-4 py-3 text-left text-sm transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none",
        optionClassName,
      )}
      clearButtonBaseClassName={cn(
        "absolute top-1/2 right-3.5 -translate-y-1/2",
        clearButtonClassName,
      )}
      clearIcon={clearIcon}
    />
  );
}

export interface FilterSelectProps<
  TOption extends FilterOption = FilterOption,
> {
  label: string;
  value: string;
  placeholder: string;
  options: TOption[];
  className?: string;
  selectClassName?: string;
  onValueChange: (value: string) => void;
}

export function FilterSelect<TOption extends FilterOption>({
  label,
  value,
  placeholder,
  options,
  className,
  selectClassName,
  onValueChange,
}: FilterSelectProps<TOption>) {
  return (
    <div className={cn("relative", className)}>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className={cn(
          "h-10 w-full appearance-none rounded-full border border-dashed border-primary-foreground bg-transparent px-5 py-2.5 pr-10 text-sm text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/70",
          selectClassName,
        )}
      >
        <option value="" className="text-foreground">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id} className="text-foreground">
            {option.name}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-primary-foreground" />
    </div>
  );
}

export interface SelectedFilterChipsProps<
  TOption extends FilterOption = FilterOption,
> {
  items: TOption[];
  className?: string;
  chipClassName?: string;
  removeLabel?: (item: TOption) => string;
  onRemove: (id: string) => void;
}

export function SelectedFilterChips<TOption extends FilterOption>({
  items,
  className,
  chipClassName,
  removeLabel = (item) => `Remove ${item.name}`,
  onRemove,
}: SelectedFilterChipsProps<TOption>) {
  if (items.length === 0) return null;

  return (
    <div className={cn("mt-4 flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={removeLabel(item)}
          className={cn(
            "inline-flex items-center rounded-full border border-primary-foreground bg-primary-foreground px-2.5 py-1 text-xs leading-none text-primary transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground",
            chipClassName,
          )}
        >
          {item.name}
          <XIcon className="ml-1 size-3" />
        </button>
      ))}
    </div>
  );
}
