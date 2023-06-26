import { render, screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<About />, { route: '/about' });
  const infos = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);

  expect(infos).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
  renderWithRouter(<About />, { route: '/about' });
  const infos = screen.getByRole('heading', { name: /About Pokédex/i });
  expect(infos).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  renderWithRouter(<About />, { route: '/about' });
  screen.debug();
  const paragraph1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
  const paragraph2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('teste se a página contém a imágem da pokédex', () => {
  renderWithRouter(<About />, { route: '/about' });
  screen.debug();
  const img = screen.getByRole('img', { name: /pokédex/i });

  expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
