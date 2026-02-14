export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ModelResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

export abstract class BaseProvider {
  abstract sendMessage(messages: Message[]): Promise<ModelResponse>;
  abstract streamMessage(messages: Message[], onChunk: (chunk: string) => void): Promise<void>;
}
