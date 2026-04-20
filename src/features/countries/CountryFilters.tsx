import type { RegionFilter } from './types';

const regions: RegionFilter[] = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

interface CountryFiltersProps {
  searchTerm: string;
  region: RegionFilter;
  favoritesOnly: boolean;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: RegionFilter) => void;
  onFavoritesOnlyChange: (value: boolean) => void;
}

export function CountryFilters({
  searchTerm,
  region,
  favoritesOnly,
  onSearchChange,
  onRegionChange,
  onFavoritesOnlyChange,
}: CountryFiltersProps) {
  return (
    <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur md:grid-cols-[2fr_1fr_auto] md:items-end">
      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-200">Search country</span>
        <input
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Start typing: Latvia, Japan, Brazil..."
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-200">Region</span>
        <select
          value={region}
          onChange={(event) => onRegionChange(event.target.value as RegionFilter)}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300"
        >
          {regions.map((regionOption) => (
            <option key={regionOption} value={regionOption}>
              {regionOption}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-200">
        <input
          type="checkbox"
          checked={favoritesOnly}
          onChange={(event) => onFavoritesOnlyChange(event.target.checked)}
          className="h-4 w-4 rounded border-white/10"
        />
        Favorites only
      </label>
    </section>
  );
}
