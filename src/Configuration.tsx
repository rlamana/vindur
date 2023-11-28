import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { setConfiguration, selectConfiguration } from './state/conditionsSlice';

const Configuration: React.FC = () => {
  const dispatch = useDispatch();
  const configuration = useSelector(selectConfiguration);

  const handleSliderChange = (name: string) => (_: Event, newValue: number | number[]) => {
    dispatch(setConfiguration({ ...configuration, [name]: newValue as number }));
  };

  return (
    <Box p={2}>
      <Typography variant="h5">Flight Conditions Evaluation</Typography>

      <Box mb={3}>
        <Typography gutterBottom>Max Speed: {configuration.maxSpeed}</Typography>
        <Slider
          value={configuration.maxSpeed}
          onChange={handleSliderChange('maxSpeed')}
          step={1}
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box mb={3}>
        <Typography gutterBottom>Precipitation Limit: {configuration.precipitationLimit}</Typography>
        <Slider
          value={configuration.precipitationLimit}
          onChange={handleSliderChange('precipitationLimit')}
          step={1}
          min={0}
          max={10}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}

export default Configuration;