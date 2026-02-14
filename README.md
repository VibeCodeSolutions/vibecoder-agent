# VibeCoder Agent 🤖⚡

> AI-powered coding agent that automates project setup, debugging & deployment — built with local AI.

**Built for:**
- [Amazon Nova AI Hackathon](https://amazon-nova.devpost.com/) ($40,000)
- [GitLab AI Hackathon](https://gitlab.devpost.com/) ($65,000)
- [Elasticsearch Agent Builder](https://elasticsearch.devpost.com/) ($20,000)

## 🎯 What it does

VibeCoder Agent is an intelligent VS Code extension that acts as your AI pair programmer. It doesn't just suggest code — it **understands your entire project**, **debugs errors autonomously**, and **executes tasks** through an integrated terminal.

### Key Features

- 🧠 **Project Understanding** — Analyzes codebase structure, dependencies, and architecture
- 🤖 **Local AI** — Runs DeepSeek R1 via Ollama (no API keys, no costs)
- 🔍 **Smart Debugging** — Reads error diagnostics and suggests fixes with context
- 📦 **Code Execution** — Creates files, runs terminal commands, manages git
- 🔄 **Context-Aware** — Remembers your project details across conversations
- 💬 **Clean Chat UI** — Native VS Code dark theme interface

## 🚀 Quick Start

### Prerequisites

- VS Code 1.85.0 or higher
- Node.js 20+ 
- [Ollama](https://ollama.ai) installed
- DeepSeek R1 model: `ollama pull deepseek-r1:8b`

### Installation

```bash
# Clone
git clone https://github.com/VibeCodeSolutions/vibecoder-agent.git
cd vibecoder-agent

# Install
npm install

# Build
npm run build

# Run (F5 to launch Extension Development Host)
code .
```

Press **F5** in VS Code to start the extension in debug mode.

### Usage

1. Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Run `VibeCoder: Open Chat`
3. Ask anything: "Explain this code", "Fix these errors", "Create a REST API"

**Commands:**
- `VibeCoder: Open Chat` — Open chat panel
- `VibeCoder: Debug Error` — Analyze current file errors
- `VibeCoder: Setup Project` — Auto-generate project structure

## 💡 How It Works

1. **You describe what you want** → "Build a REST API with auth"
2. **Agent understands your project** → Scans package.json, detects framework
3. **Agent responds with context** → Knows you're using Express + TypeScript
4. **Agent can execute** → Creates files, runs npm install, commits to git

## 🏗 Architecture

```
vibecoder-agent/
├── src/
│   ├── extension.ts          # Entry point
│   ├── agent/
│   │   ├── core.ts           # Main agent orchestration
│   │   ├── context-builder.ts # Project context extraction
│   │   ├── planner.ts        # Task decomposition
│   │   ├── executor.ts       # Action execution
│   │   └── memory.ts         # Session persistence
│   ├── providers/
│   │   ├── ollama.ts         # DeepSeek R1 integration
│   │   └── base.ts           # Provider interface
│   ├── tools/
│   │   ├── project-scanner.ts # Language/framework detection
│   │   ├── error-analyzer.ts  # Error context extraction
│   │   ├── file-manager.ts    # File operations
│   │   ├── terminal-runner.ts # Command execution
│   │   └── git-ops.ts        # Git automation
│   └── ui/
│       ├── chat-panel.ts     # Webview chat
│       └── status-bar.ts     # Status indicator
├── webview/                  # Chat UI (HTML/CSS/JS)
└── resources/                # Icons & assets
```

## 🛠 Tech Stack

- **Runtime:** Node.js + TypeScript
- **Extension API:** VS Code Extension API
- **AI Model:** DeepSeek R1 8B (via Ollama)
- **State:** VS Code GlobalState (session memory)

## 🎥 Demo

_(Video will be added after recording)_

## 🏆 Hackathon Submissions

This project participates in multiple hackathons with different variations:

### Amazon Nova AI
Uses Nova Act for UI workflow automation alongside DeepSeek for code understanding.

### GitLab AI  
Integrates with GitLab Duo Agent Platform for CI/CD automation and MR workflows.

### Elasticsearch
Uses Elasticsearch as knowledge base for cross-project code search and context retrieval.

## 📄 License

MIT — See [LICENSE](LICENSE)

## 👥 Team

**VibeCode Solutions** — AI-powered software development
- GitHub: [@VibeCodeSolutions](https://github.com/VibeCodeSolutions)
- Email: vibecodesolutions@gmail.com

---

Built with 🏹 by Orion using VibeCoding methodology (AI-assisted rapid development)
