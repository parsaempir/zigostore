"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    id: 1,
    name: "کاپشن کلاسیک زیگو",
    images: ["/outfit1.png"],
    price: "۱,۸۹۰,۰۰۰ تومان",
    subtitle: "قهوه‌ای / برزنت شسته‌شده",
  },
  {
    id: 2,
    name: "تی‌شرت لانگ طرح مار",
    images: ["/file_00000000cc88720aa6c754f889026f84.jpg"],
    price: "۷۹۰,۰۰۰ تومان",
    subtitle: "مشکی ذغالی / پنبه سنگ‌شور",
  },
  {
    id: 3,
    name: "هودی نلسون پرمیوم",
    images: ["/outfit2.png"],
    price: "۱,۴۹۰,۰۰۰ تومان",
    subtitle: "طوسی / دورس ضخیم",
  },
  {
    id: 4,
    name: "شلوار کارگو بردی",
    images: ["/file_00000000d5bc720ab136d0555f23fd2c.jpg"],
    price: "۱,۱۹۰,۰۰۰ تومان",
    subtitle: "دودی / کتان سنگ‌شور",
  },
  {
    id: 5,
    name: "کت جین زاپ‌دار",
    images: ["/IMG_20260227_221721_726.jpg"],
    price: "۲,۳۵۰,۰۰۰ تومان",
    subtitle: "آبی روشن / دنیم ضخیم",
  },
  {
    id: 6,
    name: "پیراهن مخمل کبریتی",
    images: ["/IMG_20260225_105448_730.jpg"],
    price: "۹۸۰,۰۰۰ تومان",
    subtitle: "خردلی / مخمل ۱۰۰٪ پنبه",
  },
  {
    id: 7,
    name: "دورس یقه ۳ سانت",
    images: ["/IMG_20260227_221751_181.jpg"],
    price: "۱,۲۵۰,۰۰۰ تومان",
    subtitle: "سرمه‌ای / پنبه دورس",
  },
  {
    id: 8,
    name: "تی‌شرت نخی بیسیک",
    images: ["/IMG_20260209_192639_488.jpg"],
    price: "۵۹۰,۰۰۰ تومان",
    subtitle: "سفید / پنبه سوپر",
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      onClick={() => router.push(`/products/${product.id}`)}
      className="group cursor-pointer flex flex-col relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full aspect-[4/5] bg-[#f9f8ff] rounded-2xl md:rounded-3xl overflow-hidden mb-3 md:mb-6 flex items-center justify-center shadow-sm border border-gray-50">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <button
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className="absolute top-2 right-2 md:top-4 md:right-4 p-2 md:p-3 bg-white/40 backdrop-blur-lg border border-white/40 hover:bg-white text-secondary rounded-full shadow-lg transition-all duration-300 z-20"
        >
          <Heart className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isLiked ? "fill-primary text-primary scale-110" : ""}`} />
        </button>
        <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
          <button className="w-full bg-white/90 backdrop-blur-xl text-secondary py-3 rounded-full text-xs font-black shadow-xl flex justify-center items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            افزودن به سبد
          </button>
        </div>
      </div>
      <div className="flex flex-col text-right px-1 md:px-2">
        <h3 className="text-sm md:text-base font-black text-secondary leading-tight mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-[10px] md:text-xs text-accent font-medium mb-1 md:mb-3 line-clamp-1">{product.subtitle}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg md:text-xl font-black text-primary drop-shadow-sm">{product.price}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProductsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white dir-rtl pb-24">
      <Navbar />
      
      <div className="pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div className="text-right">
            <nav className="flex items-center justify-start gap-2 text-accent text-[10px] md:text-xs mb-3 md:mb-4">
              <span onClick={() => router.push("/")} className="cursor-pointer hover:text-primary transition-colors">خانه</span>
              <ArrowRight className="w-3 h-3 rotate-180" />
              <span className="text-secondary font-bold">تمام محصولات</span>
            </nav>
            <h1 className="text-3xl md:text-6xl font-yekan font-black text-secondary">
              کالکشن <span className="text-primary italic">زیگو</span>
            </h1>
          </div>
          <p className="text-accent max-w-md text-xs md:text-sm leading-relaxed hidden md:block text-right">
            مجموعه‌ای از بهترین و باکیفیت‌ترین لباس‌های کژوال و استریت‌ور با طراحی اختصاصی زیگو برای کسانی که به استایل خود اهمیت می‌دهند.
          </p>
        </div>

        {/* Filters Placeholder */}
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 mb-8 md:mb-12 pb-2">
          {["همه", "کاپشن", "تی‌شرت", "هودی", "شلوار", "پیراهن"].map((cat) => (
            <button key={cat} className={`flex-none px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all ${cat === "همه" ? "bg-secondary text-white border-secondary" : "bg-white text-secondary border-gray-100 hover:border-primary"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid: 2 columns on mobile, more on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
