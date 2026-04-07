"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-[75vh] md:h-[95vh] w-full overflow-hidden bg-black flex">
      
      {/* Split-Screen Background (Left) - Compact and Full Visibility */}
      <motion.div 
        initial={{ x: "-100%", opacity: 0 }}
        animate={isLoaded ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-1/2 h-full overflow-hidden border-r border-white/10"
      >
        <Image 
          src="/outfit1.png" 
          alt="Fashion Hero 1" 
          fill 
          className="object-cover object-top brightness-90 md:brightness-100 transition-all duration-[2s]"
          priority
        />
        <div className="absolute inset-0 bg-black/10 transition-opacity" />
      </motion.div>

      {/* Split-Screen Background (Right) - Compact and Full Visibility */}
      <motion.div 
        initial={{ x: "100%", opacity: 0 }}
        animate={isLoaded ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-1/2 h-full overflow-hidden"
      >
        <Image 
          src="/outfit2.png" 
          alt="Fashion Hero 2" 
          fill 
          className="object-cover object-top brightness-90 md:brightness-100 transition-all duration-[2s]"
          priority
        />
        <div className="absolute inset-0 bg-black/10 transition-opacity" />
      </motion.div>

      {/* OVERLAY ELEMENTS - Adjusted to new height */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 px-4 mt-8 md:mt-0">
        {/* CENTER HEADLINE (Persian) */}
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isLoaded ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
           className="text-center mb-10 md:mb-16"
        >
          <h1 className="text-white text-4xl md:text-[8vw] font-black leading-tight drop-shadow-[0_10px_50px_rgba(0,0,0,0.5)] select-none tracking-tight">
            بوتیک اختصاصی <span className="text-white md:italic underline md:no-underline decoration-primary">زیگو</span>
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={isLoaded ? { width: "100%" } : {}}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="h-[1.5px] bg-white mt-3 md:mt-6 mx-auto"
          />
        </motion.div>

        {/* SINGLE CENTERED CTA BUTTON */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isLoaded ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 1, delay: 2.2 }}
        >
          <Link 
            href="#products"
            className="px-12 py-4 md:px-20 md:py-6 bg-white text-black font-black text-sm md:text-lg uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 shadow-[0_20px_80px_rgba(255,255,255,0.15)] active:scale-95 text-center block rounded-sm md:rounded-none"
          >
             مشاهده کالکشن اختصاصی زیگو
          </Link>
        </motion.div>
      </div>

      {/* Overall Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-10" />

    </section>
  );
};

export default Hero;
