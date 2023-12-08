import { Paper } from '@mui/material';

export default function ChatbotMessage({
  message,
}: Readonly<{ message: string }>) {
  return <Paper sx={{ p: 2 }}>{message}</Paper>;
}
