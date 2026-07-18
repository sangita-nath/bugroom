interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ title, message, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="panel flex flex-col items-center justify-center p-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-2xl font-black text-slate-400 dark:bg-slate-900 dark:text-slate-500">
        !
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">{message}</p>
      {actionLabel && actionHref ? (
        <a href={actionHref} className="primary-button mt-6">
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
}
