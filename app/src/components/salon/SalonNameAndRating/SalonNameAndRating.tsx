import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import { Box, Typography } from '@material-ui/core';

import { ISalon } from '../Salon';

const useStyles = makeStyles((theme) => ({
  rating: {
    color: theme.palette.primary.main,
    fontSize: 15,
    marginRight: theme.spacing(1),
  },
  heading: {
    marginBottom: theme.spacing(1),
  },
}));

interface IProps {
  salon: ISalon;
  className?: string;
}

const SalonNameAndRating: React.FC<IProps> = (props) => {
  const { salon, className } = props;
  const classes = useStyles();

  return (
    <div className={className || ''}>
      <Typography className={classes.heading} variant="h5">
        {salon.name}
      </Typography>
      <Box display="flex" alignItems="center">
        <Rating
          className={classes.rating}
          name="read-only"
          value={salon.rating}
          readOnly
        />
        <Typography variant="subtitle1">{`(${salon.votes})`}</Typography>
      </Box>
    </div>
  );
};

export default SalonNameAndRating;
