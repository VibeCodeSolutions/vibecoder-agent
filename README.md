# VibeCoder Agent 🤖⚡

> AI-powered coding agent that automates project setup, debugging & deployment — built with VibeCoding.

## 🎯 What it does

VibeCoder Agent is an intelligent VS Code extension that acts as your AI pair programmer on steroids. It doesn't just suggest code — it **understands your entire project**, **sets up environments**, **debugs errors autonomously**, and **deploys your app** when you're ready.

### Key Features

- 🧠 **Project Understanding** — Analyzes your codebase structure, dependencies, and architecture
- 🚀 **Auto-Setup** — Scaffolds new projects with best practices (frameworks, linting, CI/CD)
- 🔍 **Smart Debugging** — Reads error logs, traces issues, and fixes them autonomously
- 📦 **One-Click Deploy** — Deploys to Vercel, Railway, or Docker with a single command
- 🔄 **Context-Aware** — Remembers your decisions and coding style across sessions
- 🤝 **Multi-Model** — Works with Claude, Gemini, GPT, and local models (Ollama)

## 🏗 Architecture

```
vibecoder-agent/
├── src/
│   ├── extension.ts          # VS Code extension entry point
│   ├── agent/
│   │   ├── core.ts           # Agent orchestration engine
│   │   ├── planner.ts        # Task planning & decomposition
│   │   ├── executor.ts       # Action execution (file ops, terminal, git)
│   │   └── memory.ts         # Session & project memory
│   ├── providers/
│   │   ├── claude.ts         # Anthropic Claude integration
│   │   ├── gemini.ts         # Google Gemini integration
│   │   ├── openai.ts         # OpenAI GPT integration
│   │   └── ollama.ts         # Local model support
│   ├── tools/
│   │   ├── filesystem.ts     # File read/write/search
│   │   ├── terminal.ts       # Terminal command execution
│   │   ├── git.ts            # Git operations
│   │   ├── debugger.ts       # Error analysis & fixing
│   │   └── deployer.ts       # Deployment automation
│   ├── ui/
│   │   ├── sidebar.ts        # VS Code sidebar panel
│   │   ├── chat.ts           # Chat interface
│   │   └── statusbar.ts      # Status bar indicators
│   └── utils/
│       ├── config.ts         # Configuration management
│       ├── logger.ts         # Logging
│       └── tokenizer.ts      # Token counting & context management
├── test/
│   ├── agent.test.ts
│   ├── planner.test.ts
│   └── tools.test.ts
├── .vscode/
│   └── launch.json
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── CHANGELOG.md
└── README.md
```

## 🛠 Tech Stack

- **Runtime:** Node.js + TypeScript
- **Extension API:** VS Code Extension API
- **AI Models:** Claude API, Gemini API, OpenAI API, Ollama
- **Parsing:** Tree-sitter (code analysis)
- **State:** SQLite (local memory/context)
- **Deploy:** Vercel SDK, Railway API, Docker SDK

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/VibeCodeSolutions/vibecoder-agent.git
cd vibecoder-agent

# Install
npm install

# Build
npm run build

# Run in VS Code (F5 to launch Extension Development Host)
code .
```

## 💡 How It Works

1. **You describe what you want** → "Build a REST API with auth"
2. **Agent plans the work** → Breaks it into tasks (scaffold, models, routes, auth, tests)
3. **Agent executes** → Creates files, installs dependencies, writes code
4. **You review & guide** → Accept, modify, or redirect
5. **Agent deploys** → One command to go live

## 🏆 Built for Hackathons

- [Amazon Nova AI Hackathon](https://amazon-nova.devpost.com/) ($40,000)
- [GitLab AI Hackathon](https://gitlab.devpost.com/) ($65,000)
- [Elasticsearch Agent Builder](https://elasticsearch.devpost.com/) ($20,000)

## 📄 License

MIT

## 👥 Team

**VibeCode Solutions** — AI-powered software development
- GitHub: [@VibeCodeSolutions](https://github.com/VibeCodeSolutions)
- Email: vibecodesolutions@gmail.com
