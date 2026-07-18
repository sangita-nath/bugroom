interface CodeEditorProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export function CodeEditor({ label, value, onChange, readOnly = false }: CodeEditorProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-soft dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        readOnly={readOnly}
        spellCheck={false}
        className="min-h-[360px] w-full resize-y bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-600"
      />
    </div>
  );
}
