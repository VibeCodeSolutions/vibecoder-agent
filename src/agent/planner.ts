import { Memory } from './memory';

export interface Step {
  id: string;
  description: string;
  type: 'file' | 'terminal' | 'git' | 'install';
  action: string;
  params: Record<string, any>;
}

export interface Plan {
  description: string;
  steps: Step[];
}

export class Planner {
  private memory: Memory;

  constructor(memory: Memory) {
    this.memory = memory;
  }

  async createPlan(description: string): Promise<Plan> {
    // TODO: Use AI model to generate plan from description
    // For now, return a basic scaffold plan
    return {
      description,
      steps: [
        {
          id: '1',
          description: 'Initialize project structure',
          type: 'terminal',
          action: 'scaffold',
          params: { description }
        },
        {
          id: '2',
          description: 'Install dependencies',
          type: 'install',
          action: 'npm-install',
          params: {}
        },
        {
          id: '3',
          description: 'Initialize git repository',
          type: 'git',
          action: 'init',
          params: {}
        }
      ]
    };
  }
}
