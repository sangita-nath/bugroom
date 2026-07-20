import { challenges } from '../data/challenges';
import type { UserProgress } from '../types';
import { getSummary } from '../utils/progress';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';

interface HomeProps {
  progress: UserProgress;
}

export function Home({ progress }: HomeProps) {
  const summary = getSummary(challenges, progress);

  return (
    <main className="page-shell">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="panel overflow-hidden p-8 sm:p-10">
          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-950 dark:bg-blue-950/40 dark:text-blue-300">
            Debug by fixing real mistakes
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Practice debugging with small, realistic code cases.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            BugRoom helps you read broken code, understand the bug, reveal hints, compare solutions, and build better debugging habits through focused challenges.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#/challenges" className="primary-button">Start practicing</a>
            <a href="#/progress" className="secondary-button">View progress</a>
          </div>
        </div>

        <div className="panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Current progress</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{summary.completion}% complete</h2>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-2xl font-black text-white dark:bg-white dark:text-slate-950">
              {summary.solved}
            </div>
          </div>
          <div className="mt-6">
            <ProgressBar value={summary.completion} label="Solved challenges" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-900">
              <p className="text-2xl font-black text-slate-950 dark:text-white">{summary.total}</p>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Challenges</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-900">
              <p className="text-2xl font-black text-slate-950 dark:text-white">{summary.bookmarked}</p>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Bookmarked</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Bug cases" value={challenges.length} detail="Across JavaScript, React, TypeScript, CSS, forms, async, and API handling." />
        <StatCard label="Guided hints" value="3 each" detail="Hints are hidden by default, so users can try before getting help." />
        <StatCard label="Local progress" value="Saved" detail="Statuses, bookmarks, and attempts stay in the browser." />
        <StatCard label="Deployment" value="Ready" detail="Configured for GitHub Pages under the bugroom repository path." />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {[
          ['Read the bug', 'Start with the bug report and expected behavior before touching the code.'],
          ['Fix the code', 'Use the editable attempt area to write your own fix and understand the change.'],
          ['Review the solution', 'Reveal the final solution only after trying, then compare the reasoning.']
        ].map(([title, message]) => (
          <div key={title} className="panel p-6">
            <h3 className="text-xl font-black text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{message}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
