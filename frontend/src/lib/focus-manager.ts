'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook to manage focus within a container (Focus Trap)
 */
export function useFocusTrap(active: boolean) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!active) return;

        const container = containerRef.current;
        if (!container) return;

        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        container.addEventListener('keydown', handleKeyDown);
        firstElement?.focus();

        return () => container.removeEventListener('keydown', handleKeyDown);
    }, [active]);

    return containerRef;
}

/**
 * Utility to restore focus to a previous element
 */
export function useFocusRestoration(active: boolean) {
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (active) {
            previousFocusRef.current = document.activeElement as HTMLElement;
        } else {
            previousFocusRef.current?.focus();
        }
    }, [active]);
}
