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