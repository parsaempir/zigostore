"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Instagram, MessageCircle, Phone, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "صفحه اصلی", href: "/" },
    { name: "محصولات", href: "/products" },
    { name: "ویژگی‌ها", href: "#features" },
    { name: "تماس با ما", href: "#contact" },
  ];

  // Colors based on scroll state
  const iconColor = isScrolled ? "text-secondary" : "text-white";
  const textColor = isScrolled ? "text-secondary" : "text-white";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-white/70 backdrop-blur-3xl border-gray-100/50 shadow-sm py-3" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between dir-rtl text-right">
          
          {/* RIGHT: Logo & Links */}
          <div className="flex items-center gap-10">
            {/* LOGO - Always visible */}
            <Link href="/" className="relative w-12 h-12 overflow-hidden rounded-full border border-white/20 shadow-xl hover:scale-110 transition-transform flex-shrink-0">
              <Image src="/zigo.jpg" alt="Zigo Logo" fill className="object-cover" />
            </Link>
            
            {/* LINKS - Reveal on scroll (Desktop) */}
            <motion.div 
               animate={{ 
                 opacity: isScrolled ? 1 : 0, 
                 x: isScrolled ? 0 : 20,
                 pointerEvents: isScrolled ? "auto" : "none"
               }}
               className="hidden lg:flex gap-1 items-center relative"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-5 py-2 text-sm font-yekan font-black transition-colors z-10 ${textColor} hover:text-primary`}
                >
                  {link.name}
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* LEFT: Auth & Cart */}
          <div className="flex items-center gap-4">
            {/* CART - Reveal on scroll (Desktop) */}
            <motion.button 
              animate={{ 
                opacity: isScrolled ? 1 : 0, 
                scale: isScrolled ? 1 : 0.8,
                pointerEvents: isScrolled ? "auto" : "none"
              }}
              className={`relative p-3 hover:bg-white/20 rounded-full transition-all group hidden md:block ${iconColor}`}
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </motion.button>

            <motion.div 
               animate={{ opacity: isScrolled ? 1 : 0 }}
               className={`w-px h-6 hidden md:block mx-1 ${isScrolled ? "bg-gray-200" : "bg-white/20"}`} 
            />

            {/* LOGIN / SIGNUP - Hidden on mobile, reveal on scroll on desktop desktop */}
            <div className="hidden md:flex items-center ml-2">
              <Link href="#" className={`px-8 py-2.5 backdrop-blur-xl border border-white/30 text-xs font-yekan font-black rounded-full hover:bg-primary hover:text-white transition-all shadow-lg flex-shrink-0 ${isScrolled ? "bg-secondary/5 text-secondary border-gray-200" : "bg-white/10 text-white border-white/20"}`}>
                ورود / ثبت نام
              </Link>
            </div>
            
            {/* HAMBURGER - Always visible on mobile, background disappears on scroll */}
            <motion.button 
              animate={{ 
                opacity: 1, 
                x: 0,
                pointerEvents: "auto"
              }}
              className={`lg:hidden p-3 rounded-full transition-colors ${
                isScrolled ? "bg-transparent text-secondary" : "bg-white/10 text-white shadow-xl"
              }`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* LUXURY MOBILE MENU OVERLAY - Simplified and Clean */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col dir-rtl text-right overflow-hidden shadow-2xl"
          >
            {/* Menu Header */}
            <div className="pt-8 px-8 pb-4 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/20 shadow-lg">
                  <Image src="/zigo.jpg" alt="Logo" fill className="object-cover" />
                </div>
                <span className="text-white font-black tracking-tighter text-lg uppercase">ZIGO</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
            
            <div className="flex-grow flex flex-col justify-center px-12 gap-12">
              {/* Main Links Section - Simplified for clean look */}
              <div className="flex flex-col gap-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className="text-3xl md:text-4xl font-yekan font-black text-white hover:text-primary transition-all flex items-center justify-between group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                      <ArrowRight className="w-6 h-6 text-white/10 group-hover:text-primary transition-colors rotate-180" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Connections */}
              <div className="pt-12 border-t border-white/5 flex items-center gap-6 justify-end">
                  <Link href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all shadow-xl border border-white/5">
                    <Instagram className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all shadow-xl border border-white/5">
                    <MessageCircle className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all shadow-xl border border-white/5">
                    <Phone className="w-6 h-6" />
                  </Link>
              </div>
            </div>

            {/* Bottom Sticky Action */}
            <div className="p-8 pb-12 flex gap-3">
              <Link href="#" className="flex-1 py-5 bg-white text-black text-center font-black rounded-2xl text-sm hover:bg-primary hover:text-white transition-all shadow-xl">
                ورود / ثبت نام
              </Link>
              <Link href="#" className="flex-[0.4] py-5 bg-white/5 border border-white/10 text-white text-center font-black rounded-2xl text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                (۰)
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
