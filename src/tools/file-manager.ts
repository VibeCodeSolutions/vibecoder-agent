import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class FileManager {
  async readFile(filePath: string): Promise<string> {
    return fs.readFileSync(filePath, 'utf8');
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf8');
  }

  async findFiles(pattern: string, maxResults: number = 100): Promise<vscode.Uri[]> {
    return await vscode.workspace.findFiles(pattern, '**/node_modules/**', maxResults);
  }

  async searchInFiles(searchTerm: string): Promise<Array<{ file: string; line: number; text: string }>> {
    const results: Array<{ file: string; line: number; text: string }> = [];
    const files = await this.findFiles('**/*.{ts,js,py,rs,go}', 50);
    
    for (const fileUri of files) {
      const content = fs.readFileSync(fileUri.fsPath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({
            file: fileUri.fsPath,
            line: index + 1,
            text: line.trim()
          });
        }
      });
      
      if (results.length > 20) break; // Limit results
    }
    
    return results;
  }

  getWorkspacePath(): string | undefined {
    return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  }
}
