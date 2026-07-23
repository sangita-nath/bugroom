import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Bookmarks } from './pages/Bookmarks';
import { ChallengeDetail } from './pages/ChallengeDetail';
import { Challenges } from './pages/Challenges';
import { Home } from './pages/Home';
import { Progress } from './pages/Progress';
import type { ChallengeStatus, ThemeMode, UserProgress } from './types';
import { emptyProgress } from './utils/progress';
import { useLocalStorage } from './hooks/useLocalStorage';

function getRouteFromHash() {
  const hash = window.location.hash.replace('#', '');
  return hash || '/';
}

function getChallengeId(route: string) {
  const parts = route.split('/').filter(Boolean);
  return parts[0] === 'challenge' ? parts[1] : '';
}

export default function App() {
  const [route, setRoute] = useState(getRouteFromHash);
  const [progress, setProgress] = useLocalStorage<UserProgress>('bugroom-progress', emptyProgress);
  const [theme, setTheme] = useLocalStorage<ThemeMode>('bugroom-theme', 'light');

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const challengeId = useMemo(() => getChallengeId(route), [route]);

  function setChallengeStatus(challengeId: string, status: ChallengeStatus) {
    setProgress((current) => ({
      ...current,
      statuses: { ...current.statuses, [challengeId]: status },
      completedAt:
        status === 'Solved'
          ? { ...current.completedAt, [challengeId]: new Date().toISOString() }
          : current.completedAt
    }));
  }

  function toggleBookmark(challengeId: string) {
    setProgress((current) => {
      const isSaved = current.bookmarks.includes(challengeId);
      return {
        ...current,
        bookmarks: isSaved
          ? current.bookmarks.filter((id) => id !== challengeId)
          : [...current.bookmarks, challengeId]
      };
    });
  }

  function setAttempt(challengeId: string, attempt: string) {
    setProgress((current) => ({
      ...current,
      attempts: { ...current.attempts, [challengeId]: attempt },
      statuses: {
        ...current.statuses,
        [challengeId]: current.statuses[challengeId] ?? 'In Progress'
      }
    }));
  }

  function revealHint(challengeId: string, totalHints: number) {
    setProgress((current) => ({
      ...current,
      revealedHints: {
        ...current.revealedHints,
        [challengeId]: Math.min((current.revealedHints[challengeId] ?? 0) + 1, totalHints)
      },
      statuses: {
        ...current.statuses,
        [challengeId]: current.statuses[challengeId] ?? 'In Progress'
      }
    }));
  }

  function resetChallenge(challengeId: string) {
    setProgress((current) => {
      const statuses = { ...current.statuses };
      const attempts = { ...current.attempts };
      const revealedHints = { ...current.revealedHints };
      const completedAt = { ...current.completedAt };

      delete statuses[challengeId];
      delete attempts[challengeId];
      delete revealedHints[challengeId];
      delete completedAt[challengeId];

      return { ...current, statuses, attempts, revealedHints, completedAt };
    });
  }

  function renderPage() {
    if (route === '/' || route === '') {
      return <Home progress={progress} />;
    }

    if (route === '/challenges') {
      return <Challenges progress={progress} onToggleBookmark={toggleBookmark} />;
    }

    if (route.startsWith('/challenge/')) {
      return (
        <ChallengeDetail
          challengeId={challengeId}
          progress={progress}
          onSetStatus={setChallengeStatus}
          onToggleBookmark={toggleBookmark}
          onSetAttempt={setAttempt}
          onRevealHint={revealHint}
          onResetChallenge={resetChallenge}
        />
      );
    }

    if (route === '/progress') {
      return <Progress progress={progress} />;
    }

    if (route === '/bookmarks') {
      return <Bookmarks progress={progress} onToggleBookmark={toggleBookmark} />;
    }

    return <Home progress={progress} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_32%)]" />
      <Header route={route} theme={theme} onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      {renderPage()}
    </div>
  );
}
