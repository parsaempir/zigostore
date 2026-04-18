"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProductColor {
    code: string;
    name: string;
    imgIndex: number;
}

export interface Product {
    id: number;
    name: string;
    images: string[];
    price: string;
    subtitle: string;
    // Extended fields for product detail page
    priceNum?: number;
    packSize?: number;
    description?: string;
    colors?: ProductColor[];
    sizes?: string[];
    heights?: string[];
    features?: string[];
    saleMode?: "full_series" | "custom";
    allowFullSeries?: boolean;
    allowCustom?: boolean;
    stockSeries?: number;
    stockCustom?: number;
}

export interface HeroData {
    title: string;
    highlight: string;
    cta: string;
    image1: string;
    image2: string;
}

export interface ContactData {
    phone: string;
    address: string;
    instagram: string;
    whatsapp: string;
    telegram: string;
    supportMessage: string;
}

interface StoreContextType {
    products: Product[];
    hero: HeroData;
    contact: ContactData;
    addProduct: (product: Omit<Product, "id">) => void;
    updateProduct: (id: number, product: Partial<Product>) => void;
    deleteProduct: (id: number) => void;
    updateHero: (data: Partial<HeroData>) => void;
    updateContact: (data: Partial<ContactData>) => void;
}

// ─── Default Data (seeded from existing hardcoded values) ────────────────────

const defaultProducts: Product[] = [
    { id: 1, name: "کاپشن کلاسیک زیگو", images: ["/outfit1.png"], price: "۱,۸۹۰,۰۰۰ تومان", subtitle: "قهوه‌ای / برزنت شسته‌شده" },
    { id: 2, name: "تی‌شرت لانگ طرح مار", images: ["/file_00000000cc88720aa6c754f889026f84.jpg"], price: "۷۹۰,۰۰۰ تومان", subtitle: "مشکی ذغالی / پنبه سنگ‌شور" },
    { id: 3, name: "هودی نلسون پرمیوم", images: ["/outfit2.png"], price: "۱,۴۹۰,۰۰۰ تومان", subtitle: "طوسی / دورس ضخیم" },
    { id: 4, name: "شلوار کارگو بردی", images: ["/file_00000000d5bc720ab136d0555f23fd2c.jpg"], price: "۱,۱۹۰,۰۰۰ تومان", subtitle: "دودی / کتان سنگ‌شور" },
    { id: 5, name: "کت جین زاپ‌دار", images: ["/IMG_20260227_221721_726.jpg"], price: "۲,۳۵۰,۰۰۰ تومان", subtitle: "آبی روشن / دنیم ضخیم" },
    { id: 6, name: "پیراهن مخمل کبریتی", images: ["/IMG_20260225_105448_730.jpg"], price: "۹۸۰,۰۰۰ تومان", subtitle: "خردلی / مخمل ۱۰۰٪ پنبه" },
    { id: 7, name: "دورس یقه ۳ سانت", images: ["/IMG_20260227_221751_181.jpg"], price: "۱,۲۵۰,۰۰۰ تومان", subtitle: "سرمه‌ای / پنبه دورس" },
    { id: 8, name: "تی‌شرت نخی بیسیک", images: ["/IMG_20260209_192639_488.jpg"], price: "۵۹۰,۰۰۰ تومان", subtitle: "سفید / پنبه سوپر" },
];

const defaultHero: HeroData = {
    title: "بوتیک اختصاصی",
    highlight: "زیگو",
    cta: "مشاهده کالکشن اختصاصی زیگو",
    image1: "/outfit1.png",
    image2: "/outfit2.png",
};

const defaultContact: ContactData = {
    phone: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
    address: "لواسان، مجتمع هدیه، طبقه اول",
    instagram: "@zigo_style",
    whatsapp: "ارسال پیام متنی",
    telegram: "@zigo_support",
    supportMessage: "تیم پشتیبانی متخصص زیگو از ساعت ۱۰ صبح الی ۹ شب در تمامی پلتفرم‌ها آماده پاسخگویی به سوالات شماست.",
};

// ─── Context ─────────────────────────────────────────────────────────────────

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
}

export function StoreProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>(() => loadFromStorage("zigo_products", defaultProducts));
    const [hero, setHero] = useState<HeroData>(() => loadFromStorage("zigo_hero", defaultHero));
    const [contact, setContact] = useState<ContactData>(() => loadFromStorage("zigo_contact", defaultContact));

    // Persist to localStorage on change
    useEffect(() => { localStorage.setItem("zigo_products", JSON.stringify(products)); }, [products]);
    useEffect(() => { localStorage.setItem("zigo_hero", JSON.stringify(hero)); }, [hero]);
    useEffect(() => { localStorage.setItem("zigo_contact", JSON.stringify(contact)); }, [contact]);

    const addProduct = (product: Omit<Product, "id">) => {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        setProducts(prev => [...prev, { ...product, id: newId }]);
    };

    const updateProduct = (id: number, updates: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProduct = (id: number) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const updateHero = (data: Partial<HeroData>) => {
        setHero(prev => ({ ...prev, ...data }));
    };

    const updateContact = (data: Partial<ContactData>) => {
        setContact(prev => ({ ...prev, ...data }));
    };

    return (
        <StoreContext.Provider value={{ products, hero, contact, addProduct, updateProduct, deleteProduct, updateHero, updateContact }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useStore must be used within a StoreProvider");
    return context;
}
