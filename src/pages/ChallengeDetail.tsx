import { useMemo, useState } from 'react';
import { Badge } from '../components/Badge';
import { CodeEditor } from '../components/CodeEditor';
import { EmptyState } from '../components/EmptyState';
import { HintBox } from '../components/HintBox';
import { challenges } from '../data/challenges';
import type { ChallengeStatus, UserProgress } from '../types';
import { getChallengeStatus } from '../utils/progress';
import { difficultyClass, statusClass } from '../utils/style';

interface ChallengeDetailProps {
  challengeId: string;
  progress: UserProgress;
  onSetStatus: (challengeId: string, status: ChallengeStatus) => void;
  onToggleBookmark: (challengeId: string) => void;
  onSetAttempt: (challengeId: string, attempt: string) => void;
  onRevealHint: (challengeId: string, totalHints: number) => void;
  onResetChallenge: (challengeId: string) => void;
}

export function ChallengeDetail({
  challengeId,
  progress,
  onSetStatus,
  onToggleBookmark,
  onSetAttempt,
  onRevealHint,
  onResetChallenge
}: ChallengeDetailProps) {
  const [showSolution, setShowSolution] = useState(false);
  const challenge = useMemo(() => challenges.find((item) => item.id === challengeId), [challengeId]);

  if (!challenge) {
    return (
      <main className="page-shell">
        <EmptyState title="Challenge not found" message="The challenge you are looking for does not exist." actionLabel="Back to challenges" actionHref="#/challenges" />
      </main>
    );
  }

  const status = getChallengeStatus(progress, challenge.id);
  const attempt = progress.attempts[challenge.id] ?? challenge.brokenCode;
  const revealedHints = progress.revealedHints[challenge.id] ?? 0;
  const isBookmarked = progress.bookmarks.includes(challenge.id);

  return (
    <main className="page-shell">
      <a href="#/challenges" className="text-sm font-bold text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white">
        Back to challenges
      </a>

      <section className="mt-5 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          <div className="panel p-6">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{challenge.category}</Badge>
              <Badge className={difficultyClass(challenge.difficulty)}>{challenge.difficulty}</Badge>
              <Badge className={statusClass(status)}>{status}</Badge>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{challenge.title}</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{challenge.bugReport}</p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Expected behavior</p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{challenge.expectedBehavior}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {challenge.concepts.map((concept) => (
                <span key={concept} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                  {concept}
                </span>
              ))}
            </div>
          </div>

          <HintBox hints={challenge.hints} revealedCount={revealedHints} onReveal={() => onRevealHint(challenge.id, challenge.hints.length)} />

          <div className="panel p-5">
            <h3 className="text-lg font-black text-slate-950 dark:text-white">Challenge actions</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button type="button" className="secondary-button" onClick={() => onSetStatus(challenge.id, 'In Progress')}>Mark in progress</button>
              <button type="button" className="secondary-button" onClick={() => onSetStatus(challenge.id, 'Need Review')}>Need review</button>
              <button type="button" className="primary-button" onClick={() => onSetStatus(challenge.id, 'Solved')}>Mark solved</button>
              <button type="button" className="secondary-button" onClick={() => onToggleBookmark(challenge.id)}>{isBookmarked ? 'Remove bookmark' : 'Bookmark'}</button>
            </div>
            <button type="button" className="danger-button mt-3 w-full" onClick={() => onResetChallenge(challenge.id)}>Reset this challenge</button>
          </div>
        </div>

        <div className="space-y-5">
          <CodeEditor label="Your fix" value={attempt} onChange={(value) => onSetAttempt(challenge.id, value)} />

          <div className="panel p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">Solution</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Try your own fix before revealing the answer.</p>
              </div>
              <button type="button" className="secondary-button" onClick={() => setShowSolution((current) => !current)}>
                {showSolution ? 'Hide solution' : 'Reveal solution'}
              </button>
            </div>
          </div>

          {showSolution ? (
            <>
              <CodeEditor label="Solution" value={challenge.solutionCode} readOnly />
              <div className="panel p-5">
                <h3 className="text-lg font-black text-slate-950 dark:text-white">Explanation</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{challenge.explanation}</p>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
