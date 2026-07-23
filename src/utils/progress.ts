import type { Challenge, ChallengeStatus, UserProgress } from '../types';

export const emptyProgress: UserProgress = {
  statuses: {},
  bookmarks: [],
  attempts: {},
  revealedHints: {},
  completedAt: {}
};

export function getChallengeStatus(progress: UserProgress, challengeId: string): ChallengeStatus {
  return progress.statuses[challengeId] ?? 'Not Started';
}

export function getSummary(challenges: Challenge[], progress: UserProgress) {
  const total = challenges.length;
  const solved = challenges.filter((challenge) => getChallengeStatus(progress, challenge.id) === 'Solved').length;
  const needReview = challenges.filter((challenge) => getChallengeStatus(progress, challenge.id) === 'Need Review').length;
  const inProgress = challenges.filter((challenge) => getChallengeStatus(progress, challenge.id) === 'In Progress').length;
  const bookmarked = progress.bookmarks.length;
  const completion = total === 0 ? 0 : Math.round((solved / total) * 100);

  return { total, solved, needReview, inProgress, bookmarked, completion };
}

export function countBy<T extends string>(items: Challenge[], getKey: (challenge: Challenge) => T) {
  return items.reduce<Record<T, number>>((result, challenge) => {
    const key = getKey(challenge);
    result[key] = (result[key] ?? 0) + 1;
    return result;
  }, {} as Record<T, number>);
}

export function solvedCountBy<T extends string>(
  challenges: Challenge[],
  progress: UserProgress,
  getKey: (challenge: Challenge) => T
) {
  return challenges.reduce<Record<T, number>>((result, challenge) => {
    if (getChallengeStatus(progress, challenge.id) === 'Solved') {
      const key = getKey(challenge);
      result[key] = (result[key] ?? 0) + 1;
    }
    return result;
  }, {} as Record<T, number>);
}
