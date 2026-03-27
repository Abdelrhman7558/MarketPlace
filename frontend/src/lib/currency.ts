/**
 * currency.ts - Utility for dynamic currency formatting
 */

/**
 * Formats a given number into a currency string.
 * @param amount The numeric amount to format.
 * @param forceEuro If true, returns the value formatted as Euros (€). 
 *                  If false, returns the value formatted dynamically based on the user's locale/country.
 * @returns The formatted currency string.
 */
export function formatPrice(amount: number, forceEuro: boolean = false): string {
    // If no amount is provided, fallback to 0 safely
    const safeAmount = amount ?? 0;

    let isEuroUser = false;
    try {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('bev-user');
            if (userStr && userStr.includes('7bd02025@gmail.com')) {
                isEuroUser = true;
            }
        }
    } catch (e) { }

    // Admin view or specific user always uses Euro
    if (forceEuro || isEuroUser) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(safeAmount);
    }

    // Attempt to guess locale from the browser or use admin global config
    let locale = 'en-US';
    let currency = 'USD'; // Default fallback

    try {
        if (typeof window !== 'undefined') {
            const platformCurrency = localStorage.getItem('platform-currency');
            if (platformCurrency) {
                currency = platformCurrency;
                // Basic locale matching for exact currencies
                if (currency === 'EUR') locale = 'en-GB'; // or appropriate fallback
                if (currency === 'EGP') locale = 'ar-EG';
                if (currency === 'AED') locale = 'ar-AE';
                if (currency === 'SAR') locale = 'ar-SA';
                if (currency === 'GBP') locale = 'en-GB';
            }

            locale = navigator.language || locale;

            // Only run heuristic if no platform currency is enforced
            if (!platformCurrency) {
                const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
                if (timeZone.startsWith('Europe/')) {
                    currency = timeZone.includes('London') ? 'GBP' : 'EUR';
                } else if (timeZone.startsWith('Africa/Cairo')) {
                    currency = 'EGP';
                    locale = 'ar-EG';
                } else if (timeZone.startsWith('Asia/Dubai')) {
                    currency = 'AED';
                } else if (timeZone.startsWith('Asia/Riyadh')) {
                    currency = 'SAR';
                } else if (timeZone.startsWith('America/')) {
                    currency = 'USD';
                }
            }
        }
    } catch (e) {
        // Fallback to USD on error
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(safeAmount);
}

/**
 * Returns currency information based on the same logic as formatPrice
 */
export function getCurrencyInfo(forceEuro: boolean = false): { symbol: string, code: string } {
    let isEuroUser = false;
    try {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('bev-user');
            if (userStr && userStr.includes('7bd02025@gmail.com')) {
                isEuroUser = true;
            }
        }
    } catch (e) { }

    if (forceEuro || isEuroUser) return { symbol: '€', code: 'EUR' };

    let code = 'USD';
    let symbol = '$';

    try {
        if (typeof window !== 'undefined') {
            const platformCurrency = localStorage.getItem('platform-currency');
            if (platformCurrency) {
                code = platformCurrency;
            } else {
                const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
                if (timeZone.startsWith('Europe/')) {
                    code = timeZone.includes('London') ? 'GBP' : 'EUR';
                } else if (timeZone.startsWith('Africa/Cairo')) {
                    code = 'EGP';
                } else if (timeZone.startsWith('Asia/Dubai')) {
                    code = 'AED';
                } else if (timeZone.startsWith('Asia/Riyadh')) {
                    code = 'SAR';
                }
            }

            // Extract symbol using Intl
            const formatter = new Intl.NumberFormat(navigator.language || 'en-US', {
                style: 'currency',
                currency: code,
            });
            const parts = formatter.formatToParts(0);
            const symbolPart = parts.find(part => part.type === 'currency');
            symbol = symbolPart ? symbolPart.value : (code === 'EUR' ? '€' : '$');
        }
    } catch (e) { }

    return { symbol, code };
}
