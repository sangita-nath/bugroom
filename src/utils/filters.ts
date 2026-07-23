import type { Challenge, ChallengeFilters, UserProgress } from '../types';
import { getChallengeStatus } from './progress';

export function filterChallenges(challenges: Challenge[], filters: ChallengeFilters, progress: UserProgress) {
  const search = filters.query.trim().toLowerCase();

  return challenges.filter((challenge) => {
    const status = getChallengeStatus(progress, challenge.id);
    const matchesSearch =
      !search ||
      challenge.title.toLowerCase().includes(search) ||
      challenge.category.toLowerCase().includes(search) ||
      challenge.bugReport.toLowerCase().includes(search) ||
      challenge.concepts.some((concept) => concept.toLowerCase().includes(search));

    const matchesCategory = filters.category === 'All' || challenge.category === filters.category;
    const matchesDifficulty = filters.difficulty === 'All' || challenge.difficulty === filters.difficulty;
    const matchesStatus = filters.status === 'All' || status === filters.status;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });
}
