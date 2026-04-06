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
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="relative p-10 rounded-[48px] flex flex-col items-center text-center transition-all group"
            >
              {/* Subtle hover backdrop */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity border border-white/50 shadow-xl shadow-gray-100/50 -z-10" />
              
              {/* Icon Container */}
              <div className="w-20 h-20 bg-primary/5 rounded-[28px] flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-black text-secondary mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-accent font-medium leading-relaxed max-w-[200px]">
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
