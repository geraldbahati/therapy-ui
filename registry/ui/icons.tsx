import type { SVGProps } from "react";

const outlineIcon = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIcon} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIcon} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
