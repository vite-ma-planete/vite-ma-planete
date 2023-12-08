'use client';
import { useEffect, useState } from 'react';
import { ChatCompletionChunk } from 'openai/resources';
import OpenAI from 'openai';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatbotMessage from './ChatbotMessage';
import { useTranslation } from 'packages/i18n/src/lib/i18n';
import { useDebounce } from 'usehooks-ts';

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatCompletionChunk[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const { i18n } = useTranslation();
  const debouncedPrompt = useDebounce(prompt, 500);
  const [suggestion, setSuggestion] = useState<string>('');
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);

  useEffect(() => {
    if (debouncedPrompt.length < 3) {
      return;
    }

    setLoadingSuggestions(true);

    const openai = new OpenAI({
      apiKey: 'NOT_A_REAL_KEY',
      baseURL: 'https://api.vite-ma-planete.fr/ai',
      dangerouslyAllowBrowser: true,
    });

    openai.completions
      .create({
        prompt: debouncedPrompt,
        stream: false,
        model: 'davinci',
      })
      .then((res: any) => {
        setSuggestion(debouncedPrompt + res.data.choices[0].text);
      });
  }, [debouncedPrompt]);

  useEffect(() => {
    setLoadingSuggestions(false);
  }, [suggestion]);

  const onSubmit = async () => {
    const openai = new OpenAI({
      apiKey: 'NOT_A_REAL_KEY',
      baseURL: 'https://api.vite-ma-planete.fr/ai',
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
    if (!chunk) return;
    setMessages((messages) => {
      const lastMessage = messages[messages.length - 1];
      const oldMessages = messages.slice(0, messages.length - 1);

      const lastContent = lastMessage?.choices[0].delta.content ?? '';
      const newContent = chunk.choices[0].delta.content ?? '';

      const newMessage = {
        ...chunk,
        choices: [
          {
            ...chunk.choices[0],
            delta: {
              ...chunk.choices[0].delta,
              content: lastContent + newContent,
            },
          },
        ],
      };

      return [...oldMessages, newMessage];
    });
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
      <Stack direction="column" spacing={2} alignItems="stretch">
        <LoadingButton
          loading={loadingSuggestions}
          onClick={() => {
            setPrompt(suggestion);
          }}
        >
          {suggestion}
        </LoadingButton>
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
    </Stack>
  );
}
