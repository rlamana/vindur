import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Interval } from './model/weather';
import { evaluateFlightConditions } from './evaluateFlightConditions';
import { selectConfiguration } from './state/conditionsSlice';
import {
  CheckCircleRounded,
  DangerousRounded,
  WarningRounded,
} from '@mui/icons-material';

type ConditionBadgeProps = {
  interval: Interval;
  withLabel?: boolean;
  size?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
};

const ConditionBadge: React.FC<ConditionBadgeProps> = ({
  interval,
  withLabel = false,
  size = 'medium',
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
      icon = <DangerousRounded fontSize={size} />;
      break;
    case 'good':
      color = 'green';
      label = 'A volar!!!';
      icon = <CheckCircleRounded fontSize={size} />;
      break;
    case 'average':
      color = 'orange';
      label = 'Regulinchis';
      icon = <WarningRounded fontSize={size} />;
      break;
    default:
      color = 'black';
      break;
  }

  return (
    <>
      <span style={{ color }}>{icon}</span>
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
