import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { setConfiguration, selectConfiguration } from './state/conditionsSlice';
import { Divider } from '@mui/material';

const Configuration: React.FC = () => {
  const dispatch = useDispatch();
  const configuration = useSelector(selectConfiguration);

  const handleSliderChange = (name: string) => (_: Event, newValue: number | number[]) => {
    dispatch(setConfiguration({ ...configuration, [name]: newValue as number }));
  };

  return (
    <Box sx={{
      p: 4,
      overflow: 'auto',
      height: '100vh'
    }}>
      <Typography variant="h6">Conditions Configurator</Typography>
      <Divider sx={{ my: 2 }} />
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