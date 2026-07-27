import { cn } from "../lib/utils";

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function CategoryChip({ label, isActive, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
        isActive 
          ? "bg-accent-green text-bg-base border border-accent-green" 
          : "bg-transparent text-text-secondary border border-border-subtle hover:bg-bg-surface"
      )}
    >
      {label}
    </button>
  );
}
