"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";
import { Save, CheckCircle2, Phone, MapPin, Instagram, MessageCircle, Send } from "lucide-react";

export default function AdminContact() {
    const { contact, updateContact } = useStore();
    const [phone, setPhone] = useState(contact.phone);
    const [address, setAddress] = useState(contact.address);
    const [instagram, setInstagram] = useState(contact.instagram);
    const [whatsapp, setWhatsapp] = useState(contact.whatsapp);
    const [telegram, setTelegram] = useState(contact.telegram);
    const [supportMessage, setSupportMessage] = useState(contact.supportMessage);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateContact({ phone, address, instagram, whatsapp, telegram, supportMessage });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const fields = [
        { label: "شماره تماس", value: phone, setter: setPhone, icon: Phone, placeholder: "۰۹۱۲ ۳۴۵ ۶۷۸۹" },
        { label: "آدرس فروشگاه", value: address, setter: setAddress, icon: MapPin, placeholder: "لواسان، مجتمع هدیه..." },
        { label: "اینستاگرام", value: instagram, setter: setInstagram, icon: Instagram, placeholder: "@zigo_style" },
        { label: "واتس‌اپ", value: whatsapp, setter: setWhatsapp, icon: MessageCircle, placeholder: "ارسال پیام متنی" },
        { label: "تلگرام", value: telegram, setter: setTelegram, icon: Send, placeholder: "@zigo_support" },
    ];

    return (
        <div className="space-y-8 max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-yekan font-black text-secondary">تماس با ما</h1>
                <p className="text-sm font-yekan text-accent mt-1">ویرایش اطلاعات تماس و شبکه‌های اجتماعی</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-5">
                {fields.map((field, i) => {
                    const Icon = field.icon;
                    return (
                        <div key={i}>
                            <label className="text-sm font-yekan font-bold text-secondary/70 mb-1.5 flex items-center gap-2 mr-1">
                                <Icon className="w-4 h-4 text-primary" />
                                {field.label}
                            </label>
                            <input
                                value={field.value}
                                onChange={(e) => field.setter(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-right"
                                placeholder={field.placeholder}
                            />
                        </div>
                    );
                })}

                {/* Support Message */}
                <div>
                    <label className="text-sm font-yekan font-bold text-secondary/70 mb-1.5 block mr-1">پیام پشتیبانی</label>
                    <textarea
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-100 px-5 py-3.5 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-right resize-none"
                    />
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
