import { useMemo, useState } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { EmptyState } from '../components/EmptyState';
import { FilterBar } from '../components/FilterBar';
import { challenges } from '../data/challenges';
import type { ChallengeFilters, UserProgress } from '../types';
import { filterChallenges } from '../utils/filters';
import { getChallengeStatus } from '../utils/progress';

interface ChallengesProps {
  progress: UserProgress;
  onToggleBookmark: (challengeId: string) => void;
}

const defaultFilters: ChallengeFilters = {
  query: '',
  category: 'All',
  difficulty: 'All',
  status: 'All'
};

export function Challenges({ progress, onToggleBookmark }: ChallengesProps) {
  const [filters, setFilters] = useState<ChallengeFilters>(defaultFilters);

  const filteredChallenges = useMemo(
    () => filterChallenges(challenges, filters, progress),
    [filters, progress]
  );

  return (
    <main className="page-shell">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Challenge dashboard</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">Pick a bug and start fixing</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Search, filter, bookmark, and solve debugging cases across frontend development topics.
          </p>
        </div>
        <span className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950">
          {filteredChallenges.length} shown
        </span>
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      {filteredChallenges.length > 0 ? (
        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              status={getChallengeStatus(progress, challenge.id)}
              isBookmarked={progress.bookmarks.includes(challenge.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </section>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No challenges found"
            message="Try changing the search text or removing some filters."
          />
        </div>
      )}
    </main>
  );
}
