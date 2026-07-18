import type { ThemeMode } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  route: string;
  theme: ThemeMode;
  onThemeToggle: () => void;
}

const links = [
  { href: '#/', label: 'Home', route: '/' },
  { href: '#/challenges', label: 'Challenges', route: '/challenges' },
  { href: '#/progress', label: 'Progress', route: '/progress' },
  { href: '#/bookmarks', label: 'Bookmarks', route: '/bookmarks' }
];

export function Header({ route, theme, onThemeToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950">
            B
          </span>
          <span>
            <span className="block text-base font-black tracking-tight text-slate-950 dark:text-white">BugRoom</span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">Debugging practice lab</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900 md:flex">
          {links.map((link) => {
            const isActive = route === link.route || (link.route !== '/' && route.startsWith(link.route));
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>

      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4 sm:px-6 md:hidden">
        {links.map((link) => {
          const isActive = route === link.route || (link.route !== '/' && route.startsWith(link.route));
          return (
            <a
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                  : 'bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
