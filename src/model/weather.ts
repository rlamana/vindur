export interface Values {
  cloudBase: number | null;
  cloudCeiling: number | null;
  cloudCover: number;
  precipitationIntensity: number;
  precipitationType: number;
  temperature: number;
  temperatureApparent: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
};

export interface Interval {
  startTime: string;
  values: Values;
};

export interface Timeline {
  timestep: string;
  endTime: string;
  startTime: string;
  intervals: Interval[];
};

export interface Weather {
  timelines: Timeline[];
  warnings: any[];
};

export interface WeatherResponse {
  data?: Weather;
};

export function convertMStoKMH(ms: number): number {
  const metersInKilometer = 1000;
  const secondsInHour = 3600;
  const kilometersPerHour = ms * (metersInKilometer / secondsInHour);
  return parseFloat(kilometersPerHour.toFixed(2)); // Ensure only two decimal places
}
