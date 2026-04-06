"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      className="group flex-none w-[280px] md:w-[350px] snap-start cursor-pointer flex flex-col relative"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
    >

      {/* Studio Style Image Container */}
      <div className="relative w-full aspect-[4/5] bg-[#f9f8ff] rounded-3xl overflow-hidden mb-6 flex items-center justify-center shadow-sm border border-gray-50">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className="absolute top-4 right-4 p-3 bg-white/40 backdrop-blur-lg border border-white/40 hover:bg-white text-secondary rounded-full shadow-lg transition-all duration-300 z-20"
        >
          <Heart className={`w-5 h-5 transition-transform ${isLiked ? "fill-primary text-primary scale-110" : ""}`} />
        </button>

        {/* Action Button - Simplified & static */}
        <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-center z-20">
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/products/${product.id}`); }}
            className="w-full bg-white/30 backdrop-blur-xl border border-white/30 hover:bg-white/50 text-secondary py-3.5 rounded-full text-sm font-black shadow-xl transition-all duration-300 flex justify-center items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 text-secondary" />
            مشاهده و خرید
          </button>
        </div>
      </div>

      {/* Text Details */}
      <div className="flex flex-col text-right px-2">
        <h3 className="text-base font-black text-secondary leading-tight mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-xs text-accent font-medium mb-3">{product.subtitle}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-black text-primary drop-shadow-sm">{product.price}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ProductSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="products" className="pt-24 dir-rtl bg-white selection:bg-primary selection:text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl mb-20 flex flex-col items-center text-center">
        {/* Header - Fixed Visibility & Centered */}
        <h2 className="text-4xl md:text-5xl font-iransans font-bold text-secondary mb-8 block">
          محصولات <span className="text-primary italic">جدید</span>
        </h2>
        <Link href="#" className="flex items-center gap-4 text-sm font-black text-secondary hover:text-primary transition-all group bg-white/20 backdrop-blur-lg border border-white/40 px-10 py-4 rounded-full shadow-lg">
          <span className="relative overflow-hidden">
            مشاهده کل مجموعه زیگو
            <span className="absolute left-0 bottom-0 w-full h-px bg-primary translate-x-full group-hover:translate-x-0 transition-transform" />
          </span>
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
        </Link>
      </div>

      {/* Horizontal Scroll Container - Edge to Edge */}
      <div className="w-full overflow-x-auto no-scrollbar scroll-smooth">
        <motion.div
          ref={scrollRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-nowrap gap-6 md:gap-10 pb-12 snap-x snap-mandatory px-4 md:px-0"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <div className="flex-none w-[1px]" />
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
