'use client';
import React from 'react';
import localFont from 'next/font/local';

import './global.css';
import '@carbon/styles/css/styles.css';
import '@carbon/charts/styles.css';
import { ThemeProvider } from '@emotion/react';
import lightTheme from '../lib/theme.light';
import { Box } from '@mui/material';
import { TranslationProvider } from 'packages/i18n/src/lib/i18n';
import Header from 'packages/ui/src/lib/Header';

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
  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite ma planete</title>
      </head>
      <body className={marianne.className}>
        <TranslationProvider>
          <ThemeProvider theme={lightTheme}>
            <Box
              sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Header />
              <Box
                sx={{
                  backgroundColor: 'background.default',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                {children}
              </Box>
            </Box>
          </ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
