"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    ShoppingBag,
    Image as ImageIcon,
    Phone,
    ArrowRight,
    Menu,
    X,
    LogOut,
} from "lucide-react";

const sidebarLinks = [
    { name: "داشبورد", href: "/admin", icon: LayoutDashboard },
    { name: "محصولات", href: "/admin/products", icon: ShoppingBag },
    { name: "بنر اصلی", href: "/admin/hero", icon: ImageIcon },
    { name: "تماس با ما", href: "/admin/contact", icon: Phone },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 pb-8 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                        <Image src="/zigo.jpg" alt="Logo" fill className="object-cover" />
                    </div>
                    <div>
                        <h2 className="text-white font-black text-sm tracking-tight">ZIGO ADMIN</h2>
                        <span className="text-white/30 text-[10px] font-bold">پنل مدیریت</span>
                    </div>
                </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-4 space-y-1.5">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-yekan font-bold transition-all duration-200 ${active
                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-yekan font-bold text-white/30 hover:text-white hover:bg-white/5 transition-all"
                >
                    <ArrowRight className="w-5 h-5" />
                    بازگشت به سایت
                </Link>
                <Link
                    href="/auth/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-yekan font-bold text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    خروج
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-[#f4f4f8] dir-rtl overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-[260px] flex-shrink-0 bg-zinc-950 flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-zinc-950 z-50 lg:hidden shadow-2xl"
                        >
                            <div className="absolute top-4 left-4">
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 text-white/50 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Bar (Mobile) */}
                <div className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image src="/zigo.jpg" alt="Logo" fill className="object-cover" />
                        </div>
                        <span className="font-black text-sm text-secondary">پنل مدیریت</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-secondary hover:text-primary transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
