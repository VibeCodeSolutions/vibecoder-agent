import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface ProjectInfo {
  language: string;
  framework?: string;
  packageManager?: string;
  dependencies: string[];
  structure: string;
}

export class ProjectScanner {
  async scan(workspaceFolder: vscode.WorkspaceFolder): Promise<ProjectInfo> {
    const rootPath = workspaceFolder.uri.fsPath;
    const info: ProjectInfo = {
      language: 'unknown',
      dependencies: [],
      structure: ''
    };

    // Detect language and framework
    if (fs.existsSync(path.join(rootPath, 'package.json'))) {
      info.language = 'JavaScript/TypeScript';
      info.packageManager = 'npm';
      const pkg = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf8'));
      
      if (pkg.dependencies) {
        info.dependencies = Object.keys(pkg.dependencies);
        
        // Detect framework
        if (info.dependencies.includes('react')) info.framework = 'React';
        else if (info.dependencies.includes('vue')) info.framework = 'Vue';
        else if (info.dependencies.includes('express')) info.framework = 'Express';
        else if (info.dependencies.includes('next')) info.framework = 'Next.js';
        else if (info.dependencies.includes('@nestjs/core')) info.framework = 'NestJS';
      }
    } else if (fs.existsSync(path.join(rootPath, 'requirements.txt'))) {
      info.language = 'Python';
      info.packageManager = 'pip';
      const reqs = fs.readFileSync(path.join(rootPath, 'requirements.txt'), 'utf8');
      info.dependencies = reqs.split('\n').filter(l => l.trim() && !l.startsWith('#'));
      
      if (info.dependencies.some(d => d.includes('django'))) info.framework = 'Django';
      else if (info.dependencies.some(d => d.includes('flask'))) info.framework = 'Flask';
      else if (info.dependencies.some(d => d.includes('fastapi'))) info.framework = 'FastAPI';
    } else if (fs.existsSync(path.join(rootPath, 'Cargo.toml'))) {
      info.language = 'Rust';
      info.packageManager = 'cargo';
    } else if (fs.existsSync(path.join(rootPath, 'go.mod'))) {
      info.language = 'Go';
      info.packageManager = 'go';
    }

    // Build structure overview
    info.structure = await this.buildStructure(rootPath);

    return info;
  }

  private async buildStructure(rootPath: string, maxDepth: number = 2): Promise<string> {
    const lines: string[] = [];
    const exclude = ['node_modules', 'dist', 'build', '.git', '__pycache__', 'venv', '.venv'];

    const walk = (dir: string, depth: number = 0) => {
      if (depth > maxDepth) return;
      
      try {
        const items = fs.readdirSync(dir);
        for (const item of items) {
          if (exclude.includes(item)) continue;
          
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          const indent = '  '.repeat(depth);
          
          if (stat.isDirectory()) {
            lines.push(`${indent}${item}/`);
            walk(fullPath, depth + 1);
          } else {
            lines.push(`${indent}${item}`);
          }
        }
      } catch (e) {
        // Skip unreadable directories
      }
    };

    walk(rootPath);
    return lines.slice(0, 50).join('\n'); // Limit to 50 lines
  }
}
