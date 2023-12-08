'use client';
import { useState } from 'react';
import { ChatCompletionChunk } from 'openai/resources';
import OpenAI from 'openai';
import { Button, Stack, TextField, Typography } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatbotMessage from './ChatbotMessage';
import { useTranslation } from '@vite-ma-planete/i18n';

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatCompletionChunk[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const { i18n } = useTranslation();

  const onSubmit = async () => {
    const openai = new OpenAI({
      apiKey: 'NOT_A_REAL_KEY',
      baseURL: 'http://localhost:3100/ai',
      dangerouslyAllowBrowser: true,
    });

    const res = await openai.chat.completions.create({
      messages: [{ content: prompt, role: 'user' }],
      stream: true,
      model: 'davinci',
    });

    for await (const data of res) {
      streamCallback(data);
    }
  };

  const streamCallback = (chunk: ChatCompletionChunk) => {
    setMessages((messages) => [...messages, chunk]);
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ display: 'flex', flexGrow: 1, p: 2 }}
    >
      <Typography variant="h1">{i18n.t('chatbot')}</Typography>
      <Stack direction="column" spacing={2} sx={{ flexGrow: 1 }}>
        {messages.map((message, i) => (
          <ChatbotMessage
            key={i}
            message={message.choices[0].delta.content ?? ''}
          />
        ))}
      </Stack>
      <TextField
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={i18n.t('chatbotPlaceholder')}
        multiline
        sx={{ backgroundColor: 'background.paper' }}
      />
      <Button
        onClick={onSubmit}
        variant="contained"
        endIcon={<SendRoundedIcon />}
      >
        {i18n.t('chatbotSend')}
      </Button>
    </Stack>
  );
}
