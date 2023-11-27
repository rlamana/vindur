// src/App.tsx
import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItemIcon,
  CardContent,
  Card,
} from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import styles from './App.module.css';
import fixtures from './fixtures/weather.json';

const USE_FIXTURES_FOR_DEV = true;

// Type for the response from the API
interface WeatherDataContents {
  timelines: {
    intervals: {
      startTime: string;
      values: {
        windSpeed: number;
        windDirection: number;
        totalPrecipitationAccumulation: number;
      };
    }[];
  }[];
}

// Type for the contents of the "data" property in ApiResponse
interface ApiResponse {
  data?: WeatherDataContents;
}

// Combined type for WeatherData
interface WeatherData extends ApiResponse {}

const timelineApiKey = 'Cldy6unrJiv47zNSnnkhvi9PP2R403uY';

const getWeatherQuery = (location: GeolocationCoordinates) => {
  const timelineBaseURL = 'https://api.tomorrow.io/v4/timelines';
  const fields = [
    'precipitationIntensity',
    'precipitationType',
    'windSpeed',
    'windGust',
    'windDirection',
    'temperature',
    'temperatureApparent',
    'cloudCover',
    'cloudBase',
    'cloudCeiling',
    'weatherCode',
  ];
  const units = 'metric';
  const timesteps = ['current', '1h', '1d'];

  // Configure the time frame up to 6 hours back and 15 days out
  const now = new Date();
  const startTime = now.toISOString();
  const endTimeDate = new Date(now);
  endTimeDate.setDate(now.getDate() + 1);
  const endTime = endTimeDate.toISOString();

  const url = new URL(timelineBaseURL);
  url.searchParams.set(
    'location',
    `${location.latitude},${location.longitude}`,
  );
  url.searchParams.set('fields', fields.join(','));
  url.searchParams.set('units', units);
  url.searchParams.set('timesteps', timesteps.join(','));
  url.searchParams.set('startTime', startTime);
  url.searchParams.set('endTime', endTime);
  url.searchParams.set('apikey', timelineApiKey);

  return decodeURIComponent(url.toString());
};

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!location) {
        return;
      }

      try {
        let data: ApiResponse;
        if (USE_FIXTURES_FOR_DEV) {
          data = fixtures;
        } else {
          const response = await fetch(getWeatherQuery(location));
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          data = await response.json();
        }
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <div className={styles.container}>
      <Typography variant="h4">7-Day Flying Conditions</Typography>
      {weatherData.data?.timelines ? (
        <List>
          {weatherData.data.timelines.map((timeline, index) => (
            <Card key={index} className={styles.listItem}>
              <CardContent>
                <ListItemIcon>
                  <AirIcon />
                </ListItemIcon>
                <Typography variant="h6">
                  Date:{' '}
                  {new Date(
                    timeline.intervals[0].startTime,
                  ).toLocaleDateString()}
                </Typography>
                <Typography>
                  Wind Speed: {timeline.intervals[0].values.windSpeed} m/s |
                  Wind Direction: {timeline.intervals[0].values.windDirection}°
                </Typography>
              </CardContent>
            </Card>
          ))}
        </List>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};

export default App;
