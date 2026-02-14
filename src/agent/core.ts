import * as vscode from 'vscode';
import { Planner } from './planner';
import { Executor } from './executor';
import { Memory } from './memory';

export class AgentCore {
  private planner: Planner;
  private executor: Executor;
  private memory: Memory;
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.memory = new Memory(context);
    this.planner = new Planner(this.memory);
    this.executor = new Executor(this.memory);
  }

  async start() {
    await this.memory.load();
    console.log('[VibeCoder] Agent started');
  }

  async chat(message: string): Promise<string> {
    // TODO: Will be implemented in Sprint 2 with AI provider
    return `Echo: ${message}`;
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
