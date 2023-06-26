import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  test('Verifica se o link de naveção "Home" está na tela', () => {
    renderWithRouter(<App />, { route: '/' });
    const homeElement = screen.getByText(/Home/i);
    expect(homeElement).toBeInTheDocument();
  });

  test('Verifica se o link de naveção "About" está na tela', () => {
    renderWithRouter(<App />, { route: '/' });
    const aboutElement = screen.getByText(/About/i);
    expect(aboutElement).toBeInTheDocument();
  });

  test('Verifica se o link de naveção "Favorite Pokémon" está na tela', () => {
    renderWithRouter(<App />, { route: '/' });
    const favElement = screen.getByText(/Favorite Pokémon/i);
    expect(favElement).toBeInTheDocument();
  });
});

describe('Testes de funcionalidade dos links de navegação', () => {
  test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.', async () => {
    renderWithRouter(<App />, { route: '/' });
    const homeElement = await screen.findByRole('link', { name: /home/i });
    await userEvent.click(homeElement);
    const findBtn = screen.getByRole('button', { name: /all/i });
    expect(findBtn).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
    renderWithRouter(<App />, { route: '/' });
    const aboutElement = await screen.findByRole('link', { name: /about/i });
    await userEvent.click(aboutElement);
    const AboutPageTitle = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(AboutPageTitle).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
    renderWithRouter(<App />, { route: '/' });
    const aboutElement = await screen.findByRole('link', { name: /Favorite Pokémon/i });
    await userEvent.click(aboutElement);
    const favPageTitle = screen.getByRole('heading', { name: /Favorite Pokémon/i });
    expect(favPageTitle).toBeInTheDocument();
  });
});
