"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sideImagesRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mouse Parallax & 3D Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-10, 10]), { stiffness: 300, damping: 30 });

  const CAROUSEL_IMAGES = [
    { id: 0, src: "/zizi.jpg", alt: "Hero Background" },
    { id: 1, src: "/outfit1.png", alt: "Side Fashion 1" },
    { id: 2, src: "/outfit2.png", alt: "Side Fashion 2" },
  ];

  const [positions, setPositions] = useState(["center", "left", "right"]);

  useEffect(() => {
    // Animation interval removed to keep images static as requested
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Initial Reveal Delay
    const timer = setTimeout(() => setIsLoaded(true), 500);

    // GSAP Scroll Animations
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
          }
        });

        // 1. Initial Scale & Blur back on scroll
        tl.to(".hero-main-content", {
          scale: 0.9,
          opacity: 0.4,
          filter: "blur(10px)",
          duration: 1,
        }, 0);

      }, containerRef);
      return () => ctx.revert();
    }

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black dir-rtl"
      onMouseMove={handleMouseMove}
    >
      {/* 1. & 2. Auto-Looping Hero Images Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          {CAROUSEL_IMAGES.map((img, index) => {
            const pos = positions[index];

            let inlineAnim: any = {};

            if (pos === "center") {
              inlineAnim = {
                top: "0%", left: "0%", right: "0%", bottom: "0%",
                width: "100%", height: "100%",
                borderRadius: "0px",
                opacity: 1, filter: "brightness(0.6) blur(0px)", zIndex: 0
              };
            } else if (pos === "right") {
              inlineAnim = {
                top: "25%", right: "0%", left: "70%", bottom: "auto",
                width: "30vw", height: "40vh",
                borderRadius: "20vw 0 0 20vw",
                opacity: 0.6, filter: "brightness(1) blur(0px)", zIndex: 10
              };
            } else if (pos === "left") {
              inlineAnim = {
                bottom: "25%", left: "0%", right: "70%", top: "auto",
                width: "30vw", height: "40vh",
                borderRadius: "0 20vw 20vw 0",
                opacity: 0.6, filter: "brightness(1) blur(0px)", zIndex: 10
              };
            }

            // Initial load blur
            if (!isLoaded && pos === "center") {
              inlineAnim.filter = "brightness(0.6) blur(40px)";
              inlineAnim.opacity = 0;
              inlineAnim.scale = 1.1;
            }

            return (
              <motion.div
                key={img.id}
                animate={inlineAnim}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute overflow-hidden ${pos !== "center" ? "hidden md:block border-white/20 shadow-2xl" : "pointer-events-none"}`}
                style={{
                  borderLeftWidth: pos === "right" ? "1px" : "0px",
                  borderRightWidth: pos === "left" ? "1px" : "0px"
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  priority={img.id === 0}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Soft Light Center Gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isLoaded ? { opacity: 0.3, scale: 1.2 } : {}}
          transition={{ duration: 3, delay: 0.5 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.3)_0%,transparent_70%)] pointer-events-none"
          style={{ zIndex: 1 }}
        />
      </div>

      {/* 3. Central Glass Card Section */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-6 hero-main-content">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="relative max-w-5xl w-full bg-white/5 backdrop-blur-[40px] p-10 md:p-24 rounded-[4rem] md:rounded-[6rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Typography Mask Reveal */}
          <div className="flex flex-col items-center text-center">
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={isLoaded ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-8xl font-iransans text-white leading-tight flex items-center gap-4 flex-wrap justify-center font-normal tracking-wide"
              >
                استایل خود را با
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={isLoaded ? { scale: 1 } : {}}
                  transition={{
                    duration: 1.5,
                    delay: 2,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative px-6 py-2 bg-gradient-to-r from-primary via-purple-400 to-primary bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                >
                  زیگو
                </motion.span>
                بسازید
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 0.7, y: 0 } : {}}
              transition={{ duration: 1, delay: 2.2 }}
              className="max-w-2xl"
            >
              <p className="text-xl md:text-3xl text-white/80 font-medium leading-relaxed">
                تجربه‌ای لوکس و متمایز در دنیای مد مدرن
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 2.5 }}
              className="flex flex-wrap gap-8 justify-center mt-16"
            >
              <Link
                href="#products"
                className="group relative px-14 py-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full overflow-hidden font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 hover:bg-white/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  مشاهده کلکسیون <ArrowLeft className="group-hover:-translate-x-2 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 4. Fashion Show Overlay Outfits (GSAP Target) */}
      <div className="absolute inset-0 z-15 pointer-events-none opacity-0 outfit-overlay">
        <Image src="/outfit1.png" alt="Fashion Show 1" fill className="object-contain p-20" />
      </div>
      <div className="absolute inset-0 z-16 pointer-events-none opacity-0 outfit-overlay">
        <Image src="/outfit2.png" alt="Fashion Show 2" fill className="object-contain p-20" />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <ChevronDown className="w-12 h-12" />
      </motion.div>
    </section>
  );
};

export default Hero;
