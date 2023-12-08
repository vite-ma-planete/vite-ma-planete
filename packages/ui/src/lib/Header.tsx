import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';

import logo from './images/logo.webp';

function HeaderLink({ href, text }: { href: string; text: string }) {
  return <Link href={href}>{text}</Link>;
}

export default function Header() {
  const router = useRouter();
  const t = useTranslations();

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
              <HeaderLink href="/" text={t('home')} />
              <HeaderLink href="/charts" text={t('charts')} />
              <HeaderLink href="/quiz" text={t('quiz')} />
              <HeaderLink href="/associations" text={t('associations')} />
            </Stack>
          </Stack>
          <FormControl>
            <InputLabel id="langue-select">{t('language')}</InputLabel>
            <Select
              labelId="langue-select"
              variant="standard"
              value={router.locale}
              onChange={(event: SelectChangeEvent) => {
                router.push(router.pathname, router.asPath, {
                  locale: event.target.value,
                });
              }}
              defaultValue="en"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Container>
    </header>
  );
}
