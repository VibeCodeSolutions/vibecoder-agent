import * as vscode from 'vscode';
import { FileManager } from './file-manager';

export interface ErrorContext {
  file: string;
  line: number;
  message: string;
  severity: string;
  code: string;
  surroundingCode: string;
}

export class ErrorAnalyzer {
  private fileManager: FileManager;

  constructor() {
    this.fileManager = new FileManager();
  }

  async analyzeErrors(uri: vscode.Uri): Promise<ErrorContext[]> {
    const diagnostics = vscode.languages.getDiagnostics(uri);
    const errors = diagnostics.filter(d => 
      d.severity === vscode.DiagnosticSeverity.Error || 
      d.severity === vscode.DiagnosticSeverity.Warning
    );

    const contexts: ErrorContext[] = [];
    
    for (const error of errors) {
      const context = await this.buildErrorContext(uri, error);
      contexts.push(context);
    }

    return contexts;
  }

  private async buildErrorContext(uri: vscode.Uri, diagnostic: vscode.Diagnostic): Promise<ErrorContext> {
    const document = await vscode.workspace.openTextDocument(uri);
    const line = diagnostic.range.start.line;
    
    // Get surrounding code (5 lines before and after)
    const startLine = Math.max(0, line - 5);
    const endLine = Math.min(document.lineCount - 1, line + 5);
    
    const surroundingLines: string[] = [];
    for (let i = startLine; i <= endLine; i++) {
      const lineText = document.lineAt(i).text;
      const marker = i === line ? '>>> ' : '    ';
      surroundingLines.push(`${marker}${i + 1}: ${lineText}`);
    }

    return {
      file: uri.fsPath,
      line: line + 1,
      message: diagnostic.message,
      severity: this.getSeverityString(diagnostic.severity),
      code: diagnostic.code?.toString() || 'unknown',
      surroundingCode: surroundingLines.join('\n')
    };
  }

  private getSeverityString(severity: vscode.DiagnosticSeverity): string {
    switch (severity) {
      case vscode.DiagnosticSeverity.Error: return 'error';
      case vscode.DiagnosticSeverity.Warning: return 'warning';
      case vscode.DiagnosticSeverity.Information: return 'info';
      case vscode.DiagnosticSeverity.Hint: return 'hint';
      default: return 'unknown';
    }
  }

  formatErrorsForAI(errors: ErrorContext[]): string {
    let formatted = `Found ${errors.length} issue(s):\n\n`;
    
    errors.forEach((error, index) => {
      formatted += `## Issue ${index + 1}: ${error.severity.toUpperCase()}\n`;
      formatted += `File: ${error.file}\n`;
      formatted += `Line: ${error.line}\n`;
      formatted += `Message: ${error.message}\n`;
      formatted += `\nCode:\n\`\`\`\n${error.surroundingCode}\n\`\`\`\n\n`;
    });

    return formatted;
  }
}
