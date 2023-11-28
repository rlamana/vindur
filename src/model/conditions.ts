export interface ConditionsConfiguration {
  maxSpeed?: number;
  precipitationLimit?: number;
}

export type FlightCondition = 'bad' | 'average' | 'good';
