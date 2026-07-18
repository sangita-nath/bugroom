import type { Challenge, ChallengeStatus } from '../types';
import { Badge } from './Badge';
import { difficultyClass, statusClass } from '../utils/style';

interface ChallengeCardProps {
  challenge: Challenge;
  status: ChallengeStatus;
  isBookmarked: boolean;
  onToggleBookmark: (challengeId: string) => void;
}

export function ChallengeCard({ challenge, status, isBookmarked, onToggleBookmark }: ChallengeCardProps) {
  return (
    <article className="panel group flex h-full flex-col p-5 transition hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            {challenge.category}
          </Badge>
          <h3 className="mt-4 text-lg font-black tracking-tight text-slate-950 dark:text-white">{challenge.title}</h3>
        </div>
        <button
          type="button"
          onClick={() => onToggleBookmark(challenge.id)}
          className={`rounded-2xl border px-3 py-2 text-sm font-black transition ${
            isBookmarked
              ? 'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950/50 dark:text-yellow-300'
              : 'border-slate-200 bg-white text-slate-400 hover:text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500 dark:hover:text-slate-200'
          }`}
          aria-label="Toggle bookmark"
        >
          {isBookmarked ? 'Saved' : 'Save'}
        </button>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{challenge.bugReport}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge className={difficultyClass(challenge.difficulty)}>{challenge.difficulty}</Badge>
        <Badge className={statusClass(status)}>{status}</Badge>
        <Badge className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          {challenge.estimatedTime}
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {challenge.concepts.slice(0, 3).map((concept) => (
          <span key={concept} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            {concept}
          </span>
        ))}
      </div>

      <a href={`#/challenge/${challenge.id}`} className="primary-button mt-6 w-full">
        Open challenge
      </a>
    </article>
  );
}
