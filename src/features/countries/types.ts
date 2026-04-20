export interface CountryName {
  common: string;
  official: string;
}

export interface Currency {
  name: string;
  symbol?: string;
}

export interface Country {
  cca3: string;
  name: CountryName;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  flags: {
    svg: string;
    png: string;
    alt?: string;
  };
  languages?: Record<string, string>;
  currencies?: Record<string, Currency>;
  continents?: string[];
  timezones: string[];
  latlng: [number, number];
}

export type RegionFilter = 'All' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
