import { ConditionsConfiguration, FlightCondition } from './model/conditions';
import { Interval } from './model/weather';

export function evaluateFlightConditions(
  interval: Interval,
  config: ConditionsConfiguration = {}
): FlightCondition {
  const defaultMaxSpeed: number = 30;
  const defaultPrecipitationLimit: number = 5;
  const percentageAllowed: number = 0.05;

  const {
    windSpeed = defaultMaxSpeed,
    windGust = defaultMaxSpeed,
    precipitationIntensity = 0,
  } = interval.values;

  const {
    maxSpeed = defaultMaxSpeed,
    precipitationLimit = defaultPrecipitationLimit,
  } = config;

  if (
    windSpeed > maxSpeed ||
    windGust > (maxSpeed + percentageAllowed * maxSpeed)
  ) {
    return 'bad';
  } else if (precipitationIntensity >= precipitationLimit) {
    return 'average';
  } else {
    return 'good';
  }
}
