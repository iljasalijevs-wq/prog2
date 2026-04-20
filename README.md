# World Explorer

Modern React SPA built with **React**, **TypeScript**, **Axios**, and **Tailwind CSS**. The project satisfies the Programming II assignment requirements:

- Single Page Application (SPA)
- Public API integration
- Feature-based folder structure
- `api.ts` and `types.ts` per feature
- `useState` and `useEffect`
- Loading and error states
- Responsive UI with Tailwind CSS

## Features

- Search countries by name
- Filter by region
- Save favorites in `localStorage`
- Open country details modal
- Load live weather for selected country
- Submit feedback with an Axios `POST` request

## Public APIs used

- **REST Countries** — country information
- **Open-Meteo** — weather data
- **JSONPlaceholder** — demo POST request for feedback form

## Project structure

```bash
src/
  app/
    App.tsx
  components/
    SectionTitle.tsx
  features/
    countries/
      api.ts
      types.ts
      CountryCard.tsx
      CountryDetailsModal.tsx
      CountryFilters.tsx
    weather/
      api.ts
      types.ts
    feedback/
      api.ts
      types.ts
      FeedbackForm.tsx
  hooks/
    useDebounce.ts
  lib/
    axios.ts
  styles/
    index.css
```

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Presentation talking points

1. Why Vite + React + TypeScript were chosen.
2. How feature-based architecture separates API logic, types, and UI.
3. How Axios is used for GET and POST requests.
4. How loading/error states are handled.
5. How `useState`, `useEffect`, `useMemo`, and custom hooks are used.
6. How Tailwind CSS makes the layout responsive.
