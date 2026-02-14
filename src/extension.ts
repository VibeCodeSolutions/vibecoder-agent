import * as vscode from 'vscode';
import { AgentCore } from './agent/core';

let agent: AgentCore;

export function activate(context: vscode.ExtensionContext) {
  agent = new AgentCore(context);

  const startCmd = vscode.commands.registerCommand('vibecoder.start', () => {
    agent.start();
    vscode.window.showInformationMessage('VibeCoder Agent is running! 🤖⚡');
  });

  const chatCmd = vscode.commands.registerCommand('vibecoder.chat', () => {
    agent.openChat();
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

  context.subscriptions.push(startCmd, chatCmd, setupCmd, debugCmd, deployCmd);
}

export function deactivate() {
  agent?.dispose();
}
