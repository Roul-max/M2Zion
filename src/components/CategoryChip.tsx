import { cn } from "../lib/utils";

interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryChip({ label, active, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200",
        active
          ? "bg-accent-green text-black"
          : "bg-bg-surface text-text-secondary border border-white/10 hover:text-text-primary"
      )}
    >
      {label}
    </button>
  );
}
