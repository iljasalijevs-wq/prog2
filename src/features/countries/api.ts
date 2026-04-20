import { countriesApi } from '../../lib/axios';
import type { Country } from './types';

const fields = [
  'name',
  'cca3',
  'capital',
  'region',
  'subregion',
  'population',
  'area',
  'flags',
  'languages',
  'currencies',
  'continents',
  'timezones',
  'latlng',
].join(',');

export async function getAllCountries(): Promise<Country[]> {
  const response = await countriesApi.get<Country[]>(`/all?fields=${fields}`);
  return response.data;
}

export async function searchCountriesByName(name: string): Promise<Country[]> {
  const response = await countriesApi.get<Country[]>(`/name/${encodeURIComponent(name)}?fields=${fields}`);
  return response.data;
}
