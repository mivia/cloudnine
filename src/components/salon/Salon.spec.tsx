import React from 'react';
import { Salon } from './Salon';
import renderer from 'react-test-renderer';
import { match } from 'react-router';
import { createMemoryHistory, createLocation } from 'history';

const path = `/route/:id`;

const getRouteComponentPropsMock = (salonId: string) => {
  const match: match<{ id: string }> = {
    isExact: false,
    path,
    url: path.replace(':id', '1'),
    params: { id: salonId },
  };

  return {
    history: createMemoryHistory(),
    location: createLocation(match.url),
    match,
  };
};

describe('<Salon/>', () => {
  it('renders Salon a salon when found', () => {
    const tree = renderer
      .create(<Salon {...getRouteComponentPropsMock('1')}></Salon>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nothing when a salon is not found', () => {
    const tree = renderer
      .create(<Salon {...getRouteComponentPropsMock('11')}></Salon>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
