import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Tag, Sparkles, Copy, Check, Clock, ChevronRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { motion } from "motion/react";
import { getOfferById } from "../data/offers";
import ProgressiveImage from "../components/ProgressiveImage";
import { useEffect, useState } from "react";
import { haptics } from "../utils/haptics";
import { cn } from "../lib/utils";

export default function OfferDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const offer = getOfferById(Number(id));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!offer) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <p className="text-text-secondary">Offer not found</p>
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-bg-base pb-6 relative">
      <motion.div layoutId={`offer-card-${offer.id}`} className="relative h-[45vh] min-h-[350px] w-full bg-black overflow-hidden shrink-0">
        <ProgressiveImage 
          src={offer.image} 
          alt={offer.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-95"
        />
        <div className={cn("absolute inset-0 opacity-20 mix-blend-overlay", offer.gradient)} />
        <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-black" />
        
        {/* Header Actions */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 w-full p-5 pt-12 flex justify-between items-center z-20"
        >
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              haptics.tick();
              navigate(-1);
            }}
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
        }}
        className="px-5 pt-8 pb-8 relative z-20 -mt-12 bg-bg-base rounded-t-[40px] flex flex-col flex-1 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] border-t border-white/5"
      >
        <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8 absolute top-4 left-1/2 -translate-x-1/2" />
        
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mb-8 mt-2">
          <div className="flex gap-2.5 mb-5">
            <div className="bg-accent-green/20 border border-accent-green/40 text-accent-green text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Special Offer
            </div>
            <div className="bg-white/5 border border-white/10 text-text-secondary text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
              <Clock className="w-3.5 h-3.5" />
              Limited Time
            </div>
          </div>
          <h1 className="text-[2rem] leading-[1.1] font-black text-text-primary mb-3 tracking-tight">{offer.title}</h1>
          <p className="text-text-secondary text-base leading-relaxed">{offer.description}</p>
        </motion.div>

        

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mb-10 flex-1">
          <div className="bg-bg-surface border border-white/5 rounded-[28px] p-6 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center shrink-0 mt-1">
                <Tag className="w-5 h-5 text-accent-green" />
              </div>
              <div>
                <p className="text-text-primary font-bold text-lg leading-tight mb-1">Get {offer.discount}</p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Enjoy {offer.discount} on applicable services at checkout. 
                </p>
              </div>
            </div>
            
            {offer.includedServices && (
              <div className="pt-5 border-t border-white/5">
                <p className="text-text-primary font-bold text-base mb-4">Included Services</p>
                <div className="grid grid-cols-1 gap-3">
                  {offer.includedServices.map((service: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-bg-base p-3.5 rounded-[16px] border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-accent-green/10 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-accent-green" />
                      </div>
                      <span className="text-sm font-medium text-text-primary">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
        
        
      </motion.div>
    </PageTransition>
  );
}
