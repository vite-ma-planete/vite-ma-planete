'use client';

import { useEffect, useState } from 'react';
import { ChatCompletionChunk } from 'openai/resources';
import { useDebounce } from 'usehooks-ts';
import OpenAI from 'openai';

export default function Index() {
  const [messages, setMessages] = useState<ChatCompletionChunk[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const debouncedPrompt = useDebounce(prompt, 500);
  const [suggestion, setSuggestion] = useState<string>('');

  useEffect(() => {
    if (debouncedPrompt.length < 3) {
      return;
    }

    const openai = new OpenAI({
      apiKey: 'NOT_A_REAL_KEY',
      baseURL: 'http://localhost:3100/ai',
      dangerouslyAllowBrowser: true,
    });

    openai.completions
      .create({
        prompt: debouncedPrompt,
        stream: false,
        model: 'davinci',
      })
      .then((res) => {
        setSuggestion(debouncedPrompt + res.data.choices[0].text);
      });
  }, [debouncedPrompt]);

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
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message, i) => (
          <span key={i}>{message.choices[0].delta.content}</span>
        ))}
      </div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type here..."
      />
      <button onClick={onSubmit}>Send</button>
      <p>{suggestion}</p>
    </div>
  );
}
