# VibeCoder Agent — Tasks

## 🎯 Hackathon Deadlines
- **Elasticsearch Agent Builder** — $20,000 — bis 27.02.2026 ⚠️
- **DevStudio Logitech** — $20,000 — bis 25.02.2026 ⚠️
- **Amazon Nova AI** — $40,000 — bis 16.03.2026
- **GitLab AI** — $65,000 — bis 25.03.2026

## Phase 1: Core Extension (Tag 1-2)
- [ ] `npm install` & Extension lauffähig machen (F5 in VS Code)
- [ ] Chat-Webview implementieren (`src/ui/chat.ts`)
- [ ] Sidebar-Panel mit Agent-Status (`src/ui/sidebar.ts`)
- [ ] Model-Provider anbinden: Claude API (`src/providers/claude.ts`)
- [ ] Config: API-Keys über VS Code Settings

## Phase 2: Agent Intelligence (Tag 2-4)
- [ ] Planner: AI-gesteuerte Aufgabenzerlegung (Prompt Engineering)
- [ ] Executor: Dateien erstellen/bearbeiten basierend auf AI-Output
- [ ] Executor: Terminal-Befehle ausführen (npm, pip, git)
- [ ] Debugger: Fehler aus VS Code Diagnostics an AI senden
- [ ] Debugger: AI-Fix automatisch anwenden (mit Diff-Preview)

## Phase 3: Smart Features (Tag 4-6)
- [ ] Projekt-Scanner: Codebase analysieren (Tree-sitter)
- [ ] Context-Management: Relevante Dateien automatisch in Prompt laden
- [ ] Memory: Entscheidungen & Style über Sessions merken
- [ ] Multi-Model: Gemini & GPT als Alternative
- [ ] Deploy: Vercel/Railway One-Click

## Phase 4: Polish (Tag 6-7)
- [ ] Demo-Video aufnehmen (2-3 Min)
- [ ] Devpost-Submission schreiben
- [ ] Screenshots für Submission
- [ ] Edge Cases & Error Handling
- [ ] README finalisieren

## Hackathon-spezifische Anpassungen
### Amazon Nova
- [ ] Amazon Bedrock/Nova API integrieren (statt nur Claude)
- [ ] "Built with Amazon Nova" branding

### GitLab
- [ ] GitLab API Integration (MR erstellen, Pipeline starten)
- [ ] GitLab CI/CD Template-Generator

### Elasticsearch
- [ ] Elasticsearch als Knowledge Base für Agent-Memory
- [ ] Code-Suche über Elasticsearch

## Hinweise für VibeCoding
- Öffne das Projekt in VS Code: `code /home/openclaw/hackathons/vibecoder-agent`
- Nutze Claude CLI für die AI-Provider Implementation
- Gemini CLI für Tests & Refactoring
- F5 startet die Extension im Debug-Modus
