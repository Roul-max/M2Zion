import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-base flex justify-center w-full">
      <div className="w-full max-w-[480px] min-h-screen bg-bg-base relative overflow-x-clip shadow-2xl shadow-black/50">
        {children}
      </div>
    </div>
  );
}
