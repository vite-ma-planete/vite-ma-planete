'use client';
import { Container } from '@mui/material';
import QuestionAccordion from 'packages/ui/src/lib/QuestionAccordion';
import Trad from 'packages/i18n/src/lib/translations/en.json';
import { useTranslation } from '@vite-ma-planete/i18n';

export default function Questions() {
  const { i18n } = useTranslation();

  const themes = Trad.themes;
  return (
    <>
      {Object.keys(themes).map((themeId: string) => (
        <Container key={'theme_' + themeId}>
          <h1>{i18n.t(`themes.${themeId}.theme`)}</h1>
          {Object.keys(themes[themeId].questions).map((questionId) => (
            <QuestionAccordion
              key={'question_' + themeId + '_' + questionId}
              id={themeId + '_' + questionId}
              question={i18n.t(
                `themes.${themeId}.questions.${questionId}.question`
              )}
              answer={i18n.t(
                `themes.${themeId}.questions.${questionId}.answer`
              )}
              isIdea={themes[themeId].questions[questionId].isIdea}
            />
          ))}
        </Container>
      ))}
    </>
  );
}
