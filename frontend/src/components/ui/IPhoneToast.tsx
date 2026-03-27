'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppWindow, AlertCircle, CheckCircle, Info, X } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export type IPhoneToastType = "success" | "error" | "info" | "warning";

interface IPhoneToastProps {
    id: string;
    title: string;
    message: string;
    type?: IPhoneToastType;
    icon?: React.ReactNode;
}

export const IPhoneToast = ({ id, title, message, type = "info", icon }: IPhoneToastProps) => {
    // Default icons based on type
    const defaultIcons = {
        success: <CheckCircle className="w-4 h-4 text-emerald-500" />,
        error: <AlertCircle className="w-4 h-4 text-red-500" />,
        info: <Info className="w-4 h-4 text-blue-500" />,
        warning: <AlertCircle className="w-4 h-4 text-amber-500" />,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-[24px] bg-white/70 dark:bg-[#1A1A1A]/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] supports-[backdrop-filter]:bg-white/50"
        >
            <div className="p-4 flex gap-3">
                {/* App Icon Container */}
                <div className="flex-shrink-0 pt-0.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/80 to-primary flex items-center justify-center shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/20" />
                        <AppWindow className="w-5 h-5 text-white relative z-10" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-[13px] font-semibold text-foreground truncate flex items-center gap-1.5">
                            {title}
                        </p>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground shrink-0 flex items-center gap-1">
                            {icon || defaultIcons[type]}
                            {type}
                        </span>
                    </div>
                    <p className="text-[13px] leading-snug text-foreground/80 break-words line-clamp-2 pe-4">
                        {message}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

// Helper function to easily call the toast from anywhere
export const showIPhoneToast = (title: string, message: string, type: IPhoneToastType = "info") => {
    toast.custom(
        (t) => (
            <IPhoneToast
                id={t.id}
                title={title}
                message={message}
                type={type}
            />
        ),
        {
            duration: 4000,
            position: 'top-center',
        }
    );
};
