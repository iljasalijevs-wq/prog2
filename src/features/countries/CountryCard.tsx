import type { Country } from './types';

interface CountryCardProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (countryId: string) => void;
  onSelect: (country: Country) => void;
}

export function CountryCard({ country, isFavorite, onToggleFavorite, onSelect }: CountryCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-lg shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40">
      <img
        src={country.flags.svg}
        alt={country.flags.alt ?? `Flag of ${country.name.common}`}
        className="h-48 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{country.name.common}</h3>
            <p className="text-sm text-slate-400">{country.name.official}</p>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(country.cca3)}
            className="rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            {isFavorite ? '★ Saved' : '☆ Save'}
          </button>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm text-slate-300">
          <div className="rounded-2xl bg-slate-950/50 p-3">
            <dt className="text-slate-500">Capital</dt>
            <dd className="mt-1 font-semibold text-white">{country.capital?.[0] ?? '—'}</dd>
          </div>
          <div className="rounded-2xl bg-slate-950/50 p-3">
            <dt className="text-slate-500">Region</dt>
            <dd className="mt-1 font-semibold text-white">{country.region}</dd>
          </div>
          <div className="rounded-2xl bg-slate-950/50 p-3">
            <dt className="text-slate-500">Population</dt>
            <dd className="mt-1 font-semibold text-white">{new Intl.NumberFormat('en-US').format(country.population)}</dd>
          </div>
          <div className="rounded-2xl bg-slate-950/50 p-3">
            <dt className="text-slate-500">Timezone</dt>
            <dd className="mt-1 font-semibold text-white">{country.timezones[0] ?? '—'}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => onSelect(country)}
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          View details
        </button>
      </div>
    </article>
  );
}
