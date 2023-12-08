'use client';
import { Container, Grid, Paper, Stack, Typography } from '@mui/material';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import { useTranslation } from '@vite-ma-planete/i18n';
import Link from 'next/link';

export default function Home() {
  const { i18n, locale } = useTranslation();
  return (
    <Container>
      <Stack direction="column" sx={{ width: '100%', p: 2 }} spacing={2}>
        <Typography variant="h1">{i18n.t('title')}</Typography>
        <Typography variant="body1">{i18n.t('description')}</Typography>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Grid item xs={4}>
            <Link href={`/${locale}/questions`}>
              <Paper sx={{ p: 8, width: '100%' }}>
                <Stack direction="column" alignItems="center">
                  <QuestionAnswerRoundedIcon />
                  <Typography variant="body1">{i18n.t('questions')}</Typography>
                </Stack>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href={`/${locale}/associations`}>
              <Paper sx={{ p: 8, width: '100%' }}>
                <Stack direction="column" alignItems="center">
                  <Groups2RoundedIcon />
                  <Typography variant="body1">
                    {i18n.t('associations')}
                  </Typography>
                </Stack>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href={`/${locale}/chatbot`}>
              <Paper sx={{ p: 8, width: '100%' }}>
                <Stack direction="column" alignItems="center">
                  <SmartToyRoundedIcon />
                  <Typography variant="body1">{i18n.t('chatbot')}</Typography>
                </Stack>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
