import * as vscode from 'vscode';
import { Step } from './planner';

export class Memory {
  private context: vscode.ExtensionContext;
  private history: Step[] = [];

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  async load(): Promise<void> {
    const saved = this.context.globalState.get<Step[]>('vibecoder.history', []);
    this.history = saved;
  }

  async save(): Promise<void> {
    await this.context.globalState.update('vibecoder.history', this.history);
  }

  recordStep(step: Step): void {
    this.history.push(step);
  }

  getHistory(): Step[] {
    return this.history;
  }

  getContext(): string {
    return this.history
      .map(s => `[${s.type}] ${s.description}`)
      .join('\n');
  }
}
