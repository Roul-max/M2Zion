import { LucideIcon } from "lucide-react";

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export default function QuickActionButton({ icon: Icon, label, onClick }: QuickActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 flex-1 py-4 px-2 hover:bg-bg-surface-raised transition-colors active:bg-bg-surface"
    >
      <div className="w-12 h-12 rounded-full bg-bg-surface border border-border-subtle flex items-center justify-center text-text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs font-medium text-text-secondary">{label}</span>
    </button>
  );
}
