export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ChallengeStatus = 'Not Started' | 'In Progress' | 'Solved' | 'Need Review';

export type ChallengeCategory =
  | 'JavaScript Logic'
  | 'React State'
  | 'TypeScript'
  | 'CSS Layout'
  | 'Async JavaScript'
  | 'Forms'
  | 'Arrays & Objects'
  | 'API Handling';

export interface Challenge {
  id: string;
  title: string;
  category: ChallengeCategory;
  difficulty: Difficulty;
  estimatedTime: string;
  concepts: string[];
  bugReport: string;
  brokenCode: string;
  expectedBehavior: string;
  hints: string[];
  solutionCode: string;
  explanation: string;
}

export interface UserProgress {
  statuses: Record<string, ChallengeStatus>;
  bookmarks: string[];
  attempts: Record<string, string>;
  revealedHints: Record<string, number>;
  completedAt: Record<string, string>;
}

export interface ChallengeFilters {
  query: string;
  category: 'All' | ChallengeCategory;
  difficulty: 'All' | Difficulty;
  status: 'All' | ChallengeStatus;
}

export type ThemeMode = 'light' | 'dark';
