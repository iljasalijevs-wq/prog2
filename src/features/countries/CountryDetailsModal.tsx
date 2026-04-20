import { useEffect, useState } from 'react';
import { getCurrentWeather, getWeatherLabel } from '../weather/api';
import type { WeatherResponse } from '../weather/types';
import type { Country } from './types';

interface CountryDetailsModalProps {
  country: Country | null;
  onClose: () => void;
}

function formatList(items?: string[] | Record<string, { name: string; symbol?: string }>): string {
  if (!items) return '—';

  if (Array.isArray(items)) {
    return items.join(', ');
  }

  return Object.values(items)
    .map((item) => (item.symbol ? `${item.name} (${item.symbol})` : item.name))
    .join(', ');
}

export function CountryDetailsModal({ country, onClose }: CountryDetailsModalProps) {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    if (!country) return;

    let isMounted = true;
    const [latitude, longitude] = country.latlng;

    async function loadWeather() {
      try {
        setIsLoadingWeather(true);
        setWeatherError(null);
        const data = await getCurrentWeather(latitude, longitude);

        if (isMounted) {
          setWeather(data);
        }
      } catch {
        if (isMounted) {
          setWeatherError('Could not load weather information.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingWeather(false);
        }
      }
    }

    void loadWeather();

    return () => {
      isMounted = false;
    };
  }, [country]);

  useEffect(() => {
    if (!country) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [country, onClose]);

  if (!country) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/30">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Country profile</p>
            <h3 className="mt-2 text-3xl font-bold text-white">{country.name.common}</h3>
            <p className="text-slate-400">{country.name.official}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-4 py-2 text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            Close
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <img
            src={country.flags.svg}
            alt={country.flags.alt ?? `Flag of ${country.name.common}`}
            className="w-full rounded-3xl border border-white/10 bg-slate-950/50"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard label="Capital" value={country.capital?.join(', ') ?? '—'} />
            <InfoCard label="Region" value={country.region} />
            <InfoCard label="Subregion" value={country.subregion ?? '—'} />
            <InfoCard label="Population" value={new Intl.NumberFormat('en-US').format(country.population)} />
            <InfoCard label="Area" value={country.area ? `${new Intl.NumberFormat('en-US').format(country.area)} km²` : '—'} />
            <InfoCard label="Timezones" value={formatList(country.timezones)} />
            <InfoCard label="Languages" value={country.languages ? Object.values(country.languages).join(', ') : '—'} />
            <InfoCard label="Currencies" value={formatList(country.currencies)} />
          </div>
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-xl font-semibold text-white">Live weather snapshot</h4>
              <p className="text-sm text-slate-400">Current conditions from the selected country coordinates.</p>
            </div>
          </div>

          {isLoadingWeather && <p className="text-slate-300">Loading weather...</p>}
          {weatherError && <p className="text-rose-300">{weatherError}</p>}

          {weather && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard label="Temperature" value={`${weather.current.temperature_2m} °C`} />
              <InfoCard label="Wind speed" value={`${weather.current.wind_speed_10m} km/h`} />
              <InfoCard label="Humidity" value={`${weather.current.relative_humidity_2m}%`} />
              <InfoCard label="Conditions" value={getWeatherLabel(weather.current.weather_code)} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

interface InfoCardProps {
  label: string;
  value: string;
}

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  );
}
