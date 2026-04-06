"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after scrolling a bit (e.g. 100px)
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "صفحه اصلی", href: "#" },
    { name: "محصولات", href: "#products" },
    { name: "ویژگی‌ها", href: "#features" },
    { name: "تماس با ما", href: "#contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-white/40 backdrop-blur-2xl border-gray-100/50 shadow-sm py-3" 
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between dir-rtl">
        
        {/* RIGHT: Logo & Links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="relative w-12 h-12 overflow-hidden rounded-full border shadow-sm hover:scale-110 transition-transform flex-shrink-0">
            <Image src="/zigo.jpg" alt="Zigo Logo" fill className="object-cover" />
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isScrolled ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:flex gap-1 items-center relative"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-5 py-2 text-sm font-yekan font-black text-secondary hover:text-primary transition-colors z-10"
              >
                {link.name}
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/5 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* LEFT: Auth & Cart */}
        <div className="flex items-center gap-4">
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isScrolled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            className="relative p-3 hover:bg-white/20 rounded-full transition-all group hidden md:block"
          >
            <ShoppingBag className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </motion.button>

          <motion.div 
            animate={isScrolled ? { opacity: 1 } : { opacity: 0 }}
            className="w-px h-6 bg-gray-200/50 hidden md:block mx-1" 
          />

            <div className="hidden md:flex items-center ml-2">
              <Link href="#" className="px-8 py-2.5 bg-white/20 backdrop-blur-xl border border-white/30 text-secondary text-xs font-yekan font-black rounded-full hover:bg-white/40 transition-all shadow-lg flex-shrink-0">
                ورود / ثبت نام
              </Link>
            </div>
          
          <button 
            className="lg:hidden p-3 hover:bg-white/20 rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-secondary" />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Boutique Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] bg-white p-8 flex flex-col dir-rtl overflow-hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="relative w-14 h-14 overflow-hidden rounded-full shadow-lg">
                <Image src="/zigo.jpg" alt="Logo" fill className="object-cover" />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full"
              >
                <X className="w-8 h-8 text-secondary" />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 justify-center flex-grow">
               <span className="text-[10px] font-yekan font-black tracking-[0.5em] text-primary/40 uppercase mb-4">فهرست کلکسیون</span>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-5xl font-yekan font-black text-secondary hover:text-primary transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4">
                 <Link href="#" className="w-full py-6 bg-white/20 backdrop-blur-xl border border-white/30 text-secondary rounded-3xl text-center font-yekan font-black text-lg shadow-lg">
                    ورود / ثبت نام
                 </Link>
                 <button className="w-full py-6 border border-gray-100 rounded-3xl text-center font-yekan font-black text-lg flex items-center justify-center gap-3">
                    <ShoppingBag className="w-6 h-6" />
                    سبد خرید
                 </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
