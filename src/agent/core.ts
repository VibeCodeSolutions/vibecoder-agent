import * as vscode from 'vscode';
import { Planner } from './planner';
import { Executor } from './executor';
import { Memory } from './memory';
import { OllamaProvider } from '../providers/ollama';
import { getConfig } from '../utils/config';
import { buildPrompt } from '../utils/prompts';
import { Message } from '../providers/base';

export class AgentCore {
  private planner: Planner;
  private executor: Executor;
  private memory: Memory;
  private context: vscode.ExtensionContext;
  private provider: OllamaProvider;
  private conversationHistory: Message[] = [];

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.memory = new Memory(context);
    this.planner = new Planner(this.memory);
    this.executor = new Executor(this.memory);
    
    const config = getConfig();
    this.provider = new OllamaProvider(config.ollamaModel, config.ollamaUrl);
  }

  async start() {
    await this.memory.load();
    console.log('[VibeCoder] Agent started with Ollama');
  }

  async chat(message: string): Promise<string> {
    this.conversationHistory.push({
      role: 'user',
      content: message
    });

    const systemPrompt = buildPrompt(message);
    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...this.conversationHistory
    ];

    try {
      const response = await this.provider.sendMessage(messages);
      
      this.conversationHistory.push({
        role: 'assistant',
        content: response.content
      });

      // Keep history manageable (last 10 messages)
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      return response.content;
    } catch (error) {
      console.error('[VibeCoder] Chat error:', error);
      throw new Error(`Failed to get response: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async setupProject(description: string) {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'VibeCoder: Setting up project...',
      cancellable: true
    }, async (progress, token) => {
      progress.report({ message: 'Planning...' });
      const plan = await this.planner.createPlan(description);

      for (let i = 0; i < plan.steps.length; i++) {
        if (token.isCancellationRequested) break;
        const step = plan.steps[i];
        progress.report({
          message: step.description,
          increment: (100 / plan.steps.length)
        });
        await this.executor.execute(step);
      }

      vscode.window.showInformationMessage('Project setup complete! 🚀');
    });
  }

  async debugCurrentError() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active editor');
      return;
    }

    const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
    const errors = diagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Error);

    if (errors.length === 0) {
      vscode.window.showInformationMessage('No errors found! ✅');
      return;
    }

    // TODO: Send errors to AI for analysis and fix suggestions
    vscode.window.showInformationMessage(`Found ${errors.length} errors. Analyzing...`);
  }

  async deploy() {
    // TODO: Implement deployment
    vscode.window.showInformationMessage('Deployment coming soon!');
  }

  dispose() {
    this.memory.save();
  }
}
