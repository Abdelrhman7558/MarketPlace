import { en } from './en';
import { ar } from './ar';

// Basic translations for other languages to satisfy the setup
const de = { ...en, navbar: { ...en.navbar, dashboard: "Armaturenbrett" } };
const fr = { ...en, navbar: { ...en.navbar, dashboard: "Tableau de bord" } };
const es = { ...en, navbar: { ...en.navbar, dashboard: "Panel" } };
const pt = { ...en, navbar: { ...en.navbar, dashboard: "Painel" } };
const ro = { ...en, navbar: { ...en.navbar, dashboard: "Panou" } };

export const translations = {
    en, ar, de, fr, es, pt, ro
};

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof en;
