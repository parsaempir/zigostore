"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import Image from "next/image";
import { motion } from "framer-motion";
import { Save, CheckCircle2, Image as ImageIcon } from "lucide-react";

export default function AdminHero() {
    const { hero, updateHero } = useStore();
    const [title, setTitle] = useState(hero.title);
    const [highlight, setHighlight] = useState(hero.highlight);
    const [cta, setCta] = useState(hero.cta);
    const [image1, setImage1] = useState(hero.image1);
    const [image2, setImage2] = useState(hero.image2);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateHero({ title, highlight, cta, image1, image2 });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-8 max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-yekan font-black text-secondary">بنر اصلی</h1>
                <p className="text-sm font-yekan text-accent mt-1">ویرایش متن و تصاویر بخش هیرو صفحه اصلی</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
                {/* Title */}
                <div>
                    <label className="text-sm font-yekan font-bold text-secondary/70 mb-1.5 block mr-1">عنوان اصلی</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-right" />
                </div>

                {/* Highlight */}
                <div>
                    <label className="text-sm font-yekan font-bold text-secondary/70 mb-1.5 block mr-1">کلمه برجسته (هایلایت)</label>
                    <input value={highlight} onChange={(e) => setHighlight(e.target.value)} className="w-full bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-right" />
                </div>

                {/* CTA */}
                <div>
                    <label className="text-sm font-yekan font-bold text-secondary/70 mb-1.5 block mr-1">متن دکمه</label>
                    <input value={cta} onChange={(e) => setCta(e.target.value)} className="w-full bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-right" />
                </div>

                {/* Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="text-sm font-yekan font-bold text-secondary/70 mb-1.5 block mr-1">تصویر سمت راست</label>
                        <input value={image1} onChange={(e) => setImage1(e.target.value)} className="w-full bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left ltr mb-3" dir="ltr" />
                        <div className="relative aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                            <Image src={image1} alt="Hero 1" fill className="object-cover" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-yekan font-bold text-secondary/70 mb-1.5 block mr-1">تصویر سمت چپ</label>
                        <input value={image2} onChange={(e) => setImage2(e.target.value)} className="w-full bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-left ltr mb-3" dir="ltr" />
                        <div className="relative aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                            <Image src={image2} alt="Hero 2" fill className="object-cover" />
                        </div>
                    </div>
                </div>

                {/* Save */}
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSave}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-yekan font-bold text-sm transition-all shadow-lg ${saved ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-primary text-white shadow-primary/20 hover:bg-primary/90"
                        }`}
                >
                    {saved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                    {saved ? "ذخیره شد!" : "ذخیره تغییرات"}
                </motion.button>
            </div>
        </div>
    );
}
