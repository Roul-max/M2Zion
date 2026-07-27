import { useState } from 'react';
import { motion, Variants, Transition } from 'motion/react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  variants?: Variants;
  transition?: Transition;
  initial?: any;
  animate?: any;
  exit?: any;
}

export default function ProgressiveImage({ src, alt, className = "", variants, transition, initial, animate, exit }: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Create an ultra-low res URL for Unsplash images as a placeholder
  let lowResSrc = src;
  if (src.includes('unsplash.com')) {
    // Replace width, height, quality with tiny values
    lowResSrc = src.replace(/w=\d+/, 'w=40').replace(/h=\d+/, 'h=40').replace(/q=\d+/, 'q=10');
  }

  return (
    <motion.div
      variants={variants}
      initial={initial || (variants ? "initial" : undefined)}
      animate={animate || (variants ? "animate" : undefined)}
      exit={exit || (variants ? "exit" : undefined)}
      transition={transition}
      className={`relative overflow-hidden bg-bg-surface-raised ${className}`}
    >
      <img
        src={lowResSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover origin-center transform scale-110 filter blur-lg transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover origin-center transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </motion.div>
  );
}
