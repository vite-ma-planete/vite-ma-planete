import { Container } from '@mui/material';
import Chatbot from 'packages/ui/src/lib/chatbot/Chatbot';

export default function Index() {
  return (
    <Container sx={{ display: 'flex', flexGrow: 1 }}>
      <Chatbot />
    </Container>
  );
}
