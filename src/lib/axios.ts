import axios from 'axios';

export const countriesApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
});

export const weatherApi = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 10000,
});

export const feedbackApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});
