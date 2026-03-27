export const translationCache = new Map<string, string>();

export async function translateText(text: string, targetLang: string = 'ar'): Promise<string> {
    if (!text || typeof text !== 'string') return text;
    if (targetLang === 'en') return text;

    const cacheKey = `${targetLang}:${text}`;
    if (translationCache.has(cacheKey)) return translationCache.get(cacheKey)!;

    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        if (!res.ok) return text;
        const data = await res.json();

        let translatedText = '';
        if (data && data[0] && Array.isArray(data[0])) {
            translatedText = data[0].map((item: any) => item[0]).join('');
            translationCache.set(cacheKey, translatedText);
            return translatedText;
        }
        return text;
    } catch (err) {
        console.error('Translation error:', err);
        return text;
    }
}
