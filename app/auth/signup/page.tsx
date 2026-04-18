"use client";

import { useState } from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, ArrowRight, User, Phone, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Signup with:", fullName, phone);
        // Simulation of success
        alert("ثبت‌نام با موفقیت انجام شد");
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-[#f9f8ff] overflow-hidden dir-rtl select-none pt-12 pb-12">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md px-6"
            >
                <div className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_0_rgba(154,37,134,0.08)] rounded-[2.5rem] p-8 md:p-10 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-3">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 rounded-full border-2 border-primary/20 p-1">
                                <div className="relative w-full h-full rounded-full overflow-hidden">
                                     <Image src="/zigo.jpg" alt="Zigo Logo" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl font-yekan font-black text-secondary tracking-tight">ایجاد حساب کاربری</h1>
                        <p className="text-sm font-yekan text-accent font-medium">برای ورود سریع، نام و شماره همراه خود را وارد کنید</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-yekan font-bold text-secondary/80 mr-2">نام و نام خانوادگی</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-white/50 border border-secondary/10 px-12 py-4 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-right"
                                    placeholder="مـحسن زیـگو"
                                />
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/40 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-yekan font-bold text-secondary/80 mr-2">شماره همراه</label>
                            <div className="relative group">
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-white/50 border border-secondary/10 px-12 py-4 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-right"
                                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                                />
                                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/40 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-yekan pt-2 text-secondary/60">
                            <p>با تایید شماره، شما تمام <span className="text-primary font-bold cursor-pointer hover:underline">قوانین و مقررات</span> زیگو را پذیرفته‌اید.</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-primary py-4 rounded-2xl text-white font-yekan font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary/95 transition-all flex items-center justify-center gap-2"
                        >
                            <span>ثبت‌نام و ایجاد حساب</span>
                            <ArrowLeft className="w-4 h-4" />
                        </motion.button>
                    </form>

                    {/* Footer Link */}
                    <div className="pt-4 text-center border-t border-secondary/5">
                        <p className="text-sm font-yekan text-secondary/60">
                            قبلا ثبت‌نام کرده‌اید؟{" "}
                            <NextLink href="/auth/login" className="text-primary font-black hover:underline underline-offset-4">
                                وارد شوید
                            </NextLink>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-8 text-center pb-8">
                    <NextLink href="/" className="inline-flex items-center gap-2 text-secondary/40 hover:text-secondary transition-colors font-yekan text-xs font-bold">
                        <ArrowRight className="w-4 h-4" />
                        بازگشت به صفحه اصلی
                    </NextLink>
                </div>
            </motion.div>
        </div>
    );
}
