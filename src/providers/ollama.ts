import { BaseProvider, Message, ModelResponse } from './base';

interface OllamaMessage {
  role: string;
  content: string;
}

interface OllamaRequest {
  model: string;
  messages: OllamaMessage[];
  stream: boolean;
}

interface OllamaResponse {
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}

export class OllamaProvider extends BaseProvider {
  private baseUrl: string;
  private model: string;

  constructor(model: string = 'deepseek-r1:8b', baseUrl: string = 'http://localhost:11434') {
    super();
    this.model = model;
    this.baseUrl = baseUrl;
  }

  async sendMessage(messages: Message[]): Promise<ModelResponse> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        stream: false
      } as OllamaRequest)
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json() as OllamaResponse;
    
    return {
      content: data.message.content
    };
  }

  async streamMessage(messages: Message[], onChunk: (chunk: string) => void): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        stream: true
      } as OllamaRequest)
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const data = JSON.parse(line) as OllamaResponse;
          if (data.message?.content) {
            onChunk(data.message.content);
          }
        } catch (e) {
          console.error('Failed to parse Ollama response:', e);
        }
      }
    }
  }
}
