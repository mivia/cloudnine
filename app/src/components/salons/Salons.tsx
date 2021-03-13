import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

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
  useMediaQuery,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { Link } from 'react-router-dom';

import data from '../../data/salons.json';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import DownArrowIcon from '../../assets/icons/down-arrow.svg';

import SalonNameAndRating from '../salon/SalonNameAndRating';

import { ISalon } from '../salon/Salon';
import { mockComponent } from 'react-dom/test-utils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    '& hr': {
      width: 'calc(100% - 30px)',
    },
  },
  select: {
    width: '100%',
    fontSize: 15,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    '& > div': {
      height: 50,
      '& > div': {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      },
    },
  },
  header: {
    backgroundColor: 'white',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
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
  detailButton: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
    },
  },
  selectIcon: {
    position: 'absolute',
    right: 16,
  },
  rating: {
    color: theme.palette.primary.main,
  },
  topLeftNumberContainer: {
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'flex-end',
    },
  },
  nameAndRatingContainer: {
    marginBottom: theme.spacing(1),
  },
  duration: {
    marginTop: theme.spacing(1),
  },
}));

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

const SEE_ALL_OPTION = 'SEE_ALL';

export const Salons: React.FC = () => {
  const classes = useStyles();
  const [priceRange, setPriceRange] = useState<string>(PRICE_RANGES[1].id);
  const [salons, setSalons] = useState(data.salons);
  const largeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm'),
  );

  const handlePriceRangeChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ): void => {
    const {
      target: { value },
    } = event;
    let filteredSalons = data.salons;

    if (value === SEE_ALL_OPTION) {
      setSalons(data.salons);
      return;
    }

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
          <Typography variant="h5">Hår</Typography>
          <IconButton aria-label="filter">
            <img src={FilterIcon} alt="filter" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid item xs={12}>
        <FormControl className={classes.select}>
          <Select
            IconComponent={() => (
              <img
                className={classes.selectIcon}
                src={DownArrowIcon}
                alt="select"
              />
            )}
            disableUnderline
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
            <MenuItem value={SEE_ALL_OPTION}>See all</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <List className={classes.list} aria-label="secondary mailbox folders">
          {salons.map((salon: ISalon) => (
            <>
              <ListItem
                button
                component={Link}
                to={`/salon/${salon.id}`}
                key={salon.id}
              >
                <Grid container direction={largeScreen ? 'row' : 'column'}>
                  <Grid item xs={2} className={classes.topLeftNumberContainer}>
                    <Typography>{salon.topLeftNumber.toFixed(2)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <SalonNameAndRating
                      salon={salon}
                      className={classes.nameAndRatingContainer}
                    />
                    <Typography variant="subtitle1">{salon.address}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{`${salon.price} kr`}</Typography>
                    <Typography
                      className={classes.duration}
                      variant="subtitle2"
                    >
                      {`${salon.duration} min`}
                    </Typography>
                  </Grid>
                  <Grid
                    className={classes.detailButton}
                    item
                    xs={1}
                    alignItems="center"
                  >
                    <IconButton aria-label="detail-view">
                      <img src={RightArrowIcon} alt="detail-view-button" />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
              <Box justifyContent="center" display="flex">
                <Divider light />
              </Box>
            </>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
