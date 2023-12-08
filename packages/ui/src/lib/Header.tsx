import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';

import logo from './images/logo.webp';
import { useTranslation } from '@vite-ma-planete/i18n';

function HeaderLink({
  href,
  text,
  selected,
}: Readonly<{
  href: string;
  text: string;
  selected?: boolean;
}>) {
  return (
    <Link href={href} aria-selected={selected}>
      <Box
        sx={{
          px: 2,
          py: 3,
          borderBottomColor: selected ? 'primary.main' : 'transparent',
          borderBottomWidth: 4,
          borderBottomStyle: 'solid',
          color: 'text.primary',
        }}
      >
        {text}
      </Box>
    </Link>
  );
}

export default function Header() {
  const { i18n, locale, pathname, setLocale } = useTranslation();
  return (
    <header>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={4} alignItems="center">
            <Image src={logo} alt="Logo" height={40} />
            <Stack direction="row" spacing={2} alignItems="center">
              <HeaderLink
                href={`/${locale}`}
                text={i18n.t('home')}
                selected={pathname === '/'}
              />
              <HeaderLink
                href={`/${locale}/charts`}
                text={i18n.t('charts')}
                selected={pathname === '/charts'}
              />
              <HeaderLink
                href={`/${locale}/questions`}
                text={i18n.t('questions')}
                selected={pathname === '/questions'}
              />
              <HeaderLink
                href={`/${locale}/associations`}
                text={i18n.t('associations')}
                selected={pathname === '/associations'}
              />
              <HeaderLink
                href="/chatbot"
                text={i18n.t('chatbot')}
                selected={pathname === '/chatbot'}
              />
            </Stack>
          </Stack>
          <FormControl variant="standard" sx={{ m: 1 }}>
            <InputLabel id="langue-select">{i18n.t('language')}</InputLabel>
            <Select
              labelId="langue-select"
              value={locale}
              onChange={(event: SelectChangeEvent) => {
                setLocale(event.target.value);
              }}
              defaultValue="en"
            >
              <MenuItem value="en">{i18n.t('english')}</MenuItem>
              <MenuItem value="fr">{i18n.t('french')}</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Container>
    </header>
  );
}
