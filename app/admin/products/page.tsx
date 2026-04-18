"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useStore, Product, ProductColor } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Plus,
    Pencil,
    Trash2,
    X,
    Save,
    Package,
    Upload,
    Layers,
    Palette,
    Type,
    DollarSign,
    Hash,
    ChevronDown,
    ChevronUp,
    Image as ImageIcon,
    Check,
    Box,
    Settings
} from "lucide-react";

// ─── Custom Rich Color Picker Component ───
function RichColorPicker({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Simple HEX to RGB converter
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    const rgb = hexToRgb(value);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-2xl border-4 border-white shadow-xl flex-shrink-0 transition-transform active:scale-90"
                style={{ backgroundColor: value }}
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={popoverRef}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute right-0 top-full mt-2 z-[300] bg-[#1a1c1e] rounded-[2rem] p-6 shadow-2xl border border-white/10 w-[240px] text-white dir-ltr"
                    >
                        {/* Color Area Preview */}
                        <div
                            className="aspect-video rounded-2xl mb-6 relative overflow-hidden flex items-end p-4"
                            style={{ backgroundColor: value }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <span className="relative font-mono font-bold text-lg tracking-widest">{value.toUpperCase()}</span>
                        </div>

                        {/* Standard Color Grid (Hover friendly) */}
                        <div className="grid grid-cols-6 gap-2 mb-6">
                            {["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A1", "#33FFF3", "#FFD700", "#FF8C00", "#000000", "#FFFFFF", "#808080", "#C0C0C0"].map(c => (
                                <button
                                    key={c}
                                    onClick={() => onChange(c)}
                                    className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 ${value.toLowerCase() === c.toLowerCase() ? "border-white" : "border-transparent"}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>

                        {/* Native Picker as fallback/fine-tune */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest px-1">
                                <span>Fine Tune</span>
                                <span>Native</span>
                            </div>
                            <input
                                type="color"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-full h-10 bg-transparent cursor-pointer rounded-xl overflow-hidden"
                            />
                        </div>

                        {/* RGB Display */}
                        <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-3">
                                <span className="text-[10px] font-bold text-white/20 block mb-1">HEX</span>
                                <span className="font-mono text-xs">{value.toUpperCase()}</span>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3">
                                <span className="text-[10px] font-bold text-white/20 block mb-1">RGB</span>
                                <span className="font-mono text-xs">{rgb.r}, {rgb.g}, {rgb.b}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function AdminProducts() {
    const { products, addProduct, updateProduct, deleteProduct } = useStore();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    // Initial default form state
    const initialFormState: Omit<Product, "id"> = {
        name: "",
        subtitle: "",
        images: ["/outfit1.png"],
        price: "",
        priceNum: 0,
        packSize: 6,
        description: "",
        colors: [{ code: "#000000", name: "مشکی", imgIndex: 0 }],
        sizes: [],
        heights: [],
        features: [],
        allowFullSeries: true,
        allowCustom: false,
        stockSeries: 100,
        stockCustom: 0
    };

    const [form, setForm] = useState<Omit<Product, "id">>(initialFormState);

    const resetForm = () => {
        setForm(initialFormState);
    };

    const openAdd = () => {
        resetForm();
        setEditingProduct(null);
        setIsAdding(true);
    };

    const openEdit = (product: Product) => {
        setForm({
            name: product.name || "",
            subtitle: product.subtitle || "",
            images: product.images || ["/outfit1.png"],
            price: product.price || "",
            priceNum: product.priceNum || 0,
            packSize: product.packSize || 6,
            description: product.description || "",
            colors: product.colors || [{ code: "#000000", name: "مشکی", imgIndex: 0 }],
            sizes: product.sizes || [],
            heights: product.heights || [],
            features: product.features || [],
            allowFullSeries: product.allowFullSeries ?? true,
            allowCustom: product.allowCustom ?? false,
            stockSeries: product.stockSeries ?? 0,
            stockCustom: product.stockCustom ?? 0
        });
        setEditingProduct(product);
        setIsAdding(true);
    };

    const handleSave = () => {
        if (!form.name || !form.price) return;

        if (editingProduct) {
            updateProduct(editingProduct.id, form);
        } else {
            addProduct(form);
        }
        setIsAdding(false);
        resetForm();
        setEditingProduct(null);
    };

    const updateField = (field: keyof Omit<Product, "id">, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    // ─── Nested Array Handlers ───
    const addImage = () => updateField("images", [...form.images, "/outfit1.png"]);
    const updateImage = (idx: number, val: string) => {
        const newImgs = [...form.images];
        newImgs[idx] = val;
        updateField("images", newImgs);
    };
    const removeImage = (idx: number) => updateField("images", form.images.filter((_, i) => i !== idx));

    const addColor = () => updateField("colors", [...(form.colors || []), { code: "#ffffff", name: "رنگ جدید", imgIndex: 0 }]);
    const updateColor = (idx: number, val: Partial<ProductColor>) => {
        const newColors = [...(form.colors || [])];
        newColors[idx] = { ...newColors[idx], ...val };
        updateField("colors", newColors);
    };
    const removeColor = (idx: number) => updateField("colors", (form.colors || []).filter((_, i) => i !== idx));

    const toggleSize = (size: string) => {
        const current = form.sizes || [];
        const next = current.includes(size) ? current.filter(s => s !== size) : [...current, size];
        updateField("sizes", next);
    };

    const updateSize = (idx: number, newSize: string) => {
        const next = [...(form.sizes || [])];
        next[idx] = newSize;
        updateField("sizes", next);
    };

    const toggleHeight = (h: string) => {
        const current = form.heights || [];
        const next = current.includes(h) ? current.filter(x => x !== h) : [...current, h];
        updateField("heights", next);
    };

    const updateHeight = (idx: number, newH: string) => {
        const next = [...(form.heights || [])];
        next[idx] = newH;
        updateField("heights", next);
    };

    const addFeature = (text: string) => {
        if (!text) return;
        updateField("features", [...(form.features || []), text]);
    };

    const removeFeature = (idx: number) => updateField("features", (form.features || []).filter((_, i) => i !== idx));

    const handleDelete = (id: number) => {
        deleteProduct(id);
        setDeleteConfirm(null);
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-yekan font-black text-secondary">مدیریت محصولات</h1>
                    <p className="text-sm font-yekan text-accent mt-1">مدیریت پیشرفته تصاویر، رنگ‌ها و نحوه فروش</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[1.5rem] font-yekan font-black text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    افزودن محصول جدید
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className="relative aspect-[4/5] bg-gray-50">
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
                                {product.allowFullSeries && (
                                    <div className="bg-white/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-[9px] font-black text-secondary">سری کامل</div>
                                )}
                                {product.allowCustom && (
                                    <div className="bg-primary/10 backdrop-blur-md px-3 py-1 rounded-full border border-primary/20 text-[9px] font-black text-primary">انتخابی</div>
                                )}
                            </div>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            <div>
                                <h3 className="font-yekan font-black text-secondary text-sm mb-1 truncate">{product.name}</h3>
                                <p className="font-yekan text-accent text-xs mb-3 truncate italic">{product.subtitle}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-yekan font-black text-primary text-base">{product.price}</span>
                                    <span className="text-[9px] font-bold text-accent">موجودی: {(product.stockSeries || 0) + (product.stockCustom || 0)}</span>
                                </div>
                            </div>

                            {/* Action Bar - Fixed (No hover) */}
                            <div className="flex gap-2 pt-4 border-t border-gray-50">
                                <button
                                    onClick={() => openEdit(product)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-primary/5 hover:text-primary rounded-xl text-secondary transition-all text-[11px] font-black"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                    ویرایش
                                </button>
                                <button
                                    onClick={() => setDeleteConfirm(product.id)}
                                    className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-xl text-secondary transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Advanced Modal Editor */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-secondary/20 backdrop-blur-md z-[100] flex items-center justify-center p-4 lg:p-8"
                        onClick={() => { setIsAdding(false); setEditingProduct(null); }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] md:rounded-[3rem] w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl dir-rtl flex flex-col relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-4 md:p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><Package className="w-6 h-6" /></div>
                                    <div>
                                        <h2 className="text-2xl font-yekan font-black text-secondary">{editingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}</h2>
                                        <p className="text-xs text-accent font-bold">مدیریت کامل جزئیات و سیستم فروش هوشمند</p>
                                    </div>
                                </div>
                                <button onClick={() => { setIsAdding(false); setEditingProduct(null); }} className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors border border-gray-100"><X className="w-6 h-6 text-secondary" /></button>
                            </div>

                            {/* Form Body Scrollable */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 md:space-y-12 bg-gray-50/50">
                                {/* Basic Section */}
                                <section className="space-y-6">
                                    <div className="flex items-center gap-2 mb-6 text-primary"><Type className="w-5 h-5" /><h3 className="font-yekan font-black text-lg">اطلاعات پایه</h3></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-yekan font-black text-secondary/60 mb-2 block mr-1">نام محصول</label>
                                            <input value={form.name} onChange={(e) => updateField("name", e.target.value)} className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="مثلاً: کاپشن نلسون" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-yekan font-black text-secondary/60 mb-2 block mr-1">زیرنویس / تگ</label>
                                            <input value={form.subtitle} onChange={(e) => updateField("subtitle", e.target.value)} className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="مثلاً: مجموعه زمستانه / برزنت" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="text-xs font-yekan font-black text-secondary/60 mb-2 block mr-1">قیمت نمایشی</label>
                                            <input value={form.price} onChange={(e) => updateField("price", e.target.value)} className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ltr text-left" placeholder="۱,۸۹۰,۰۰۰ تومان" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-yekan font-black text-secondary/60 mb-2 block mr-1">قیمت عددی (فقط عدد)</label>
                                            <input type="number" value={form.priceNum} onChange={(e) => updateField("priceNum", parseInt(e.target.value) || 0)} className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ltr text-left" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-yekan font-black text-secondary/60 mb-2 block mr-1">تعداد در پک (برای سری کامل)</label>
                                            <input type="number" value={form.packSize} onChange={(e) => updateField("packSize", parseInt(e.target.value) || 0)} className="w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl font-yekan text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ltr text-left" />
                                        </div>
                                    </div>
                                </section>

                                {/* Sale Modes & Inventory */}
                                <section className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm space-y-6 md:space-y-8">
                                    <div className="flex items-center gap-2 text-primary"><Settings className="w-5 h-5" /><h3 className="font-yekan font-black text-lg">نحوه فروش و موجودی</h3></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Full Series Mode */}
                                        <div className={`p-8 rounded-[2rem] border-2 transition-all ${form.allowFullSeries ? "border-primary bg-primary/5" : "border-gray-100 bg-gray-50/50 opacity-60"}`}>
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-3">
                                                    <Box className={`w-6 h-6 ${form.allowFullSeries ? "text-primary" : "text-gray-400"}`} />
                                                    <span className="font-yekan font-black text-secondary">فروش به صورت سری کامل</span>
                                                </div>
                                                <button onClick={() => updateField("allowFullSeries", !form.allowFullSeries)} className={`w-12 h-6 rounded-full relative transition-all ${form.allowFullSeries ? "bg-primary" : "bg-gray-300"}`}>
                                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.allowFullSeries ? "left-7" : "left-1"}`} />
                                                </button>
                                            </div>
                                            {form.allowFullSeries && (
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest mr-1">تعداد پک‌های موجود</label>
                                                    <input type="number" value={form.stockSeries} onChange={(e) => updateField("stockSeries", parseInt(e.target.value) || 0)} className="w-full bg-white border border-primary/20 px-6 py-4 rounded-xl font-mono font-bold text-primary focus:outline-none" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Custom Selection Mode */}
                                        <div className={`p-8 rounded-[2rem] border-2 transition-all ${form.allowCustom ? "border-primary bg-primary/5" : "border-gray-100 bg-gray-50/50 opacity-60"}`}>
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-3">
                                                    <Layers className={`w-6 h-6 ${form.allowCustom ? "text-primary" : "text-gray-400"}`} />
                                                    <span className="font-yekan font-black text-secondary">فروش به صورت انتخابی</span>
                                                </div>
                                                <button onClick={() => updateField("allowCustom", !form.allowCustom)} className={`w-12 h-6 rounded-full relative transition-all ${form.allowCustom ? "bg-primary" : "bg-gray-300"}`}>
                                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.allowCustom ? "left-7" : "left-1"}`} />
                                                </button>
                                            </div>
                                            {form.allowCustom && (
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest mr-1">تعداد قطعات موجود (کل)</label>
                                                    <input type="number" value={form.stockCustom} onChange={(e) => updateField("stockCustom", parseInt(e.target.value) || 0)} className="w-full bg-white border border-primary/20 px-6 py-4 rounded-xl font-mono font-bold text-primary focus:outline-none" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                {/* Images Gallery */}
                                <section className="space-y-6">
                                    <div className="flex items-center justify-between mb-6 text-primary"><div className="flex items-center gap-2"><ImageIcon className="w-5 h-5" /><h3 className="font-yekan font-black text-lg">گالری تصاویر</h3></div><button onClick={addImage} className="flex items-center gap-2 text-xs font-black bg-white border border-gray-100 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"><Plus className="w-4 h-4" /> افزودن تصویر</button></div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {form.images.map((img, idx) => (
                                            <div key={idx} className="bg-white p-4 rounded-3xl border border-gray-100 space-y-4 shadow-sm group">
                                                <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-3">
                                                    <Image src={img} alt="Product" fill className="object-cover" />
                                                    <button onClick={() => removeImage(idx)} className="absolute top-2 left-2 p-2 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                                <input value={img} onChange={(e) => updateImage(idx, e.target.value)} className="w-full bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl font-yekan text-[10px] ltr text-left focus:outline-none" />
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Colors Management with Rich Color Picker */}
                                <section className="space-y-6">
                                    <div className="flex items-center justify-between mb-6 text-primary"><div className="flex items-center gap-2"><Palette className="w-5 h-5" /><h3 className="font-yekan font-black text-lg">رنگ‌بندی و تناظر تصویر</h3></div><button onClick={addColor} className="flex items-center gap-2 text-xs font-black bg-white border border-gray-100 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"><Plus className="w-4 h-4" /> افزودن رنگ</button></div>
                                    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-x-auto overflow-y-visible">
                                        <table className="w-full text-right">
                                            <thead>
                                                <tr className="bg-gray-50/50 text-[10px] font-yekan font-black text-accent uppercase tracking-widest border-b border-gray-100">
                                                    <th className="px-8 py-5">رنگ انتخابی</th>
                                                    <th className="px-8 py-5">نام فارسی رنگ</th>
                                                    <th className="px-8 py-5 text-center">ایندکس تصویر (0,1...)</th>
                                                    <th className="px-8 py-5"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {form.colors?.map((color, idx) => (
                                                    <tr key={idx} className="group">
                                                        <td className="px-8 py-5">
                                                            <div className="flex items-center gap-4">
                                                                <RichColorPicker value={color.code} onChange={(val) => updateColor(idx, { code: val })} />
                                                                <input value={color.code.toUpperCase()} onChange={(e) => updateColor(idx, { code: e.target.value })} className="bg-transparent ltr text-xs font-mono font-bold outline-none uppercase w-20 text-secondary" />
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 text-sm font-yekan font-bold text-secondary">
                                                            <input value={color.name} onChange={(e) => updateColor(idx, { name: e.target.value })} className="bg-gray-50 border-transparent focus:border-primary/20 border px-4 py-2 rounded-xl outline-none w-full transition-all" placeholder="مثلاً: آبی تیره" />
                                                        </td>
                                                                   <td className="px-8 py-5">
                                                            <button onClick={() => removeColor(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                                {/* Size & Height & Feature Management */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <section className="space-y-6">
                                        <div className="flex items-center gap-2 mb-6 text-primary"><Check className="w-5 h-5" /><h3 className="font-yekan font-black text-lg">سایزبندی فعال</h3></div>
                                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                                            <div className="flex gap-2">
                                                <input id="size-input" className="flex-1 bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl font-yekan text-xs outline-none text-right dir-rtl" placeholder="افزودن سایز جدید (مثال: XL یا ۴۲)..." onKeyDown={(e) => { if (e.key === 'Enter') { const val = e.currentTarget.value.trim(); if(val && !form.sizes?.includes(val)) toggleSize(val); e.currentTarget.value = ""; } }} />
                                                <button onClick={() => { const inp = document.getElementById('size-input') as HTMLInputElement; const val = inp.value.trim(); if(val && !form.sizes?.includes(val)) toggleSize(val); inp.value = ""; }} className="bg-primary text-white px-5 py-3 rounded-2xl font-black text-xs transition-transform active:scale-95">ثبت</button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {form.sizes?.map((size, idx) => (
                                                    <div key={idx} className="group relative flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl transition-all hover:bg-primary/20">
                                                        <input 
                                                            className="bg-transparent text-xs font-yekan font-bold outline-none w-auto min-w-[20px] max-w-[80px] text-center" 
                                                            value={size} 
                                                            onChange={(e) => updateSize(idx, e.target.value)}
                                                        />
                                                        <X className="w-3 h-3 cursor-pointer text-primary/40 hover:text-red-500 transition-colors" onClick={() => toggleSize(size)} />
                                                    </div>
                                                ))}
                                                {(!form.sizes || form.sizes.length === 0) && (
                                                    <div className="text-xs font-yekan text-accent w-full py-2">هیچ سایزی اضافه نشده است</div>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                    
                                    <section className="space-y-6">
                                        <div className="flex items-center gap-2 mb-6 text-primary"><ChevronUp className="w-5 h-5" /><h3 className="font-yekan font-black text-lg">قدهای موجود</h3></div>
                                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                                            <div className="flex gap-2">
                                                <input id="height-input" className="flex-1 bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl font-yekan text-xs outline-none text-right dir-rtl" placeholder="افزودن قد جدید (مثال: ۸۰)..." onKeyDown={(e) => { if (e.key === 'Enter') { const val = e.currentTarget.value.trim(); if(val && !form.heights?.includes(val)) toggleHeight(val); e.currentTarget.value = ""; } }} />
                                                <button onClick={() => { const inp = document.getElementById('height-input') as HTMLInputElement; const val = inp.value.trim(); if(val && !form.heights?.includes(val)) toggleHeight(val); inp.value = ""; }} className="bg-primary text-white px-5 py-3 rounded-2xl font-black text-xs transition-transform active:scale-95">ثبت</button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {form.heights?.map((h, idx) => (
                                                    <div key={idx} className="group relative flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-xl transition-all hover:bg-secondary/20">
                                                        <input 
                                                            className="bg-transparent text-xs font-yekan font-bold outline-none w-auto min-w-[20px] max-w-[80px] text-center" 
                                                            value={h} 
                                                            onChange={(e) => updateHeight(idx, e.target.value)}
                                                        />
                                                        <X className="w-3 h-3 cursor-pointer text-secondary/40 hover:text-red-500 transition-colors" onClick={() => toggleHeight(h)} />
                                                    </div>
                                                ))}
                                                {(!form.heights || form.heights.length === 0) && (
                                                    <div className="text-xs font-yekan text-accent w-full py-2">هیچ قدی اضافه نشده است</div>
                                                )}
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-6 lg:col-span-2">
                                        <div className="flex items-center gap-2 mb-6 text-primary"><Layers className="w-5 h-5" /><h3 className="font-yekan font-black text-lg">ویژگی‌های فنی محصول</h3></div>
                                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                                            <div className="flex gap-3">
                                                <input id="feat-input" className="flex-1 bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl font-yekan text-sm outline-none text-right dir-rtl" placeholder="مثلاً: ضد آب / پارچه برزنت..." onKeyDown={(e) => { if (e.key === 'Enter') { addFeature(e.currentTarget.value); e.currentTarget.value = ""; } }} />
                                                <button onClick={() => { const inp = document.getElementById('feat-input') as HTMLInputElement; addFeature(inp.value); inp.value = ""; }} className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm transition-transform active:scale-95">افزودن</button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                                {(form.features || []).map((f, idx) => (
                                                    <div key={idx} className="flex items-center justify-between px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-primary/20 transition-all">
                                                        <span className="text-sm font-yekan font-bold text-secondary">{f}</span>
                                                        <X className="w-5 h-5 text-red-400 cursor-pointer hover:text-red-600 transition-colors" onClick={() => removeFeature(idx)} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Description Area */}
                                <section className="space-y-6">
                                    <div className="flex items-center gap-2 mb-6 text-primary"><Type className="w-5 h-5" /><h3 className="font-yekan font-black text-lg">توضیحات تکمیلی محصول</h3></div>
                                    <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={6} className="w-full bg-white border border-gray-200 p-8 rounded-[2.5rem] font-yekan text-sm leading-relaxed text-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none shadow-sm" placeholder="توضیحات کامل محصول را در اینجا وارد کنید (جنس، قواره، راهنمای شست‌وشو و...)" />
                                </section>
                            </div>

                            {/* Sticky Footer */}
                            <div className="p-4 md:p-8 border-t border-gray-100 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-3 md:gap-4 shrink-0">
                                <button onClick={handleSave} className="w-full md:flex-[2] flex items-center justify-center gap-3 bg-primary text-white py-4 md:py-5 rounded-2xl md:rounded-[1.5rem] font-yekan font-black text-base md:text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"><Save className="w-6 h-6" /> ذخیره و انتشار تغییرات</button>
                                <button onClick={() => { setIsAdding(false); setEditingProduct(null); }} className="w-full md:flex-1 py-4 md:py-5 bg-gray-100 text-secondary rounded-2xl md:rounded-[1.5rem] font-yekan font-black text-sm hover:bg-gray-200 transition-all">انصراف</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Modal */}
            <AnimatePresence>
                {deleteConfirm !== null && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center dir-rtl" onClick={(e) => e.stopPropagation()}>
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5"><Trash2 className="w-7 h-7 text-red-500" /></div>
                            <h3 className="text-lg font-yekan font-black text-secondary mb-2">حذف محصول</h3>
                            <p className="text-sm font-yekan text-accent mb-6 leading-relaxed">آیا از حذف این محصول مطمئن هستید؟ این عمل غیرقابل بازگشت است.</p>
                            <div className="flex gap-3">
                                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-yekan font-bold text-sm hover:bg-red-600 transition-all">بله، حذف شود</button>
                                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 bg-gray-100 text-secondary rounded-2xl font-yekan font-bold text-sm hover:bg-gray-200 transition-all">انصراف</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
