"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, ShoppingBag, Heart, Share2, Star, Truck, RefreshCcw, ShieldCheck, ChevronLeft } from "lucide-react";

// Mock Data
const MOCK_PRODUCT = {
  name: "کاپشن کلاسیک زیگو مدل نلسون",
  subtitle: "مجموعه زمستانه ۲۰۲۶ / پارچه ایتالیایی",
  price: 1890000,
  packSize: 20,
  description: "این کاپشن با الهام از استایل‌های وینتیج و ترکیب آن با هنر مدرن خیاطی طراحی شده است.",
  images: [
    "/outfit1.png",
    "/file_00000000270072439d0c6adfb2f22c80.jpg",
    "/outfit2.png",
    "/zizi.jpg"
  ],
  colors: [
    { code: "#9A2586", name: "بنفش سلطنتی", imgIndex: 0 },
    { code: "#6D6E71", name: "طوسی متالیک", imgIndex: 1 },
    { code: "#000000", name: "مشکی ذغالی", imgIndex: 2 },
    { code: "#FFFFFF", name: "سفید استخوانی", imgIndex: 3 },
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  heights: ["۷۵", "۸۰", "۸۵"],
  features: ["ضد آب و باد", "دوخت تقویت شده در سرشانه‌ها", "زیپ‌های اورجینال YKK"],
};

export default function ProductDetail() {
  const params = useParams();
  const id = String(params?.id || "1");

  // دو محصول اول اجباری (سری کامل) و بقیه اختیاری (انتخابی)
  const dynamicSaleMode = (id === "1" || id === "2") ? "full_series" : "custom";

  const [activeImg, setActiveImg] = useState(0);
  const [colorQuantities, setColorQuantities] = useState<Record<string, number>>({});
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [packQuantity, setPackQuantity] = useState(1);

  const imgRef = useRef<HTMLDivElement>(null);
  const originX = useSpring(useMotionValue(0.5), { stiffness: 300, damping: 30 });
  const originY = useSpring(useMotionValue(0.5), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    originX.set(x);
    originY.set(y);
  };

  const handleColorSelect = (color: typeof MOCK_PRODUCT.colors[0]) => {
    setActiveImg(color.imgIndex);
    if (dynamicSaleMode === "full_series") return;

    setColorQuantities(prev => {
      if (prev[color.code]) return prev;
      return { ...prev, [color.code]: 1 };
    });
  };

  const handleColorIncrement = (e: React.MouseEvent, colorCode: string) => {
    e.stopPropagation();
    setColorQuantities(prev => ({ ...prev, [colorCode]: (prev[colorCode] || 0) + 1 }));
  };

  const handleColorDecrement = (e: React.MouseEvent, colorCode: string) => {
    e.stopPropagation();
    setColorQuantities(prev => {
      const current = prev[colorCode] || 0;
      if (current <= 1) {
        const newState = { ...prev };
        delete newState[colorCode];
        return newState;
      }
      return { ...prev, [colorCode]: current - 1 };
    });
  };

  const handleDecrease = () => setPackQuantity(p => Math.max(1, p - 1));
  const handleIncrease = () => setPackQuantity(p => p + 1);

  const formatPrice = (price: number) => price.toLocaleString('fa-IR');
  const MIN_COLORS_CUSTOM = 2;
  const piecesPerColor = MOCK_PRODUCT.sizes.length;

  const totalCustomSeries = Object.values(colorQuantities).reduce((a, b) => a + b, 0);
  const uniqueSelectedColors = Object.keys(colorQuantities).length;

  const totalItems = dynamicSaleMode === "full_series"
    ? MOCK_PRODUCT.packSize * packQuantity
    : totalCustomSeries * piecesPerColor;

  const numericTotalPrice = dynamicSaleMode === "full_series"
    ? MOCK_PRODUCT.price * MOCK_PRODUCT.packSize * packQuantity
    : MOCK_PRODUCT.price * totalCustomSeries * piecesPerColor;

  const totalPrice = numericTotalPrice.toLocaleString("fa-IR");

  const isValidCustom = uniqueSelectedColors >= MIN_COLORS_CUSTOM;
  const canAddToCart = dynamicSaleMode === "full_series" || isValidCustom;

  return (
    <div className="min-h-screen bg-[#f9f8ff] dir-rtl selection:bg-primary selection:text-white pb-32">
      {/* Micro-Navbar (Breadcrumb) */}
      <nav className="border-b border-black/5 bg-white backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#products" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm font-bold group">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            بازگشت به محصولات
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium text-accent">
            <span className="hover:text-secondary cursor-pointer transition-colors">زیگو</span>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-secondary font-bold truncate max-w-[100px] sm:max-w-xs">{MOCK_PRODUCT.name}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Gallery Sticky Section */}
          <div className="w-full lg:w-1/2 lg:sticky top-32 flex flex-col-reverse md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar shrink-0">
              {MOCK_PRODUCT.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`relative w-20 aspect-[3/4] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${activeImg === idx ? 'ring-2 ring-primary scale-105' : 'opacity-60 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Interactive Image */}
            <div
              ref={imgRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              className="relative w-full aspect-[4/5] bg-white rounded-[3rem] shadow-2xl shadow-black/5 overflow-hidden cursor-crosshair flex-1"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: isZoomed ? 2.5 : 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: isZoomed ? originX : 0.5, originY: isZoomed ? originY : 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image src={MOCK_PRODUCT.images[activeImg]} alt={MOCK_PRODUCT.name} fill className="object-cover" priority />
                </motion.div>
              </AnimatePresence>

              {/* Floating Heart */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-6 right-6 p-4 bg-white/40 hover:bg-white backdrop-blur-md text-secondary rounded-full shadow-lg transition-all z-10"
              >
                <Heart className={`w-6 h-6 transition-transform ${isLiked ? "fill-primary text-primary scale-110" : ""}`} />
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full lg:w-1/2 flex flex-col">

            {/* MAIN PRODUCT INFO BOX (UNIFIED CARD) */}
            <div className="bg-white border border-primary/20 rounded-[2.5rem] p-8 md:p-10 shadow-sm mb-8 transition-all hover:shadow-md">
              <h1 className="text-4xl md:text-5xl font-yekan font-black text-secondary leading-tight mb-3">
                {MOCK_PRODUCT.name}
              </h1>
              <p className="text-lg text-accent font-medium mb-8">
                {MOCK_PRODUCT.subtitle}
              </p>

              <div className="w-full h-px bg-black/5 mb-8" />

              {/* Detailed Sizes & Heights Info inside the card, but more compact */}
              <div className="flex flex-col gap-8 mb-10">
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-secondary">تمام سایزهای موجود در پک:</h4>
                  <div className="flex flex-wrap gap-2">
                    {MOCK_PRODUCT.sizes.map(size => (
                      <span key={size} className="px-5 py-2.5 bg-[#f9f8ff] text-secondary font-black text-xs rounded-xl border border-black/5 shadow-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-secondary">تمام قدهای موجود:</h4>
                  <div className="flex flex-wrap gap-2">
                    {MOCK_PRODUCT.heights.map(h => (
                      <span key={h} className="px-5 py-2.5 bg-[#f9f8ff] text-secondary font-black text-xs rounded-xl border border-black/5 shadow-sm">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Specs Row (Moved down) */}
              <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-accent">قیمت واحد (عمده):</span>
                  <h2 className="text-4xl font-lalezar text-primary tracking-wider">
                    {formatPrice(MOCK_PRODUCT.price)} <span className="text-sm font-bold text-accent font-yekan">تومان / عدد</span>
                  </h2>
                </div>
              </div>
            </div>

            {/* Wholesale Pack Info & Quantity Calculation */}
            <div className="mb-10 bg-[#f9f8ff] border border-primary/20 rounded-[2.5rem] p-8 md:p-10 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start gap-4 mb-8 pb-8 border-b border-black/5">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-black text-primary">قوانین سیستم فروش عمده</h3>
                  <p className="text-sm text-secondary/80 font-medium leading-relaxed mt-2">
                    {dynamicSaleMode === "full_series"
                      ? <>این محصول به صورت <strong>پک‌های {MOCK_PRODUCT.packSize.toLocaleString('fa-IR')} عددی</strong> به فروش می‌رسد. <br /><span className="inline-block mt-2 font-bold text-accent">بسته‌بندی شرکتی: این مدل صرفاً به صورت سری کامل رنگ‌ها توزیع می‌گردد.</span></>
                      : <>این محصول به صورت <strong>سری‌های انتخابی</strong> به فروش می‌رسد (فاقد پک اجباری). <br /><span className="inline-block mt-2 font-bold text-accent">انتخاب آزاد: حداقل {MIN_COLORS_CUSTOM.toLocaleString('fa-IR')} رنگ باید انتخاب شود که هر کدام شامل تمام سایزها ({piecesPerColor.toLocaleString('fa-IR')} عدد لباس) است.</span></>
                    }
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Counter */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  {dynamicSaleMode === "full_series" ? (
                    <>
                      <span className="text-xs font-bold text-secondary">تعداد پک:</span>
                      <div className="flex items-center gap-4 bg-white rounded-[1.5rem] shadow-sm border border-black/10 p-2 w-full sm:w-auto justify-between">
                        <button onClick={handleDecrease} className="w-12 h-12 flex items-center justify-center bg-[#f9f8ff] text-secondary rounded-xl hover:bg-black/5 transition-colors font-black text-2xl">-</button>
                        <div className="flex flex-col items-center justify-center px-4">
                          <span className="font-black text-2xl text-secondary">{packQuantity.toLocaleString('fa-IR')}</span>
                        </div>
                        <button onClick={handleIncrease} className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-black text-2xl">+</button>
                      </div>
                    </>
                  ) : (
                    <span className="text-xs font-medium text-accent text-right sm:text-right mt-2 sm:mt-0 max-w-[220px] leading-relaxed">
                      لطفاً با استفاده از دکمه‌های + و - تعداد سری مورد نظر از هر رنگ را در کادر پایین انتخاب کنید.
                    </span>
                  )}
                </div>

                {/* Total Price Statement */}
                <div className="flex flex-col text-center sm:text-left w-full sm:w-auto mt-4 sm:mt-0">
                  <span className="text-sm font-bold text-accent mb-2">
                    مجموع فاکتور برای {totalItems.toLocaleString('fa-IR')} عدد (تومان):
                  </span>
                  <div className="flex items-center sm:justify-end gap-2 justify-center">
                    <span className="text-4xl font-lalezar text-primary tracking-wider">{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Color View Selection */}
            <div className="mb-12 bg-white border border-black/5 p-8 md:p-10 rounded-[2.5rem] shadow-sm">
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-secondary">
                    {dynamicSaleMode === "full_series" ? "رنگ‌بندی موجود در پک:" : "انتخاب رنگ‌های دلخواه:"}
                  </span>
                  {dynamicSaleMode === "custom" && (
                    <span className={`text-xs font-bold ${uniqueSelectedColors > 0 ? 'text-green-600 rounded-full bg-green-50 px-3 py-1' : 'text-primary'}`}>
                      {uniqueSelectedColors} رنگ انتخاب شده
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-6">
                {MOCK_PRODUCT.colors.map(color => {
                  const qty = colorQuantities[color.code] || 0;
                  const isSelected = dynamicSaleMode === "full_series" || qty > 0;
                  return (
                    <div key={color.code} className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => handleColorSelect(color)}
                        className={`relative w-9 h-9 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all ${isSelected ? 'ring-2 ring-primary ring-offset-4 ring-offset-white scale-110 shadow-lg' : 'opacity-80 hover:opacity-100 hover:scale-105 shadow-sm'}`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      >
                        {/* Inner inset shadow for realistic 3D sphere look */}
                        <span className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] pointer-events-none" />
                        {isSelected && dynamicSaleMode === "custom" && (
                          <svg className="w-4 h-4 md:w-6 md:h-6 text-white/90 drop-shadow-md z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      {dynamicSaleMode === "custom" && isSelected && (
                        <div className="flex items-center gap-2 bg-[#f9f8ff] border border-black/5 rounded-full px-2 py-1 shadow-sm mt-1">
                          <button onClick={(e) => handleColorDecrement(e, color.code)} className="text-secondary font-black text-lg w-5 h-5 flex items-center justify-center hover:bg-black/5 rounded-full cursor-pointer">-</button>
                          <span className="text-xs font-black text-secondary w-3 text-center">{qty.toLocaleString("fa-IR")}</span>
                          <button onClick={(e) => handleColorIncrement(e, color.code)} className="text-secondary font-black text-lg w-5 h-5 flex items-center justify-center hover:bg-black/5 rounded-full cursor-pointer">+</button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Big CTA Buttons - Optimized for mobile */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-16">
              <motion.button
                disabled={!canAddToCart}
                whileHover={canAddToCart ? { scale: 1.02 } : {}}
                whileTap={canAddToCart ? { scale: 0.98 } : {}}
                className={`flex-1 text-white py-5 md:py-7 rounded-2xl md:rounded-[2.5rem] font-black text-base md:text-xl shadow-xl overflow-hidden relative group transition-colors ${canAddToCart ? 'bg-primary shadow-primary/30 cursor-pointer' : 'bg-gray-400 cursor-not-allowed shadow-none'}`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <ShoppingBag className="w-5 h-5 md:w-7 md:h-7" />
                  {canAddToCart ? 'افزودن به سبد خرید' : `حداقل ${MIN_COLORS_CUSTOM.toLocaleString('fa-IR')} رنگ انتخاب کنید`}
                </span>
                {canAddToCart && (
                  <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                )}
              </motion.button>

              <button className="sm:w-24 py-5 md:py-7 bg-white shrink-0 text-secondary border border-black/5 rounded-2xl md:rounded-[2.5rem] shadow-sm hover:shadow-md hover:border-black/10 flex items-center justify-center transition-all">
                <Share2 className="w-5 h-5 md:w-7 md:h-7" />
              </button>
            </div>

            {/* Accordion / Description */}
            <div className="prose prose-sm prose-p:leading-loose text-secondary max-w-none bg-white p-10 md:p-14 rounded-[2.5rem] shadow-sm border border-black/5">
              <h3 className="text-2xl font-black mb-8 text-primary border-b border-black/5 pb-4">توضیحات محصول</h3>
              <div className="text-base text-secondary/80 font-medium leading-relaxed mb-12">
                {MOCK_PRODUCT.description}
              </div>

              <h3 className="text-2xl font-black mt-12 mb-8 text-primary border-b border-black/5 pb-4">ویژگی‌های برجسته</h3>
              <ul className="list-disc pr-8 space-y-4 text-base font-medium text-secondary/80">
                {MOCK_PRODUCT.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
