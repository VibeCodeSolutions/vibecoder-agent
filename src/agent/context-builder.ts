import * as vscode from 'vscode';
import { ProjectScanner, ProjectInfo } from '../tools/project-scanner';
import { Message } from '../providers/base';

export class ContextBuilder {
  private scanner: ProjectScanner;

  constructor() {
    this.scanner = new ProjectScanner();
  }

  async buildContext(): Promise<string> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      return 'No workspace folder open.';
    }

    const projectInfo = await this.scanner.scan(workspaceFolder);
    
    let context = `# Project Information\n\n`;
    context += `Language: ${projectInfo.language}\n`;
    if (projectInfo.framework) {
      context += `Framework: ${projectInfo.framework}\n`;
    }
    if (projectInfo.packageManager) {
      context += `Package Manager: ${projectInfo.packageManager}\n`;
    }
    
    if (projectInfo.dependencies.length > 0) {
      context += `\nKey Dependencies:\n`;
      context += projectInfo.dependencies.slice(0, 10).map(d => `- ${d}`).join('\n');
    }
    
    context += `\n\nProject Structure:\n\`\`\`\n${projectInfo.structure}\n\`\`\``;
    
    return context;
  }

  async buildMessagesWithContext(userMessage: string, systemPrompt: string, history: Message[]): Promise<Message[]> {
    const context = await this.buildContext();
    
    const enhancedSystemPrompt = `${systemPrompt}\n\n${context}`;
    
    return [
      { role: 'system', content: enhancedSystemPrompt },
      ...history
    ];
  }
}
