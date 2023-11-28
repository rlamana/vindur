import React from 'react';
import { ListItemIcon, CardContent, Card, Typography } from '@mui/material';
import { Interval } from './model/weather';
import AirIcon from '@mui/icons-material/Air';
import dayjs from 'dayjs';

import ConditionBadge from './ConditionBadge';

import styles from './NowCard.module.css';

interface NowCardProps {
  day: Interval;
}

const NowCard: React.FC<NowCardProps> = ({ day }) => {
  return (
    <Card className={styles.NowCard}>
      <CardContent>
        <ListItemIcon>
          <AirIcon />
        </ListItemIcon>
        <Typography variant="h6">
          {dayjs(day.startTime).format('dddd')}
        </Typography>
        <ConditionBadge interval={day} />
        <Typography variant="body2">
          {dayjs(day.startTime).format('MMMM D, YYYY')}
        </Typography>
        <Typography>
          Wind Speed: {day.values.windSpeed} m/s | Wind Direction:{' '}
          {day.values.windDirection}° | Wind Gust: {day.values.windGust} m/s
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NowCard;
