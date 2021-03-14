import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';

import {
  List,
  ListItem,
  Grid,
  Divider,
  Typography,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';

import data from '../../data/salons.json';
import smallImage from '../../assets/images/image.png';
import mediumImage from '../../assets/images/image@2x.png';
import largeImage from '../../assets/images/image@3x.png';
import PinIcon from '../../assets/icons/pin.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import PhoneIcon from '../../assets/icons/phone.svg';
import GlobeIcon from '../../assets/icons/globe.svg';
import DownArrowIcon from '../../assets/icons/down-arrow.svg';

import LeftArrowIcon from '../../assets/icons/left-arrow-white.svg';
import HeartIcon from '../../assets/icons/heart.svg';

import SalonNameAndRating from './SalonNameAndRating/SalonNameAndRating';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    height: '40vh',
    color: 'white',
    display: 'flex',
    position: 'relative',
    background: 'linear-gradient(to bottom, transparent 50%, black 100%)',
  },
  nameAndRatingContainer: {
    position: 'absolute',
    left: 15,
    bottom: 30,
    '& h5': {
      fontSize: 22,
    },
    '& h6': {
      color: 'white',
    },
    '& span': {
      fontSize: 20,
    },
  },
  img: {
    width: '100%',
    objectFit: 'cover',
    zIndex: -1,
  },
  tabs: {
    '& span': {
      fontSize: 15,
      color: 'black',
      textTransform: 'capitalize',
    },
    '& button': {
      maxWidth: 'none',
      flex: '50%',
    },
  },
  dividerBox: {
    height: 25,
    backgroundColor: '#f9f9f9',
  },
  infoList: {
    '& li': {
      padding: '14px 15px',
    },
    '& img': {
      marginRight: theme.spacing(2),
    },
    '& hr': {
      width: 'calc(100% - 30px)',
    },
  },
  arrowIcon: {
    marginLeft: theme.spacing(2),
  },
  backIcon: {
    position: 'absolute',
    left: 15,
  },
  heartIcon: {
    position: 'absolute',
    right: 15,
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

type Props = RouteComponentProps<{
  id: string;
}>;

export const Salon: React.FC<Props> = (props) => {
  const {
    match: {
      params: { id: salonId },
    },
  } = props;

  const classes = useStyles();
  const history = useHistory();

  const salonToDisplay = data.salons.find(
    (salon) => salon.id === Number(salonId),
  );

  return (
    <>
      {salonToDisplay && (
        <Grid container direction="column">
          <Grid item className={classes.imageContainer}>
            <img
              className={classes.img}
              srcSet={`${smallImage} 375w,
              ${mediumImage} 750w,
              ${largeImage} 1125w`}
              sizes="(max-width: 600px) 375px, 
              100vw 
            "
            />
            <SalonNameAndRating
              className={classes.nameAndRatingContainer}
              salon={salonToDisplay}
            />
            <IconButton
              onClick={() => history.goBack()}
              aria-label="back"
              className={classes.backIcon}
            >
              <img src={LeftArrowIcon} alt="back" />
            </IconButton>
            <IconButton aria-label="heart-icon" className={classes.heartIcon}>
              <img src={HeartIcon} alt="like-icon" />
            </IconButton>
          </Grid>
          <Grid item>
            <Paper square>
              <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                aria-label="salon tabs"
                className={classes.tabs}
              >
                <Tab label="Info" />
                <Tab label="Schema" disabled />
              </Tabs>
            </Paper>
          </Grid>
          <Box className={classes.dividerBox} />
          <Grid item>
            <List className={classes.infoList} aria-label="salon-info-list">
              <ListItem>
                <img src={PinIcon} alt="pin-icon" />
                <Typography>Rådmansgatan 46, 113 57 Stockholm</Typography>
              </ListItem>
              <Box justifyContent="center" display="flex">
                <Divider light />
              </Box>
              <ListItem>
                <img src={ClockIcon} alt="clock-icon" />
                <Typography>Öppet till 19:00 idag</Typography>
                <img
                  src={DownArrowIcon}
                  alt="down-arrow-icon"
                  className={classes.arrowIcon}
                />
              </ListItem>
              <Box justifyContent="center" display="flex">
                <Divider light />
              </Box>
              <ListItem>
                <img src={PhoneIcon} alt="phone-icon" />
                <Typography>08-522 389 20</Typography>
              </ListItem>
              <Box justifyContent="center" display="flex">
                <Divider light />
              </Box>
              <ListItem>
                <img src={GlobeIcon} alt="globe-icon" />
                <Typography>www.salongweb.se</Typography>
              </ListItem>
              <Box justifyContent="center" display="flex">
                <Divider light />
              </Box>
              <ListItem>
                <Typography>
                  Lorem ipsum dolor sit amet, vulputate nunc. Auctor viverra.
                  Ridiculus feugiat nunc porttitor volut pat, acu quis torquent
                  iaculis ultricies massa, duis nun quis que amet.
                </Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </>
  );
};
