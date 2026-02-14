import * as vscode from 'vscode';

export class StatusBar {
  private statusBarItem: vscode.StatusBarItem;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    this.statusBarItem.command = 'vibecoder.chat';
    this.show();
  }

  public setStatus(status: 'ready' | 'working' | 'error', text?: string): void {
    const icons = {
      ready: '$(check)',
      working: '$(sync~spin)',
      error: '$(error)'
    };

    this.statusBarItem.text = `${icons[status]} VibeCoder${text ? ': ' + text : ''}`;
    
    if (status === 'error') {
      this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    } else {
      this.statusBarItem.backgroundColor = undefined;
    }
  }

  public show(): void {
    this.setStatus('ready');
    this.statusBarItem.show();
  }

  public dispose(): void {
    this.statusBarItem.dispose();
  }
}
