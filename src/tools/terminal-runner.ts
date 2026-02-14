import * as vscode from 'vscode';

export class TerminalRunner {
  private terminal: vscode.Terminal | undefined;

  getOrCreateTerminal(): vscode.Terminal {
    if (!this.terminal || this.terminal.exitStatus) {
      this.terminal = vscode.window.createTerminal('VibeCoder');
    }
    this.terminal.show();
    return this.terminal;
  }

  async runCommand(command: string): Promise<void> {
    const terminal = this.getOrCreateTerminal();
    terminal.sendText(command);
    
    // Show notification
    vscode.window.showInformationMessage(`Running: ${command}`);
  }

  async runCommands(commands: string[]): Promise<void> {
    const terminal = this.getOrCreateTerminal();
    for (const cmd of commands) {
      terminal.sendText(cmd);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  dispose(): void {
    this.terminal?.dispose();
  }
}
