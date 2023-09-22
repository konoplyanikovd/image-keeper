
export type Locales = 'ru-RU' | 'en-EN';

if (!localStorage.getItem('locale')) localStorage.setItem('locale', 'en-EN');
let locale = localStorage.getItem('locale') as Locales;

export default async (name: string) => {
    const strings: Record<Locales, Record<string, string | undefined>> = (await import(`../i18n/${name}.json`)).default;

    return (key: string, keyLocale: Locales | null = null) => strings[keyLocale ?? locale][key] ?? key;
};

export const changeLocale = (keyLocale: Locales) => localStorage.setItem('locale', keyLocale);