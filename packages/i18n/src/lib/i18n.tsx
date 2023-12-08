'use client';
import I18n from 'i18n-js';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import * as EnTranslation from './translations/en.json';
import * as FrTranslation from './translations/fr.json';
import { usePathname } from 'next/navigation';

const DEFAULT_LOCALE_CODE = 'en';

const translations = {
  en: EnTranslation,
  fr: FrTranslation,
};

function saveToLocalStorage(locale: string) {
  localStorage.setItem('locale', locale);
}

function loadFromLocalStorage() {
  return localStorage.getItem('locale');
}

/*
  Translation context is used to pass translations to children.
*/
export const TranslationContext: React.Context<{
  locale: string;
  setLocale: (locale: string) => void;
  i18n: typeof I18n;
  pathname: string;
}> = React.createContext<{
  locale: string;
  setLocale: (locale: string) => void;
  i18n: typeof I18n;
  pathname: string;
}>({
  locale: DEFAULT_LOCALE_CODE,
  setLocale: (locale: string) => locale,
  i18n: I18n,
  pathname: '',
});

/*
  Translation provider is used to pass translations to children.
  manages current locale and provides translation object (i18n).
*/
export function TranslationProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<string>(DEFAULT_LOCALE_CODE);

  if (Array.isArray(locale)) {
    throw new Error('locale should not be an array');
  }

  const changeLocale = useCallback(
    (newLocale: string) => {
      saveToLocalStorage(newLocale);
      setLocale(newLocale);
    },
    [setLocale]
  );

  const i18n = useMemo(() => {
    I18n.locale = locale;
    I18n.fallbacks = true;
    I18n.translations = translations;
    return I18n;
  }, [locale]);

  const context = useMemo(
    () => ({ locale, setLocale: changeLocale, i18n, pathname }),
    [i18n, locale, changeLocale, pathname]
  );

  // load locale from user preferences or local storage
  useEffect(() => {
    const storedLocale = loadFromLocalStorage();

    // if a stored locale is present, use it
    if (storedLocale && storedLocale in translations) {
      setLocale(storedLocale);
    } else {
      const userLanguages = window.navigator.languages || [];

      const found = userLanguages.find((value) => value in translations);
      if (found) setLocale(found);
    }
  }, [locale, setLocale]);

  return (
    <TranslationContext.Provider value={context}>
      {children}
    </TranslationContext.Provider>
  );
}

/*
  Retrieves the context of translation
*/
export function useTranslation() {
  const context = React.useContext(TranslationContext);

  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }

  return context;
}

export function format(s: string, ...args: string[]): string {
  let result = s;
  for (let i = 0; i < args.length; i += 2) {
    result = result.replace(args[i], args[i + 1]);
  }
  return result;
}
