"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, ArrowRight, User } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", email, password);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#f9f8ff] overflow-hidden dir-rtl select-none">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_0_rgba(154,37,134,0.08)] rounded-[2.5rem] p-8 md:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Link href="/" className="inline-block relative w-20 h-20 rounded-full border-2 border-primary/20 p-1 mb-2 hover:scale-105 transition-transform">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image src="/zigo.jpg" alt="Zigo Logo" fill className="object-cover" />
              </div>
            </Link>
            <h1 className="text-3xl font-yekan font-black text-secondary tracking-tight">خوش آمدید</h1>
            <p className="text-sm font-yekan text-accent font-medium mt-2">جهت ورود به پنل کاربری اطلاعات خود را وارد کنید</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-yekan font-bold text-secondary/80 mr-2">ایمیل یا شماره همراه</label>
              <div className="relative group">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 border border-secondary/10 px-12 py-4 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-right"
                  placeholder="example@mail.com"
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/40 group-focus-within:text-primary transition-colors" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-yekan font-bold text-secondary/80 mr-2">رمز عبور</label>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/50 border border-secondary/10 px-12 py-4 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-right"
                  placeholder="••••••••"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/40 group-focus-within:text-primary transition-colors" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-yekan pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-secondary/20 text-primary focus:ring-primary/20 transition-all" />
                <span className="text-secondary/60 group-hover:text-secondary transition-colors">مرا به خاطر بسپار</span>
              </label>
              <Link href="#" className="text-primary hover:text-primary/80 font-bold transition-colors">رمز عبور را فراموش کرده‌اید؟</Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-primary py-4 rounded-2xl text-white font-yekan font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary/95 transition-all flex items-center justify-center gap-2"
            >
              <span>ورود به حساب</span>
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
          </form>

          {/* Footer Link */}
          <div className="pt-4 text-center border-t border-secondary/5">
            <p className="text-sm font-yekan text-secondary/60">
              اگر هنوز ثبت‌نام نکرده‌اید،{" "}
              <Link href="/auth/signup" className="text-primary font-black hover:underline underline-offset-4">
                برای ثبت‌نام کلیک کنید
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-secondary/40 hover:text-secondary transition-colors font-yekan text-xs font-bold">
            <ArrowRight className="w-4 h-4" />
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
