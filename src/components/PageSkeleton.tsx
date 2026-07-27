import React from 'react';
import Skeleton from './Skeleton';
import { motion } from "motion/react";

export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base w-full overflow-hidden flex flex-col">
      <motion.div 
        className="w-full h-full"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2, ease: "easeInOut" }}
      >
        {/* Header Mock */}
        <div className="px-5 pt-6 pb-4 border-b border-white/5">
          <div className="flex gap-3 mt-4">
            <Skeleton className="w-full h-12 rounded-full" />
          </div>
        </div>
        
        {/* Content Mock */}
        <div className="p-5 flex flex-col gap-6">
          {/* Banner Mock */}
          <Skeleton className="w-full aspect-[4/3] rounded-[28px]" />
          
          {/* Chips Mock */}
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
               <div key={i} className="flex flex-col items-center gap-2">
                 <Skeleton className="w-14 h-14 rounded-full" />
                 <Skeleton className="w-12 h-3 rounded-full" />
               </div>
            ))}
          </div>
          
          {/* Grid Mock */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-bg-surface/50 p-1.5 pb-0 rounded-[24px] border border-white/5">
                <Skeleton className="w-full aspect-[4/3] rounded-[20px]" />
                <div className="p-4 pt-3 flex flex-col gap-2">
                  <Skeleton className="w-3/4 h-5 rounded" />
                  <Skeleton className="w-1/2 h-4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
