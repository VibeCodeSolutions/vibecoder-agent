import { Memory } from './memory';
import { Step } from './planner';

export class Executor {
  private memory: Memory;

  constructor(memory: Memory) {
    this.memory = memory;
  }

  async execute(step: Step): Promise<void> {
    console.log(`[VibeCoder] Executing: ${step.description}`);

    switch (step.type) {
      case 'file':
        await this.executeFileOp(step);
        break;
      case 'terminal':
        await this.executeTerminal(step);
        break;
      case 'git':
        await this.executeGit(step);
        break;
      case 'install':
        await this.executeInstall(step);
        break;
    }

    this.memory.recordStep(step);
  }

  private async executeFileOp(step: Step): Promise<void> {
    // TODO: Create/modify files based on AI output
  }

  private async executeTerminal(step: Step): Promise<void> {
    // TODO: Run terminal commands
  }

  private async executeGit(step: Step): Promise<void> {
    // TODO: Git operations
  }

  private async executeInstall(step: Step): Promise<void> {
    // TODO: npm/pip install
  }
}
