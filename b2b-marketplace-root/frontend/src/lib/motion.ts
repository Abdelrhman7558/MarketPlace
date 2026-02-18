import { Variants } from 'framer-motion';

// Duration Tokens
export const TRANSITION_FAST = { duration: 0.2, ease: "easeOut" as const };
export const TRANSITION_NORMAL = { duration: 0.3, ease: "easeOut" as const };

// Fade In
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: TRANSITION_NORMAL }
};

// Slide Up (for cards, list items)
export const slideUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: TRANSITION_NORMAL }
};

// Slide In From Right (Drawers)
export const slideInRight: Variants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { x: '100%', transition: TRANSITION_FAST }
};

// Stagger Container (apply to parent of list items)
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

// Hover Lift (Cards)
export const hoverLift = {
    hover: {
        y: -4,
        transition: { duration: 0.2 }
    }
};

// Button Press interaction
export const buttonClick = {
    tap: { scale: 0.98, transition: { duration: 0.1 } }
};

// Cart Bounce
export const cartBounce: Variants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.2, 1], transition: { duration: 0.3 } }
};
