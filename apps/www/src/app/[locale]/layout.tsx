'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material';

import './global.css';
import '@carbon/styles/css/styles.css';
import '@carbon/charts/styles.css';
import lightTheme from '../../lib/theme.light';

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite ma planete - {locale}</title>
      </head>
      <body>
        <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
