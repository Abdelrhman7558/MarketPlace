'use client';

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20" />;
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors border border-accent/20"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun className="h-5 w-5 text-yellow-400 transition-all" />
            ) : (
                <Moon className="h-5 w-5 text-slate-700 transition-all" />
            )}
        </motion.button>
    );
}
