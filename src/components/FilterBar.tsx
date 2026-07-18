import { categories, difficulties } from '../data/challenges';
import type { ChallengeFilters, ChallengeStatus } from '../types';

interface FilterBarProps {
  filters: ChallengeFilters;
  onChange: (filters: ChallengeFilters) => void;
}

const statuses: ChallengeStatus[] = ['Not Started', 'In Progress', 'Solved', 'Need Review'];

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="panel p-4">
      <div className="grid gap-3 lg:grid-cols-[1fr_180px_160px_180px]">
        <input
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          className="soft-input"
          placeholder="Search by bug, concept, category..."
        />

        <select
          value={filters.category}
          onChange={(event) => onChange({ ...filters, category: event.target.value as ChallengeFilters['category'] })}
          className="soft-select"
        >
          <option value="All">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filters.difficulty}
          onChange={(event) => onChange({ ...filters, difficulty: event.target.value as ChallengeFilters['difficulty'] })}
          className="soft-select"
        >
          <option value="All">All levels</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>{difficulty}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(event) => onChange({ ...filters, status: event.target.value as ChallengeFilters['status'] })}
          className="soft-select"
        >
          <option value="All">All status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
