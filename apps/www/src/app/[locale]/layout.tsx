'use client';
import React from 'react';
import Header from 'packages/ui/src/lib/Header';
import { Box, ThemeProvider } from '@mui/material';
import lightTheme from '../../lib/theme.light';

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Header />
      <Box sx={{ backgroundColor: 'background.default' }}>{children}</Box>
    </ThemeProvider>
  );
}
