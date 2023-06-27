import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

test('Verifica a renderização daa página NotFound', () => {
  renderWithRouter(<App />, { route: '/trem' });
  const notFound = screen.getByRole('heading', { name: /page requested not found/i });
  expect(notFound).toBeInTheDocument();

  const img = screen.getByRole('img', { name: /Pikachu crying because the page requested was not found/i });
  expect(img).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(img).toBeInTheDocument();
});
