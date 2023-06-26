import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

test('Verifica se é exibida na tela a mensagem "No favorite pokemon found" caso nenhum pokemon tenha sido favoritado.', () => {
  renderWithRouter(<App />, { route: '/favorites' });
  const noFavoritePokemon = screen.getByText(/no favorite pokémon found/i);

  expect(noFavoritePokemon).toBeInTheDocument();
});

test('Verifica se existe pokemon na lista de favoritos.', async () => {
  renderWithRouter(<App />, { route: '/' });
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  expect(moreDetails).toBeInTheDocument();

  await userEvent.click(moreDetails);

  const pokeFav = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
  expect(pokeFav).toBeInTheDocument();

  await userEvent.click(pokeFav);
  expect(pokeFav).toBeChecked();

  const favorites = screen.getByRole('link', { name: 'Favorite Pokémon' });
  await userEvent.click(favorites);

  const favoritePokemon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favoritePokemon).toBeInTheDocument();

  // vc sempre será meu favorito charmander, mas o teste me obriga a usar o picachu </3
});

