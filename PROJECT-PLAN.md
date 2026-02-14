# VibeCoder Agent — Komplette Projektplanung (Opus)

## Stand: 14.02.2026

---

# STRATEGISCHE ANALYSE: Welche Hackathons lohnen sich?

## Hackathon-Bewertung

### 1. DevStudio Logitech ($20k) — Deadline 25.02.
**ACHTUNG: Logitech ist ein ANDERES Projekt!**
- Es geht um Logitech Geräte-Plugins (MX Creative Console, MX Ink)
- Hat NICHTS mit AI Coding zu tun
- Braucht Logitech Hardware (MX Creative Console oder MX Ink)
- **EMPFEHLUNG: SKIPPEN** — falsches Thema, braucht Hardware die wir nicht haben

### 2. Elasticsearch Agent Builder ($20k) — Deadline 27.02.
**PASST GUT — aber anderer Fokus als VibeCoder**
- Muss Elasticsearch Agent Builder Framework nutzen
- Muss Elastic Workflows, Search, oder ES|QL Tools verwenden
- Open Source Lizenz (OSI approved) Pflicht
- 3-Min Demo-Video
- ~400 Wörter Beschreibung
- **EMPFEHLUNG: Eigenes Projekt nötig** — kann nicht einfach VibeCoder einreichen
- **Projektidee: "CodeSearch Agent"** — Elasticsearch-basierter Code-Indexer + AI Agent der codebase-übergreifend sucht und Aufgaben erledigt

### 3. Amazon Nova AI ($40k) — Deadline 16.03.
**PERFEKT FÜR VIBECODER**
- Muss Amazon Nova Modelle nutzen (Nova 2 Lite, Nova 2 Sonic, Nova Act)
- Nova Act = UI Workflow Automation → passt zu einem Coding Agent!
- Kategorien: Agentic AI, UI Automation, Freestyle
- AWS Credits als Extra-Preis
- 3-Min Demo-Video
- **EMPFEHLUNG: VibeCoder Agent mit Nova Act als Backend**

### 4. GitLab AI ($65k) — Deadline 25.03.
**BESTER FIT + HÖCHSTES PREISGELD**
- GitLab Duo Agent Platform — Custom Agents & Flows
- Muss auf GitLab gehostet werden (nicht GitHub!)
- Agents die auf Triggers reagieren und Aktionen ausführen
- Kein reiner Chatbot — muss in Workflows eingreifen
- Bonus-Preise: $13.5k für Google Cloud, $13.5k für Anthropic via GitLab
- **EMPFEHLUNG: VibeCoder als GitLab Duo Agent** — CI/CD Automation, Security Fixes, Code Reviews
- **WICHTIG: Repo muss auf GitLab sein, öffentlich, OSI-Lizenz**

---

# PRIORISIERTE PROJEKT-ROADMAP

## Projekt 1: VibeCoder Agent (Haupt-Projekt)
**Ziel:** VS Code Extension — AI Coding Agent
**Einreichen bei:** Amazon Nova (16.03.) + GitLab AI (25.03.)
**Adaption:** Nova-Version nutzt Nova Act, GitLab-Version nutzt Duo Agent Platform

## Projekt 2: CodeSearch Agent (Elasticsearch-spezifisch)
**Ziel:** Elasticsearch-basierter Code-Agent
**Einreichen bei:** Elasticsearch Hackathon (27.02.)
**Scope:** Kleiner, fokussierter — Agent der Code in Elasticsearch indexiert und codebase-übergreifend Fragen beantwortet

## Projekt 3: Logitech — SKIPPEN
Braucht spezielle Hardware, falsches Thema.

---

# DETAILPLAN: PROJEKT 1 — VibeCoder Agent

## Architektur (finale Version)

```
vibecoder-agent/
├── src/
│   ├── extension.ts                 # VS Code Extension Entry
│   │
│   ├── agent/                       # Agent Core
│   │   ├── core.ts                  # Orchestrierung: nimmt User-Input → plant → führt aus
│   │   ├── planner.ts               # Zerlegt Aufgaben in Steps (via AI)
│   │   ├── executor.ts              # Führt Steps aus (Files, Terminal, Git)
│   │   ├── memory.ts                # Projekt-Kontext + Session-History (SQLite)
│   │   └── context-builder.ts       # Baut optimalen Kontext für AI-Prompts
│   │
│   ├── providers/                   # AI Model Abstraction
│   │   ├── base.ts                  # Interface: sendPrompt(), streamResponse()
│   │   ├── anthropic.ts             # Claude via Anthropic API
│   │   ├── nova.ts                  # Amazon Nova via Bedrock (für Amazon Hackathon)
│   │   ├── gemini.ts                # Google Gemini
│   │   ├── openai.ts                # OpenAI GPT
│   │   └── ollama.ts                # Lokale Modelle
│   │
│   ├── tools/                       # Agent-Tools (was der Agent TUN kann)
│   │   ├── file-manager.ts          # Dateien lesen, schreiben, suchen
│   │   ├── terminal-runner.ts       # Shell-Commands ausführen
│   │   ├── git-ops.ts               # Git: commit, branch, push, diff
│   │   ├── error-analyzer.ts        # VS Code Diagnostics lesen + Fix vorschlagen
│   │   ├── project-scanner.ts       # Codebase analysieren (Sprache, Framework, Deps)
│   │   └── deployer.ts              # Deploy zu Vercel/Railway/Docker
│   │
│   ├── ui/                          # VS Code UI
│   │   ├── chat-panel.ts            # Webview: Chat-Interface mit Agent
│   │   ├── sidebar-provider.ts      # Sidebar: Projekt-Status, Agent-Status
│   │   ├── diff-preview.ts          # Diff-Ansicht vor Code-Änderungen
│   │   └── status-bar.ts            # Statusbar: Model, Tokens, Status
│   │
│   └── utils/
│       ├── config.ts                # Settings aus VS Code Config
│       ├── logger.ts                # Logging
│       ├── token-counter.ts         # Token-Counting für Context-Window
│       └── prompts.ts               # System-Prompts & Templates
│
├── webview/                         # Chat UI (HTML/CSS/JS für Webview)
│   ├── index.html
│   ├── chat.css
│   └── chat.js
│
├── test/
│   ├── agent.test.ts
│   ├── planner.test.ts
│   ├── executor.test.ts
│   └── providers.test.ts
│
├── .vscode/launch.json              # Debug-Config
├── package.json
├── tsconfig.json
├── .gitignore
├── LICENSE                          # MIT
├── CHANGELOG.md
└── README.md
```

## Implementierungs-Reihenfolge (für Sonnet)

### Sprint 1: Lauffähige Extension (2-3h)
**Ziel:** Extension startet in VS Code, Chat-Panel öffnet sich

1. `package.json` finalisieren (alle contributes, activation events)
2. `extension.ts` — registriert alle Commands
3. `chat-panel.ts` — Webview mit einfachem Chat-Input/Output
4. `webview/index.html` + `chat.css` + `chat.js` — Chat UI
5. `status-bar.ts` — zeigt "VibeCoder: Ready" in der Statusbar
6. **Test:** F5 → Extension Host → Chat öffnet sich → Text eingeben

### Sprint 2: AI Provider + erste Antwort (1-2h)
**Ziel:** User schreibt im Chat, Agent antwortet via Claude API

1. `providers/base.ts` — Interface definieren
2. `providers/anthropic.ts` — Claude API anbinden (Streaming)
3. `config.ts` — API Key aus VS Code Settings lesen
4. `agent/core.ts` — Chat-Input → Provider → Antwort → Chat-Output
5. `prompts.ts` — System-Prompt: "Du bist VibeCoder Agent, ein AI Coding Assistant..."
6. **Test:** Chat → Frage stellen → Claude antwortet im Chat-Panel

### Sprint 3: Projekt-Kontext (1-2h)
**Ziel:** Agent versteht das aktuelle Projekt

1. `project-scanner.ts` — Workspace analysieren (package.json, Sprache, Framework)
2. `context-builder.ts` — Relevante Dateien in den Prompt laden
3. `token-counter.ts` — Context-Window nicht überschreiten
4. `file-manager.ts` — Dateien lesen/schreiben
5. Core: Projektinfos in System-Prompt injizieren
6. **Test:** "Was ist das für ein Projekt?" → Agent beschreibt das aktuelle Projekt korrekt

### Sprint 4: Code-Aktionen (2-3h)
**Ziel:** Agent kann Dateien erstellen/bearbeiten und Terminal-Befehle ausführen

1. `executor.ts` — Vollständige Implementation (File, Terminal, Git)
2. `planner.ts` — AI zerlegt "Erstelle eine REST API" in konkrete Steps
3. `terminal-runner.ts` — Shell-Commands im VS Code Terminal
4. `git-ops.ts` — Git commit, branch, diff
5. `diff-preview.ts` — Zeigt Änderungen bevor sie applied werden
6. **Test:** "Erstelle eine Express API mit /health Endpoint" → Agent erstellt Dateien + installiert deps

### Sprint 5: Smart Debugging (1-2h)
**Ziel:** Agent liest Fehler und fixt sie

1. `error-analyzer.ts` — VS Code Diagnostics API: Fehler sammeln
2. Prompt: Fehler + relevanter Code → AI → Fix
3. Diff-Preview vor dem Anwenden
4. **Test:** TypeScript-Fehler im Code → Agent fixt automatisch

### Sprint 6: Polish & Demo (2-3h)
**Ziel:** Hackathon-ready

1. Error-Handling überall
2. Loading-States in UI
3. README finalisieren
4. Demo-Video Script schreiben
5. 3-Min Demo aufnehmen (OBS auf Fedora)
6. Devpost-Submission ausfüllen

## Zeitaufwand gesamt: ~12-16h Coding

---

# DETAILPLAN: PROJEKT 2 — CodeSearch Agent (Elasticsearch)

## Konzept
Ein Agent der mit Elasticsearch Agent Builder Framework gebaut ist und:
1. Code-Repositories in Elasticsearch indexiert (Dateien, Funktionen, Klassen)
2. Natürliche Fragen beantwortet ("Wo wird die Authentifizierung implementiert?")
3. Multi-Step Aufgaben erledigt (Code suchen → analysieren → Zusammenfassung)

## Architektur
```
codesearch-agent/
├── agent/
│   ├── config.yaml              # Agent Builder Config
│   ├── tools/
│   │   ├── code-search.ts       # Elasticsearch-Suche über Code-Index
│   │   ├── code-analyzer.ts     # Code-Analyse (AST/Patterns)
│   │   └── repo-indexer.ts      # Git-Repos in Elasticsearch indexieren
│   └── workflows/
│       ├── index-repo.yaml      # Workflow: Repo klonen → parsen → indexieren
│       └── search-analyze.yaml  # Workflow: Suchen → Kontext sammeln → Antworten
├── scripts/
│   └── setup-elasticsearch.sh   # Elastic Cloud Setup
├── README.md
├── LICENSE                      # Apache 2.0
└── demo/
    └── demo-script.md
```

## Elasticsearch-spezifisch
- Nutzt Elastic Agent Builder (Pflicht)
- Elastic Workflows für Multi-Step
- ES|QL Queries für Code-Suche
- Vector Embeddings für semantische Code-Suche
- Kibana-Dashboard für Visualisierung

## Zeitaufwand: ~8-10h

---

# GESAMT-TIMELINE

| Datum | Aufgabe |
|-------|---------|
| 14.02. (heute) | ✅ Planung fertig (Opus) |
| 15.02. - 17.02. | Sprint 1-3: VibeCoder Core (Extension + Chat + AI + Kontext) |
| 18.02. - 20.02. | Sprint 4-5: Code-Aktionen + Debugging |
| 21.02. - 23.02. | CodeSearch Agent für Elasticsearch bauen |
| 24.02. - 25.02. | Polish + Demo-Video + Elasticsearch Submission |
| 26.02. - 27.02. | Elasticsearch Submission einreichen |
| 01.03. - 10.03. | VibeCoder: Nova Integration + Amazon Submission vorbereiten |
| 11.03. - 16.03. | Amazon Nova Submission |
| 17.03. - 22.03. | VibeCoder: GitLab Duo Agent Version |
| 23.03. - 25.03. | GitLab Submission |

---

# ANWEISUNGEN FÜR SONNET (nach Modellwechsel)

## Reihenfolge
1. Lies `/home/openclaw/hackathons/vibecoder-agent/PROJECT-PLAN.md` (dieses Dokument)
2. Starte mit Sprint 1
3. Nach jedem Sprint: `git add -A && git commit && git push`
4. Arbeite Sprint für Sprint durch
5. Schreib funktionierenden, sauberen Code — kein Placeholder/TODO

## Regeln
- Orion schreibt den Code DIREKT in die Dateien und pusht zu GitHub
- Jeder Sprint wird komplett implementiert bevor der nächste beginnt
- Alle TypeScript Dateien müssen kompilieren (`npm run build` muss passen)
- Tests sind optional aber gut
- Webview UI soll schlicht aber professionell aussehen (Dark Theme)

## Provider-Reihenfolge
1. Erst Anthropic (Claude) — das kennen wir
2. Dann Nova — für Amazon Hackathon
3. Dann Gemini/OpenAI — nice to have
