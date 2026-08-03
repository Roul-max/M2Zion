import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-base flex justify-center w-full overflow-x-hidden">
      <div
        id="scroll-root"
        className="w-full max-w-[480px] h-screen overflow-y-auto overflow-x-hidden bg-bg-base relative shadow-2xl shadow-black/50"
        style={{ overscrollBehaviorY: 'none' }}
      >
        {children}
      </div>
    </div>
  );
}
