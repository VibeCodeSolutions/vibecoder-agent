import * as vscode from 'vscode';

export interface Config {
  model: string;
  provider: 'ollama' | 'anthropic' | 'openai' | 'gemini';
  ollamaModel: string;
  ollamaUrl: string;
}

export function getConfig(): Config {
  const config = vscode.workspace.getConfiguration('vibecoder');
  
  return {
    model: config.get('model', 'deepseek-r1:8b'),
    provider: config.get('provider', 'ollama'),
    ollamaModel: config.get('ollamaModel', 'deepseek-r1:8b'),
    ollamaUrl: config.get('ollamaUrl', 'http://localhost:11434')
  };
}
