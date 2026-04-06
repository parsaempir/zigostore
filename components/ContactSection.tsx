"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

// --- Official Brand Logos (Local SVGs to ensure exact look) ---

const InstagramLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TelegramLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 8.268l-1.937 9.131c-.146.645-.529.803-1.07.502l-2.951-2.176-1.423 1.37c-.158.158-.29.29-.594.29l.212-3.003 5.466-4.939c.238-.212-.052-.33-.368-.121l-6.756 4.254-2.911-.91c-.633-.198-.645-.633.132-.936l11.369-4.381c.527-.198.988.118.861.919z"/>
  </svg>
);

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 dir-rtl bg-[#f9f9f9]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Compact Centered Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 px-4 py-1 bg-primary/5 rounded-full mb-6 border border-primary/10"
          >
             <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
             <span className="text-[10px] font-yekan font-black uppercase tracking-[0.3em] text-primary">تماس با زیگو</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl font-yekan font-bold text-secondary leading-tight"
          >
            با ما در <span className="text-primary italic">ارتباط</span> باشید
          </motion.h2>
        </div>

        {/* 2-Column Compact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Side: Contact Info & Support Box */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="flex flex-col gap-6"
          >
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8 flex flex-col justify-center flex-grow">
               <div className="flex items-center gap-5 group cursor-default">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-primary transition-transform group-hover:scale-110 shadow-sm border border-gray-50">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-yekan font-black text-accent/50 uppercase tracking-widest mb-1 leading-none">تلفن تماس مستقیم</span>
                    <span className="text-xl font-yekan font-bold text-secondary">۰۹۱۲ ۳۴۵ ۶۷۸۹</span>
                  </div>
               </div>

               <div className="flex items-center gap-5 group cursor-default">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-primary transition-transform group-hover:scale-110 shadow-sm border border-gray-50">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-yekan font-black text-accent/50 uppercase tracking-widest mb-1 leading-none">آدرس بوتیک حضوری</span>
                    <span className="text-sm font-yekan font-bold text-secondary">لواسان، مجتمع هدیه، طبقه اول</span>
                  </div>
               </div>
            </div>

            {/* Support Message Box */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm flex items-start gap-4">
               <div className="p-2 bg-primary/10 rounded-xl text-primary mt-1">
                  <MessageCircle className="w-4 h-4" />
               </div>
               <p className="text-xs font-yekan font-medium text-secondary/70 leading-relaxed">
                 تیم پشتیبانی متخصص زیگو از ساعت ۱۰ صبح الی ۹ شب در تمامی پلتفرم‌ها آماده پاسخگویی به سوالات شماست.
               </p>
            </div>
          </motion.div>

          {/* Right Side: Social/Contact Methods */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between gap-6"
          >
             {[
               { icon: <InstagramLogo className="w-5 h-5" />, label: "اینستاگرام", value: "@zigo_style", color: "hover:bg-pink-50" },
               { icon: <WhatsAppLogo className="w-5 h-5" />, label: "واتس‌اپ", value: "ارسال پیام متنی", color: "hover:bg-emerald-50" },
               { icon: <TelegramLogo className="w-5 h-5" />, label: "تلگرام", value: "@zigo_support", color: "hover:bg-blue-50" }
             ].map((item, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${item.color} border border-transparent hover:border-gray-50`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-secondary/60 transition-colors group-hover:text-primary">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-yekan font-black text-accent/50 uppercase tracking-widest mb-0.5 leading-none">{item.label}</span>
                      <span className="text-sm font-yekan font-bold text-secondary">{item.value}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                     <span className="text-primary text-lg font-black leading-none">←</span>
                  </div>
                </Link>
             ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
