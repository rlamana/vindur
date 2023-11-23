
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

interface WeatherData {
  data: {
    timelines: {
      intervals: {
        startTime: string;
        values: {
          windSpeed: number;
          windDirection: number;
        };
      }[];
    }[];
  };
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const API_KEY = 'Cldy6unrJiv47zNSnnkhvi9PP2R403uY';

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
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
        const response = await fetch(
          `https://api.tomorrow.io/v4/timelines?location=${location.latitude},${location.longitude}&fields=windSpeed,windDirection&apikey=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [API_KEY, location]);
console.log(weatherData);
  const timeline = weatherData ? weatherData.data.timelines[0] : null;
  return (
    <div>
      <Typography variant="h4">7-Day Wind Conditions</Typography>
      {timeline ? (
        <List>
          <React.Fragment>
            {timeline.intervals.map((interval) => (
              <ListItem key={interval.startTime}>
                <ListItemText
                  primary={`Date: ${new Date(interval.startTime).toLocaleDateString()}`}
                  secondary={`Wind Speed: ${interval.values.windSpeed} m/s | Wind Direction: ${interval.values.windDirection}°`}
                />
              </ListItem>
            ))}
          </React.Fragment>
        </List>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};

export default App;
