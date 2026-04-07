"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";

const features = [
  { icon: <Truck className="w-8 h-8" />, title: "ارسال سریع", desc: "تحویل درب منزل در کمترین زمان ممکن" },
  { icon: <ShieldCheck className="w-8 h-8" />, title: "ضمانت کیفیت", desc: "تضمین اصالت و سلامت تمامی کالاها" },
  { icon: <CreditCard className="w-8 h-8" />, title: "پرداخت امن", desc: "درگاه‌های بانکی معتبر و ایمن" },
  { icon: <Headphones className="w-8 h-8" />, title: "پشتیبانی ۲۴/۷", desc: "پاسخگویی به سوالات شما در تمام روز" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 dir-rtl bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 lg:gap-12 text-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="relative p-2 md:p-10 rounded-2xl md:rounded-[48px] flex flex-col items-center transition-all group"
            >
              {/* Subtle hover backdrop */}
              <div className="absolute inset-0 bg-white/40 md:bg-white/40 backdrop-blur-xl rounded-2xl md:rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity border border-white/50 shadow-xl shadow-gray-100/50 -z-10" />
              
              {/* Icon Container */}
              <div className="w-10 h-10 md:w-20 md:h-20 bg-primary/5 rounded-xl md:rounded-[28px] flex items-center justify-center text-primary mb-3 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                <div className="scale-75 md:scale-100 uppercase">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-[10px] md:text-xl font-black text-secondary mb-1 md:mb-4 group-hover:text-primary transition-colors leading-tight">
                {feature.title}
              </h3>
              <p className="hidden md:block text-sm text-accent font-medium leading-relaxed max-w-[200px]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
