import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import { Interval } from './model/weather';
import { evaluateFlightConditions } from './evaluateFlightConditions';
import { selectConfiguration } from './state/conditionsSlice';
import {
  DangerousRounded,
  RecommendRounded,
  WarningRounded,
} from '@mui/icons-material';

type ConditionBadgeProps = {
  interval: Interval;
  withLabel?: boolean;
  size?: string;
};

const ConditionBadge: React.FC<ConditionBadgeProps> = ({
  interval,
  withLabel = false,
  size = '24px',
}) => {
  const configuration = useSelector(selectConfiguration);

  let color = '';
  let label = '';
  let icon = null;

  const flightCondition = evaluateFlightConditions(interval, configuration);

  switch (flightCondition) {
    case 'bad':
      color = 'red';
      label = 'Ni se te ocurra!';
      icon = <DangerousRounded fontSize="inherit" />;
      break;
    case 'good':
      color = 'green';
      label = 'A volar!!!';
      icon = <RecommendRounded fontSize="inherit" />;
      break;
    case 'average':
      color = 'orange';
      label = 'Regulinchis';
      icon = <WarningRounded fontSize="inherit" />;
      break;
    default:
      color = 'black';
      break;
  }

  return (
    <>
      <Box sx={{ color, display: 'flex', fontSize: size }}>{icon}</Box>
      {withLabel && (
        <Typography
          variant="h3"
          style={{
            color,
            fontWeight: 'bold',
          }}
        >
          {label}
        </Typography>
      )}
    </>
  );
};

export default ConditionBadge;
