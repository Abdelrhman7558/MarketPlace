'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, PackageSearch, CreditCard, Truck, Users, BarChart3, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const steps = [
    {
        icon: Users,
        titleEn: '1. Create Your Account',
        titleAr: '١. أنشئ حسابك',
        descEn: 'Sign up as a Supplier or Customer. Fill in your company details and wait for admin approval to get started.',
        descAr: 'سجّل كمورد أو عميل. املأ بيانات شركتك وانتظر موافقة الإدارة للبدء.',
        color: 'from-blue-500 to-cyan-400',
    },
    {
        icon: PackageSearch,
        titleEn: '2. Browse or List Products',
        titleAr: '٢. تصفح أو أضف المنتجات',
        descEn: 'Customers can browse thousands of products across categories. Suppliers can list products individually or via bulk Excel upload.',
        descAr: 'العملاء يقدروا يتصفحوا آلاف المنتجات. الموردين يقدروا يضيفوا منتجات فردية أو بالجملة عن طريق ملف Excel.',
        color: 'from-emerald-500 to-teal-400',
    },
    {
        icon: CreditCard,
        titleEn: '3. Place Orders',
        titleAr: '٣. اطلب المنتجات',
        descEn: 'Add products to your cart, review your order, and complete checkout. Minimum order quantities apply for wholesale pricing.',
        descAr: 'أضف المنتجات للسلة، راجع طلبك، وأكمل الشراء. الحد الأدنى للطلب ينطبق على أسعار الجملة.',
        color: 'from-violet-500 to-purple-400',
    },
    {
        icon: Truck,
        titleEn: '4. Track & Receive',
        titleAr: '٤. تتبع واستلم',
        descEn: 'Track your order status in real-time from your dashboard. Get notifications at every stage of delivery.',
        descAr: 'تتبع حالة طلبك في الوقت الفعلي من لوحة التحكم. استلم إشعارات في كل مرحلة من مراحل التوصيل.',
        color: 'from-orange-500 to-amber-400',
    },
    {
        icon: BarChart3,
        titleEn: '5. Manage Your Dashboard',
        titleAr: '٥. إدارة لوحة التحكم',
        descEn: 'Suppliers get powerful analytics, inventory management, and placement tools. Customers can track orders and manage preferences.',
        descAr: 'الموردين عندهم تحليلات قوية، إدارة مخزون، وأدوات إعلانية. العملاء يقدروا يتتبعوا طلباتهم',
        color: 'from-rose-500 to-pink-400',
    },
    {
        icon: ShieldCheck,
        titleEn: '6. Secure & Trusted',
        titleAr: '٦. آمن وموثوق',
        descEn: 'All transactions are secured with military-grade encryption. Smart contracts ensure fair pricing and accountability.',
        descAr: 'كل المعاملات مأمنة بتشفير عسكري. العقود الذكية تضمن أسعار عادلة ومسؤولية.',
        color: 'from-sky-500 to-blue-400',
    },
];

export default function HowItWorksPage() {
    const { locale } = useLanguage();
    const isAr = locale === 'ar';

    return (
        <div className="min-h-screen bg-background" dir={isAr ? 'rtl' : 'ltr'}>
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-[#0A1628] via-[#0F2847] to-[#0A1628] text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                            <HelpCircle size={14} />
                            {isAr ? 'دليل المنصة' : 'Platform Guide'}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                            {isAr ? 'إزاى تستخدم ' : 'How to use '}
                            <span className="text-secondary">Atlantis</span>
                            {isAr ? '؟' : '?'}
                        </h1>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto">
                            {isAr
                                ? 'منصة أتلانتس هي ماركت بليس B2B لتوزيع المشروبات والمنتجات بالجملة. هنا هتلاقي كل اللي محتاج تعرفه عشان تبدأ.'
                                : 'Atlantis is a B2B marketplace for wholesale beverage distribution. Here\'s everything you need to know to get started.'}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Steps */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid gap-8 max-w-4xl mx-auto">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-6 bg-card border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-shadow group"
                        >
                            <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                <step.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black mb-2">{isAr ? step.titleAr : step.titleEn}</h3>
                                <p className="text-foreground/60 leading-relaxed">{isAr ? step.descAr : step.descEn}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20"
                    >
                        <ArrowLeft size={20} />
                        {isAr ? 'ارجع للصفحة الرئيسية' : 'Back to Homepage'}
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
