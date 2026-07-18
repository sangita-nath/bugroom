interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      {label ? <div className="mb-2 flex justify-between text-sm font-semibold text-slate-600 dark:text-slate-300"><span>{label}</span><span>{safeValue}%</span></div> : null}
      <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full rounded-full bg-slate-950 transition-all dark:bg-white" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
