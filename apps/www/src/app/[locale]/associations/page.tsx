'use client';
import { Container } from '@mui/material';
import AssociationCard from 'packages/ui/src/lib/AssociationCard';
import Trad from 'packages/i18n/src/lib/translations/en.json';
import { useTranslation } from 'packages/i18n/src/lib/i18n';

export default function AssociationsPage() {
  const { i18n } = useTranslation();

  const associations = Trad.associationsList as any;
  return (
    <Container sx={{ marginBottom: '40px' }}>
      {Object.keys(associations).map((associationId: string) => (
        <AssociationCard
          key={'association_' + associationId}
          id={associationId}
          name={i18n.t(`associationsList.${associationId}.name`)}
          description={i18n.t(`associationsList.${associationId}.description`)}
          url={'/' + associationId + '.jpg'}
          link={i18n.t(`associationsList.${associationId}.link`)}
          visit_website={i18n.t(`visit_website`)}
        />
      ))}
    </Container>
  );
}
