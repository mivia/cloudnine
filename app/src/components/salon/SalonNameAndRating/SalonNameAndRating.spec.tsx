import React from 'react';
import SalonNameAndRating from './SalonNameAndRating';
import renderer from 'react-test-renderer';

it('renders SalonAndNameRating correctly', () => {
  const testSalon = {
    id: 1,
    price: 200,
    address: 'testAddress',
    duration: 10,
    topLeftNumber: 1,
    name: 'testSalon',
    rating: 20,
    votes: 15,
  };

  const tree = renderer
    .create(<SalonNameAndRating salon={testSalon}></SalonNameAndRating>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
