import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class GitOps {
  private workspaceRoot: string;

  constructor() {
    this.workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
  }

  async init(): Promise<void> {
    try {
      await execAsync('git init', { cwd: this.workspaceRoot });
      vscode.window.showInformationMessage('Git repository initialized');
    } catch (error) {
      vscode.window.showErrorMessage(`Git init failed: ${error}`);
    }
  }

  async add(files: string = '.'): Promise<void> {
    try {
      await execAsync(`git add ${files}`, { cwd: this.workspaceRoot });
    } catch (error) {
      vscode.window.showErrorMessage(`Git add failed: ${error}`);
    }
  }

  async commit(message: string): Promise<void> {
    try {
      await execAsync(`git commit -m "${message}"`, { cwd: this.workspaceRoot });
      vscode.window.showInformationMessage(`Committed: ${message}`);
    } catch (error) {
      vscode.window.showErrorMessage(`Git commit failed: ${error}`);
    }
  }

  async status(): Promise<string> {
    try {
      const { stdout } = await execAsync('git status --short', { cwd: this.workspaceRoot });
      return stdout;
    } catch (error) {
      return `Error: ${error}`;
    }
  }

  async diff(file?: string): Promise<string> {
    try {
      const cmd = file ? `git diff ${file}` : 'git diff';
      const { stdout } = await execAsync(cmd, { cwd: this.workspaceRoot });
      return stdout;
    } catch (error) {
      return `Error: ${error}`;
    }
  }

  async branch(name: string): Promise<void> {
    try {
      await execAsync(`git checkout -b ${name}`, { cwd: this.workspaceRoot });
      vscode.window.showInformationMessage(`Created and switched to branch: ${name}`);
    } catch (error) {
      vscode.window.showErrorMessage(`Git branch failed: ${error}`);
    }
  }
}
