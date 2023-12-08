import { Container } from '@mui/material';
import AssociationCard from 'packages/ui/src/lib/AssociationCard';
import Trad from 'packages/i18n/src/lib/translations/en.json';

export default function AssociationsPage() {
  const associations = Trad.associationsList;
  return (
    <Container sx={{ marginBottom: '40px' }}>
      {Object.keys(associations).map((associationId: string) => (
        <AssociationCard
          key={'association_' + associationId}
          id={associationId}
          name={associations[associationId].name}
          description={associations[associationId].description}
          url={'/' + associationId + '.jpg'}
          link={associations[associationId].link}
        />
      ))}
    </Container>
  );
}
