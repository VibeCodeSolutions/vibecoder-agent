import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class ChatPanel {
  public static currentPanel: ChatPanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private readonly extensionUri: vscode.Uri;
  private disposables: vscode.Disposable[] = [];
  private onMessageCallback?: (message: string) => Promise<void>;

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this.panel = panel;
    this.extensionUri = extensionUri;

    this.panel.webview.html = this.getHtmlContent();
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    this.panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.type) {
          case 'sendMessage':
            if (this.onMessageCallback) {
              await this.onMessageCallback(message.text);
            }
            break;
        }
      },
      null,
      this.disposables
    );
  }

  public static create(extensionUri: vscode.Uri): ChatPanel {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    const panel = vscode.window.createWebviewPanel(
      'vibecoder-chat',
      'VibeCoder Agent',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, 'webview'),
        ]
      }
    );

    ChatPanel.currentPanel = new ChatPanel(panel, extensionUri);
    return ChatPanel.currentPanel;
  }

  public static getOrCreate(extensionUri: vscode.Uri): ChatPanel {
    if (ChatPanel.currentPanel) {
      ChatPanel.currentPanel.panel.reveal();
      return ChatPanel.currentPanel;
    }
    return ChatPanel.create(extensionUri);
  }

  public onMessage(callback: (message: string) => Promise<void>): void {
    this.onMessageCallback = callback;
  }

  public sendMessage(text: string): void {
    this.panel.webview.postMessage({
      type: 'assistantMessage',
      text: text
    });
  }

  public sendError(text: string): void {
    this.panel.webview.postMessage({
      type: 'error',
      text: text
    });
  }

  private getHtmlContent(): string {
    const webviewPath = vscode.Uri.joinPath(this.extensionUri, 'webview');
    const htmlPath = vscode.Uri.joinPath(webviewPath, 'index.html');
    const chatCssUri = this.panel.webview.asWebviewUri(
      vscode.Uri.joinPath(webviewPath, 'chat.css')
    );
    const chatJsUri = this.panel.webview.asWebviewUri(
      vscode.Uri.joinPath(webviewPath, 'chat.js')
    );

    let html = fs.readFileSync(htmlPath.fsPath, 'utf8');
    
    html = html.replace(/\$\{cspSource\}/g, this.panel.webview.cspSource);
    html = html.replace('${chatCssUri}', chatCssUri.toString());
    html = html.replace('${chatJsUri}', chatJsUri.toString());

    return html;
  }

  public dispose(): void {
    ChatPanel.currentPanel = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      const disposable = this.disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
