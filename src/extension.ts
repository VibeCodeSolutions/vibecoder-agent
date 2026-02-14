import * as vscode from 'vscode';
import { AgentCore } from './agent/core';
import { ChatPanel } from './ui/chat-panel';
import { StatusBar } from './ui/status-bar';

let agent: AgentCore;
let chatPanel: ChatPanel | undefined;
let statusBar: StatusBar;

export function activate(context: vscode.ExtensionContext) {
  agent = new AgentCore(context);
  statusBar = new StatusBar();

  const startCmd = vscode.commands.registerCommand('vibecoder.start', () => {
    agent.start();
    vscode.window.showInformationMessage('VibeCoder Agent is running! 🤖⚡');
  });

  const chatCmd = vscode.commands.registerCommand('vibecoder.chat', () => {
    chatPanel = ChatPanel.getOrCreate(context.extensionUri);
    chatPanel.onMessage(async (message) => {
      statusBar.setStatus('working', 'Thinking...');
      try {
        const response = await agent.chat(message);
        chatPanel?.sendMessage(response);
        statusBar.setStatus('ready');
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        chatPanel?.sendError(errorMsg);
        statusBar.setStatus('error', 'Failed');
        setTimeout(() => statusBar.setStatus('ready'), 3000);
      }
    });
  });

  const setupCmd = vscode.commands.registerCommand('vibecoder.setup', async () => {
    const description = await vscode.window.showInputBox({
      prompt: 'Describe your project',
      placeHolder: 'e.g. REST API with auth using Express + PostgreSQL'
    });
    if (description) {
      await agent.setupProject(description);
    }
  });

  const debugCmd = vscode.commands.registerCommand('vibecoder.debug', async () => {
    await agent.debugCurrentError();
  });

  const deployCmd = vscode.commands.registerCommand('vibecoder.deploy', async () => {
    await agent.deploy();
  });

  context.subscriptions.push(startCmd, chatCmd, setupCmd, debugCmd, deployCmd, statusBar);
  
  agent.start();
}

export function deactivate() {
  agent?.dispose();
}
