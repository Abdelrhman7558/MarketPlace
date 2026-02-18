# Component Standards & Governance

> This document defines the strict UI rules for the B2B Marketplace. All new components must adhere to these standards to maintain a premium, trustworthy look and feel.

## 1. Layout Density
**Rule:** B2B interfaces must be information-dense but not cluttered.
- **Card Padding:** Use `p-4` (16px) for standard cards, `p-6` (24px) for featured panels.
- **Grid Gap:** Use `gap-4` (16px) for lists, `gap-6` (24px) for major sections.
- **Table Rows:** Height should be `h-12` (48px) for comfortable clicking, dense mode `h-10` (40px) allowed for admin views.

## 2. Button Hierarchy
- **Primary:** `bg-primary text-white hover:bg-primary-light` (Main CTAs: Add to Cart, Checkout)
- **Secondary:** `bg-white border border-gray-300 text-gray-700 hover:bg-gray-50` (Filters, Export)
- **Ghost:** `text-gray-600 hover:bg-gray-100` (Icon buttons, tertiary actions)
- **Destructive:** `bg-red-600 text-white` (Delete, Cancel Order)

## 3. Input States
- **Default:** `border-gray-300`
- **Focus:** `ring-2 ring-primary/20 border-primary` (Deep Navy focus ring)
- **Error:** `border-red-500 ring-red-500/20`
- **Disabled:** `bg-gray-100 text-gray-400 cursor-not-allowed`

## 4. Typography Usage
- **Display Headings:** `font-bold tracking-tight text-primary-dark`
- **Body Text:** `text-slate-600` (Never pure black for body)
- **Labels:** `text-xs font-medium uppercase tracking-wider text-slate-500`

## 5. Shadow & Elevation (Material-inspired)
- **Flat:** No shadow (Backgrounds)
- **Low (sm):** Standard buttons, inputs.
- **Mid (md):** Cards, dropdowns.
- **High (xl):** Modals, Sticky headers, Toasts.

## 6. Motion Guidelines
- **Duration:** All micro-interactions < 300ms.
- **Easing:** Use `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Properties:** Animate `transform` and `opacity` only. Avoid animating `width`, `height`, `margin` (causes layout shift).
