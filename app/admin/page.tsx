"use client";

import { useStore } from "@/context/StoreContext";
import { ShoppingBag, Image as ImageIcon, Phone, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
    const { products } = useStore();

    const stats = [
        { label: "کل محصولات", value: products.length.toString(), icon: ShoppingBag, color: "bg-primary/10 text-primary", link: "/admin/products" },
        { label: "بنر اصلی", value: "فعال", icon: ImageIcon, color: "bg-emerald-50 text-emerald-600", link: "/admin/hero" },
        { label: "اطلاعات تماس", value: "فعال", icon: Phone, color: "bg-blue-50 text-blue-600", link: "/admin/contact" },
        { label: "بازدید امروز", value: "—", icon: TrendingUp, color: "bg-amber-50 text-amber-600", link: "#" },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-yekan font-black text-secondary">داشبورد</h1>
                <p className="text-sm font-yekan text-accent mt-2">خوش آمدید به پنل مدیریت زیگو</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={stat.link}
                                className="block bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} transition-transform group-hover:scale-110`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <p className="text-2xl font-yekan font-black text-secondary">{stat.value}</p>
                                <p className="text-xs font-yekan text-accent mt-1">{stat.label}</p>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-yekan font-black text-secondary mb-6">دسترسی سریع</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link href="/admin/products" className="p-5 rounded-2xl bg-primary/5 hover:bg-primary/10 text-primary font-yekan font-bold text-sm text-center transition-all border border-primary/10">
                        مدیریت محصولات
                    </Link>
                    <Link href="/admin/hero" className="p-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-yekan font-bold text-sm text-center transition-all border border-emerald-100">
                        ویرایش بنر اصلی
                    </Link>
                    <Link href="/admin/contact" className="p-5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-yekan font-bold text-sm text-center transition-all border border-blue-100">
                        اطلاعات تماس
                    </Link>
                </div>
            </div>
        </div>
    );
}
