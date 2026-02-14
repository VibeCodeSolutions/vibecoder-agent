import { Memory } from './memory';
import { Step } from './planner';
import { FileManager } from '../tools/file-manager';
import { TerminalRunner } from '../tools/terminal-runner';
import { GitOps } from '../tools/git-ops';
import * as vscode from 'vscode';

export class Executor {
  private memory: Memory;
  private fileManager: FileManager;
  private terminalRunner: TerminalRunner;
  private gitOps: GitOps;

  constructor(memory: Memory) {
    this.memory = memory;
    this.fileManager = new FileManager();
    this.terminalRunner = new TerminalRunner();
    this.gitOps = new GitOps();
  }

  async execute(step: Step): Promise<void> {
    console.log(`[VibeCoder] Executing: ${step.description}`);

    switch (step.type) {
      case 'file':
        await this.executeFileOp(step);
        break;
      case 'terminal':
        await this.executeTerminal(step);
        break;
      case 'git':
        await this.executeGit(step);
        break;
      case 'install':
        await this.executeInstall(step);
        break;
    }

    this.memory.recordStep(step);
  }

  private async executeFileOp(step: Step): Promise<void> {
    const { action, params } = step;
    const workspacePath = this.fileManager.getWorkspacePath();
    if (!workspacePath) {
      vscode.window.showErrorMessage('No workspace folder open');
      return;
    }

    switch (action) {
      case 'create':
        const filePath = `${workspacePath}/${params.path}`;
        await this.fileManager.writeFile(filePath, params.content || '');
        vscode.window.showInformationMessage(`Created: ${params.path}`);
        break;
      case 'write':
        await this.fileManager.writeFile(params.path, params.content);
        break;
      case 'read':
        const content = await this.fileManager.readFile(params.path);
        console.log('[VibeCoder] Read file:', params.path, content.substring(0, 100));
        break;
    }
  }

  private async executeTerminal(step: Step): Promise<void> {
    const { params } = step;
    if (params.commands && Array.isArray(params.commands)) {
      await this.terminalRunner.runCommands(params.commands);
    } else if (params.command) {
      await this.terminalRunner.runCommand(params.command);
    }
  }

  private async executeGit(step: Step): Promise<void> {
    const { action, params } = step;
    
    switch (action) {
      case 'init':
        await this.gitOps.init();
        break;
      case 'add':
        await this.gitOps.add(params.files || '.');
        break;
      case 'commit':
        await this.gitOps.commit(params.message || 'Auto-commit by VibeCoder');
        break;
      case 'branch':
        await this.gitOps.branch(params.name);
        break;
    }
  }

  private async executeInstall(step: Step): Promise<void> {
    const { params } = step;
    const packageManager = params.packageManager || 'npm';
    const command = `${packageManager} install ${params.packages?.join(' ') || ''}`;
    await this.terminalRunner.runCommand(command);
  }

  dispose(): void {
    this.terminalRunner.dispose();
  }
}
