export interface CurrentWeather {
  temperature_2m: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  weather_code: number;
}

export interface WeatherResponse {
  current: CurrentWeather;
}
