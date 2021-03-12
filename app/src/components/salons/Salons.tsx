import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { Link } from 'react-router-dom';

import data from '../../data/salons.json';
import LeftArrowIcon from '../../assets/left-arrow.svg';
import FilterIcon from '../../assets/filter.svg';
import RightArrowIcon from '../../assets/right-arrow.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  select: {
    width: '100%',
  },
  header: {
    backgroundColor: 'white',
    boxShadow: 'none',
    '& > div': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 0,
    },
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
}));

export interface ISalon {
  id: number;
  name: string;
  rating: number;
  votes: number;
  price: number;
  address: string;
  topLeftNumber: number;
  duration: number;
}

interface IPriceRange {
  id: string;
  start: number;
  end: number;
}

const PRICE_RANGES: IPriceRange[] = [
  {
    id: '1',
    start: 0,
    end: 250,
  },
  {
    id: '2',
    start: 250,
    end: 500,
  },
  {
    id: '3',
    start: 500,
    end: 750,
  },
];

export const Salons: React.FC = () => {
  const classes = useStyles();
  const [priceRange, setPriceRange] = useState<string>(PRICE_RANGES[1].id);
  const [salons, setSalons] = useState(data.salons);

  const handlePriceRangeChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ): void => {
    const {
      target: { value },
    } = event;
    let filteredSalons = data.salons;
    setPriceRange(value as string);

    const chosenPriceRange = PRICE_RANGES.find(
      (priceRange) => priceRange.id === value,
    );

    if (chosenPriceRange) {
      filteredSalons = data.salons.filter(
        (salon) =>
          salon.price >= chosenPriceRange.start &&
          salon.price < chosenPriceRange.end,
      );
    }

    setSalons(filteredSalons);
  };

  return (
    <Grid container direction="column">
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton aria-label="back">
            <img src={LeftArrowIcon} alt="back" />
          </IconButton>
          <Typography variant="h5">Har</Typography>
          <IconButton aria-label="filter">
            <img src={FilterIcon} alt="filter" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid item xs={12}>
        <FormControl className={classes.select}>
          <Select
            labelId="price-select"
            id="demo-simple-select"
            value={priceRange}
            onChange={handlePriceRangeChange}
          >
            {PRICE_RANGES.map((priceRange) => (
              <MenuItem key={priceRange.id} value={priceRange.id}>
                {`Pris ${priceRange.start} - ${priceRange.end} kr`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <List component="nav" aria-label="secondary mailbox folders">
          {salons.map((salon: ISalon) => (
            <>
              <ListItem
                button
                component={Link}
                to={`/salon/${salon.id}`}
                key={salon.id}
              >
                <Grid container>
                  <Grid item xs={2}>
                    <Typography>{salon.topLeftNumber.toFixed(2)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{salon.name}</Typography>
                    <Box display="flex">
                      <Rating name="read-only" value={salon.rating} readOnly />
                      <Typography>{`(${salon.votes})`}</Typography>
                    </Box>
                    <span>{salon.address}</span>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{`${salon.price} kr`}</Typography>
                    <Typography>{`${salon.duration} min`}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton aria-label="detail-view">
                      <img src={RightArrowIcon} alt="detail-view-button" />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
