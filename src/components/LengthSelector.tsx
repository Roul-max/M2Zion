import { cn } from "../lib/utils";

interface LengthSelectorProps {
  options: { label: string; price: number }[];
  selectedLabel: string;
  onSelect: (label: string) => void;
}

export default function LengthSelector({ options, selectedLabel, onSelect }: LengthSelectorProps) {
  return (
    <div className="w-full">
      <div className="flex bg-bg-surface rounded-[20px] p-1 border border-border-subtle relative">
        {options.map((opt) => {
          const isActive = selectedLabel.toLowerCase() === opt.label.toLowerCase();
          return (
            <button
              key={opt.label}
              onClick={() => { if (navigator.vibrate) navigator.vibrate([50]); onSelect(opt.label); }}
              className={cn(
                "flex-1 py-3 text-sm font-medium rounded-[16px] transition-all duration-300 relative z-10",
                isActive ? "text-bg-base" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {opt.label}
            </button>
          );
        })}
        {/* Animated background pill */}
        <div 
          className="absolute top-1 bottom-1 bg-accent-green rounded-[16px] transition-all duration-300 ease-out z-0"
          style={{
            width: `calc(${100 / options.length}% - 8px)`,
            left: `calc(${options.findIndex(o => o.label.toLowerCase() === selectedLabel.toLowerCase()) * (100 / options.length)}% + 4px)`
          }}
        />
      </div>
      
      <div className="mt-4 flex justify-between items-center px-2">
        <span className="text-text-secondary">Selected Price:</span>
        <span className="text-2xl font-bold text-accent-green">
          ₹{options.find(o => o.label.toLowerCase() === selectedLabel.toLowerCase())?.price}
        </span>
      </div>
    </div>
  );
}
