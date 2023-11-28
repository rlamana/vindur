import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Interval } from './model/weather';
import { evaluateFlightConditions } from './evaluateFlightConditions';
import { selectConfiguration } from './state/conditionsSlice';

type ConditionBadgeProps = {
  interval: Interval;
};

const ConditionBadge: React.FC<ConditionBadgeProps> = ({ interval }) => {
  const configuration = useSelector(selectConfiguration);

  let color = '';
  let label = '';

  const flightCondition = evaluateFlightConditions(interval, configuration);

  switch (flightCondition) {
    case 'bad':
      color = 'red';
      label = 'Ni se te ocurra!';
      break;
    case 'good':
      color = 'green';
      label = 'A volar!!!'
      break;
    case 'average':
      color = 'orange';
      label = 'Regulinchis';
      break;
    default:
      color = 'black';
      break;
  }

  return (
    <Typography variant="h3" style={{
      color,
      fontWeight: 'bold',
    }}>
      {label}
    </Typography>
  );
};

export default ConditionBadge;
