import React from 'react';
import localFont from 'next/font/local';

import './global.css';
import '@carbon/styles/css/styles.css';
import '@carbon/charts/styles.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';

const marianne = localFont({
  src: [
    {
      path: '../font/marianne/Marianne-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/marianne/Marianne-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../font/marianne/Marianne-Bold_Italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
});

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite ma planete - {locale}</title>
      </head>
      <body className={marianne.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
