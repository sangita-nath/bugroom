interface HintBoxProps {
  hints: string[];
  revealedCount: number;
  onReveal: () => void;
}

export function HintBox({ hints, revealedCount, onReveal }: HintBoxProps) {
  const visibleHints = hints.slice(0, revealedCount);
  const hasMoreHints = revealedCount < hints.length;

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-950 dark:text-white">Hints</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Reveal hints one by one when you are stuck.</p>
        </div>
        <button type="button" onClick={onReveal} disabled={!hasMoreHints} className="secondary-button disabled:cursor-not-allowed disabled:opacity-50">
          {hasMoreHints ? 'Reveal hint' : 'All shown'}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {visibleHints.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Try reading the bug report and code first. Reveal a hint only if you need a push.
          </p>
        ) : (
          visibleHints.map((hint, index) => (
            <div key={hint} className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800 dark:border-blue-950 dark:bg-blue-950/40 dark:text-blue-200">
              <strong>Hint {index + 1}:</strong> {hint}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
