import type { ReactNode } from "react";

import { XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface ChipItem {
  id: string;
  name: string;
}

export interface ChipListProps<TItem extends ChipItem = ChipItem> {
  items: TItem[];
  removeLabel?: (item: TItem) => string;
  className?: string;
  chipClassName?: string;
  removeButtonClassName?: string;
  removeIcon?: ReactNode;
  onRemove: (id: string) => void;
}

export function ChipList<TItem extends ChipItem>({
  items,
  removeLabel = (item) => `Remove ${item.name}`,
  className,
  chipClassName,
  removeButtonClassName,
  removeIcon = <XIcon className="size-4" />,
  onRemove,
}: ChipListProps<TItem>) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "selected-specialisms mt-6 flex flex-wrap gap-2.5",
        className,
      )}
    >
      {items.map((item) => (
        <span
          key={item.id}
          className={cn(
            "selected-specialism inline-flex items-center gap-2.5 rounded-full border border-secondary py-2.5 pr-3.75 pl-5 text-xl leading-none",
            chipClassName,
          )}
        >
          {item.name}
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={removeLabel(item)}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center text-xl leading-none",
              removeButtonClassName,
            )}
          >
            {removeIcon}
          </button>
        </span>
      ))}
    </div>
  );
}
