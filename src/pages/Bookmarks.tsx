import { ChallengeCard } from '../components/ChallengeCard';
import { EmptyState } from '../components/EmptyState';
import { challenges } from '../data/challenges';
import type { UserProgress } from '../types';
import { getChallengeStatus } from '../utils/progress';

interface BookmarksProps {
  progress: UserProgress;
  onToggleBookmark: (challengeId: string) => void;
}

export function Bookmarks({ progress, onToggleBookmark }: BookmarksProps) {
  const bookmarkedChallenges = challenges.filter((challenge) => progress.bookmarks.includes(challenge.id));

  return (
    <main className="page-shell">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Bookmarks</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">Saved challenges</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Keep difficult or important bugs here so you can revisit them later.
        </p>
      </div>

      {bookmarkedChallenges.length > 0 ? (
        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {bookmarkedChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              status={getChallengeStatus(progress, challenge.id)}
              isBookmarked
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </section>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No bookmarks yet"
            message="Save useful or difficult challenges from the dashboard and they will appear here."
            actionLabel="Browse challenges"
            actionHref="#/challenges"
          />
        </div>
      )}
    </main>
  );
}
