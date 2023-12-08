'use client';

import { useState } from 'react';
import { ChatCompletionChunk } from 'openai/resources';
import OpenAI from 'openai';

export default function Index() {
  const [messages, setMessages] = useState<ChatCompletionChunk[]>([]);
  const [prompt, setPrompt] = useState<string>('');

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
    </div>
  );
}
