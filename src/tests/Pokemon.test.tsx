import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
  renderWithRouter(<App />, { route: '/' });

  const renderPokemonName = screen.getByTestId('pokemon-name');
  const renderPokemonType = screen.getByTestId('pokemon-type');
  const renderPokemonWeight = screen.getByTestId('pokemon-weight');

  expect(renderPokemonName).toBeInTheDocument();
  expect(renderPokemonName.innerHTML).toBe('Pikachu');

  expect(renderPokemonType).toBeInTheDocument();
  expect(renderPokemonType.innerHTML).toBe('Electric');

  expect(renderPokemonWeight).toBeInTheDocument();
  expect(renderPokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
});

test('testando as imagens', () => {
  renderWithRouter(<App />, { route: '/' });

  const imageRender = screen.getByRole('img', { name: /Pikachu sprite/i }) as HTMLImageElement;
  expect(imageRender).toBeInTheDocument();

  expect(imageRender.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
});

test('Verificasões de pokemon favorito', async () => {
  renderWithRouter(<App />, { route: '/' });

  const moreDetails = screen.getByRole('link', { name: 'More details' });
  expect(moreDetails).toBeInTheDocument();

  await userEvent.click(moreDetails);

  const checkboxFav = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

  await userEvent.click(checkboxFav);

  const favIcon = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });

  expect(favIcon).toBeInTheDocument();
});
