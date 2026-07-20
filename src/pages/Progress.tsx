import { ProgressBar } from '../components/ProgressBar';
import { StatCard } from '../components/StatCard';
import { challenges, categories, difficulties } from '../data/challenges';
import type { UserProgress } from '../types';
import { getChallengeStatus, getSummary, solvedCountBy } from '../utils/progress';

interface ProgressProps {
  progress: UserProgress;
}

export function Progress({ progress }: ProgressProps) {
  const summary = getSummary(challenges, progress);
  const solvedByCategory = solvedCountBy(challenges, progress, (challenge) => challenge.category);
  const solvedByDifficulty = solvedCountBy(challenges, progress, (challenge) => challenge.difficulty);

  return (
    <main className="page-shell">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Progress</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">Track your debugging practice</h1>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Solved" value={summary.solved} detail="Completed challenges" />
        <StatCard label="In progress" value={summary.inProgress} detail="Started but not solved" />
        <StatCard label="Need review" value={summary.needReview} detail="Marked for later practice" />
        <StatCard label="Bookmarked" value={summary.bookmarked} detail="Saved challenges" />
        <StatCard label="Completion" value={`${summary.completion}%`} detail="Overall progress" />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Solved by category</h2>
          <div className="mt-5 space-y-4">
            {categories.map((category) => {
              const total = challenges.filter((challenge) => challenge.category === category).length;
              const solved = solvedByCategory[category] ?? 0;
              const percentage = total === 0 ? 0 : Math.round((solved / total) * 100);
              return <ProgressBar key={category} value={percentage} label={`${category} (${solved}/${total})`} />;
            })}
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Solved by difficulty</h2>
          <div className="mt-5 space-y-4">
            {difficulties.map((difficulty) => {
              const total = challenges.filter((challenge) => challenge.difficulty === difficulty).length;
              const solved = solvedByDifficulty[difficulty] ?? 0;
              const percentage = total === 0 ? 0 : Math.round((solved / total) * 100);
              return <ProgressBar key={difficulty} value={percentage} label={`${difficulty} (${solved}/${total})`} />;
            })}
          </div>
        </div>
      </section>

      <section className="panel mt-6 overflow-hidden">
        <div className="border-b border-slate-200 p-6 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Challenge history</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.15em] text-slate-400 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-4">Challenge</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Solved on</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {challenges.map((challenge) => (
                <tr key={challenge.id} className="text-slate-600 dark:text-slate-300">
                  <td className="px-6 py-4 font-bold text-slate-950 dark:text-white"><a href={`#/challenge/${challenge.id}`}>{challenge.title}</a></td>
                  <td className="px-6 py-4">{challenge.category}</td>
                  <td className="px-6 py-4">{challenge.difficulty}</td>
                  <td className="px-6 py-4">{getChallengeStatus(progress, challenge.id)}</td>
                  <td className="px-6 py-4">{progress.completedAt[challenge.id] ? new Date(progress.completedAt[challenge.id]).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
