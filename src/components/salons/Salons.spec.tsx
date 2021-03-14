import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Salons } from './Salons';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../styles';
import { BrowserRouter as Router } from 'react-router-dom';

import mediaQuery from 'css-mediaquery';

function createMatchMedia(width: number) {
  return (query: any) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => null,
    removeListener: () => null,
    media: 'null',
    onchange: () => null,
    addEventListener: () => null,
    removeEventListener: () => null,
    dispatchEvent: () => true,
  });
}

describe('MyTests', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  it('renders list of filtered salons correctly', async () => {
    const priceRangeId = '2';

    render(
      <ThemeProvider theme={theme}>
        <Router>
          <Salons />
        </Router>
      </ThemeProvider>,
    );

    fireEvent.change(screen.getByTestId('select-price-range'), {
      target: { value: priceRangeId },
    });

    expect(screen.getByText('salon 2')).toBeInTheDocument();
    expect(screen.getByText('salon 4')).toBeInTheDocument();
  });
});
