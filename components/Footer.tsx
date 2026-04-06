"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// --- Branded Social Icons (Custom SVGs for current environment) ---

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 8.268l-1.937 9.131c-.146.645-.529.803-1.07.502l-2.951-2.176-1.423 1.37c-.158.158-.29.29-.594.29l.212-3.003 5.466-4.939c.238-.212-.052-.33-.368-.121l-6.756 4.254-2.911-.91c-.633-.198-.645-.633.132-.936l11.369-4.381c.527-.198.988.118.861.919z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative bg-[#f9f9f9] pt-24 pb-12 dir-rtl overflow-hidden border-t border-gray-100">
      
      {/* Scroll Triggered Fade-In Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 max-w-7xl relative z-10"
      >
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 items-start mb-20">
          
          {/* 1. Brand Section */}
          <div className="space-y-10 flex flex-col items-center md:items-start text-center md:text-right">
            <div className="space-y-6">
              <Link href="/" className="inline-block relative w-12 h-12 grayscale hover:grayscale-0 transition-all duration-700">
                <Image src="/zigo.jpg" alt="Zigo Boutique" fill className="object-cover rounded-full border border-gray-200" />
              </Link>
              <h3 className="text-xl font-yekan font-black text-secondary tracking-tight">زیــــگـــو</h3>
              <p className="text-xs font-yekan font-light text-accent leading-relaxed max-w-xs">
                استایلی که روایتگر هویت شماست؛ مدرن، متعالی و مینیمال.
              </p>
              {/* Optional Promotional Text */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-yekan font-black text-primary uppercase tracking-[0.1em]">
                  ارسال رایگان برای طبقه‌‌های خاص کلکسیون
                </span>
              </div>
            </div>

            {/* Circular Social Buttons */}
            <div className="flex gap-4">
              {[
                { icon: <InstagramIcon className="w-5 h-5" />, href: "#" },
                { icon: <TelegramIcon className="w-5 h-5" />, href: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, backgroundColor: "var(--primary)" }}
                  className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-full text-secondary transition-all duration-300 shadow-sm hover:text-white"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2. Navigation Links */}
          <div className="space-y-10 flex flex-col items-center md:items-start">
            <h4 className="text-[10px] font-yekan font-black uppercase tracking-[0.4em] text-secondary/30">فروشگاه</h4>
            <ul className="space-y-5 text-center md:text-right">
              {[
                { name: "کل مجموعه", href: "#products" },
                { name: "کالکشن جدید", href: "#" },
                { name: "درباره زیگو", href: "#" },
                { name: "تماس با ما", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ y: -4, opacity: 0.6 }} className="transition-all">
                    <Link href={link.href} className="text-base font-yekan font-normal text-secondary/80">
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Customer Support */}
          <div className="space-y-10 flex flex-col items-center md:items-start">
            <h4 className="text-[10px] font-yekan font-black uppercase tracking-[0.4em] text-secondary/30">پشتیبانی</h4>
            <ul className="space-y-5 text-center md:text-right">
              {[
                { name: "ارسال و عودت", href: "#" },
                { name: "پیگیری سفارش", href: "#" },
                { name: "حریم خصوصی", href: "#" },
                { name: "شرایط و ضوابط", href: "#" }
              ].map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ y: -4, opacity: 0.6 }} className="transition-all">
                    <Link href={link.href} className="text-base font-yekan font-normal text-secondary/80">
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Bottom: Thin Divider & Small Copyright Text */}
        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 text-center md:text-right">
            <p className="text-[9px] font-yekan font-black uppercase tracking-widest text-accent/40">
              © 2026 ZIGO BOUTIQUE. تمامی حقوق محفوظ است.
            </p>
            <span className="text-[8px] font-yekan font-bold text-accent/20 uppercase tracking-[0.1em]">DESIGNED FOR MODERN MINIMALISTS . EST. 2024</span>
          </div>
          <div className="flex gap-10">
            <Link href="#" className="text-[9px] font-yekan font-black uppercase tracking-widest text-accent/30 hover:text-primary transition-colors">POLICIES</Link>
            <Link href="#" className="text-[9px] font-yekan font-black uppercase tracking-widest text-accent/30 hover:text-primary transition-colors">COOKIES</Link>
            <Link href="#" className="text-[9px] font-yekan font-black uppercase tracking-widest text-accent/30 hover:text-primary transition-colors">TERMS</Link>
          </div>
        </div>

      </motion.div>

      {/* Subtle Background Accent */}
      <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-gray-100 to-transparent" />
    </footer>
  );
};

export default Footer;
