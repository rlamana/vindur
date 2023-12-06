import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  Box,
  Divider,
  LinearProgress,
  Drawer,
  IconButton,
} from '@mui/material';
import { Settings } from '@mui/icons-material';

import { Timeline, WeatherResponse } from './model/weather';
import DayCard from './DayCard';
import NowCard from './NowCard';
import WindGraph from './WindGraph';

import fixtures from './fixtures/weather.json';
import Configuration from './Configuration';

const USE_FIXTURES_FOR_DEV = import.meta.env.MODE === 'development';

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
  endTimeDate.setDate(now.getDate() + 5);
  const endTime = endTimeDate.toISOString();

  const url = new URL(timelineBaseURL);
  url.searchParams.set(
    'location',
    `${location.latitude},${location.longitude}`
  );
  url.searchParams.set('fields', fields.join(','));
  url.searchParams.set('units', units);
  url.searchParams.set('timesteps', timesteps.join(','));
  url.searchParams.set('startTime', startTime);
  url.searchParams.set('endTime', endTime);
  url.searchParams.set('apikey', timelineApiKey);

  return decodeURIComponent(url.toString());
};

const Dashboard: React.FC = () => {
  const [nowInfo, setNowInfo] = useState<Timeline | null>(null);
  const [todayInfo, setTodayInfo] = useState<Timeline | null>(null);
  const [weekInfo, setWeekInfo] = useState<Timeline | null>(null);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  const [showDrawer, setShowDrawer] = useState(false);

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
        let weatherResponse: WeatherResponse;
        if (USE_FIXTURES_FOR_DEV) {
          weatherResponse = fixtures;
        } else {
          const response = await fetch(getWeatherQuery(location));
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          weatherResponse = await response.json();
        }
        const now =
          weatherResponse.data?.timelines.find(
            (timeline) => timeline.timestep === 'current'
          ) ?? null;
        const today =
          weatherResponse.data?.timelines.find(
            (timeline) => timeline.timestep === '1h'
          ) ?? null;
        const week =
          weatherResponse.data?.timelines.find(
            (timeline) => timeline.timestep === '1d'
          ) ?? null;
        setNowInfo(now);
        setTodayInfo(today);
        setWeekInfo(week);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'auto',
        height: '100%',
        flex: 1,
        pb: 4
      }}
    >
      {nowInfo && todayInfo && weekInfo ? (
        <Box
          sx={{
            p: 4,
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ textAlign: 'right' }}>
              🛸 Flying Saucer
            </Typography>
            <IconButton onClick={() => setShowDrawer(!showDrawer)}>
              <Settings />
            </IconButton>
            <Drawer
              anchor="right"
              open={showDrawer}
              onClose={() => setShowDrawer(false)}
            >
              <Configuration />
            </Drawer>
          </Box>
          <Typography variant="h5">Now</Typography>

          <NowCard day={nowInfo.intervals[0]} />

          <List>
            <WindGraph intervals={todayInfo.intervals} />
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5">Week</Typography>
          <List>
            {weekInfo.intervals.map((day, dayIndex) => (
              <DayCard key={`day-${dayIndex}`} day={day} />
            ))}
          </List>
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

export default Dashboard;
