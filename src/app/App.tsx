import { useEffect, useMemo, useState } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { CountryCard } from '../features/countries/CountryCard';
import { CountryDetailsModal } from '../features/countries/CountryDetailsModal';
import { CountryFilters } from '../features/countries/CountryFilters';
import { getAllCountries, searchCountriesByName } from '../features/countries/api';
import type { Country, RegionFilter } from '../features/countries/types';
import { FeedbackForm } from '../features/feedback/FeedbackForm';
import { useDebounce } from '../hooks/useDebounce';

const FAVORITES_STORAGE_KEY = 'world-explorer-favorites';

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState<RegionFilter>('All');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const savedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      try {
        setFavoriteIds(JSON.parse(savedFavorites) as string[]);
      } catch {
        window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    let isMounted = true;

    async function loadCountries() {
      try {
        setIsLoading(true);
        setError(null);

        const data = debouncedSearchTerm.trim()
          ? await searchCountriesByName(debouncedSearchTerm.trim())
          : await getAllCountries();

        if (isMounted) {
          const sortedData = [...data].sort((a, b) => a.name.common.localeCompare(b.name.common));
          setCountries(sortedData);
        }
      } catch {
        if (isMounted) {
          setError('Failed to load countries. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadCountries();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearchTerm]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesRegion = region === 'All' || country.region === region;
      const matchesFavorites = !favoritesOnly || favoriteIds.includes(country.cca3);
      return matchesRegion && matchesFavorites;
    });
  }, [countries, region, favoritesOnly, favoriteIds]);

  function toggleFavorite(countryId: string) {
    setFavoriteIds((current) =>
      current.includes(countryId)
        ? current.filter((id) => id !== countryId)
        : [...current, countryId],
    );
  }

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white/10 bg-slate-950/40 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Programming II project</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
            World Explorer
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
            A responsive React SPA that integrates public APIs with Axios, uses TypeScript for type safety,
            and Tailwind CSS for modern UI design.
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <SectionTitle
            eyebrow="Discover countries"
            title="Explore live country and weather data"
            description="Search countries by name, filter by region, save favorites, and open a detailed modal view with a live weather snapshot loaded from a public API."
          />

          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:grid-cols-3">
            <StatCard label="Countries loaded" value={String(countries.length)} />
            <StatCard label="Favorites" value={String(favoriteIds.length)} />
            <StatCard label="Region filter" value={region} />
          </div>
        </section>

        <CountryFilters
          searchTerm={searchTerm}
          region={region}
          favoritesOnly={favoritesOnly}
          onSearchChange={setSearchTerm}
          onRegionChange={setRegion}
          onFavoritesOnlyChange={setFavoritesOnly}
        />

        {isLoading && (
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center text-lg text-slate-200">
            Loading countries...
          </section>
        )}

        {error && (
          <section className="rounded-[2rem] border border-rose-400/30 bg-rose-500/10 p-8 text-center text-lg text-rose-200">
            {error}
          </section>
        )}

        {!isLoading && !error && (
          <section className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">Country catalog</h2>
              <p className="text-sm text-slate-300">
                Showing <span className="font-semibold text-cyan-300">{filteredCountries.length}</span> results
              </p>
            </div>

            {filteredCountries.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center text-slate-300">
                No countries match the current filters.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredCountries.map((country) => (
                  <CountryCard
                    key={country.cca3}
                    country={country}
                    isFavorite={favoriteIds.includes(country.cca3)}
                    onToggleFavorite={toggleFavorite}
                    onSelect={setSelectedCountry}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        <FeedbackForm />
      </main>

      <CountryDetailsModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
