import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import Pokedex from '../pages/Pokedex';

describe('Verifique as renderizações da página Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<App />, { route: '/' });
    const pageTitle = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(pageTitle).toBeInTheDocument();
  });
});

describe('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado.', () => {
  test('O botão deve conter o texto Próximo Pokémon', async () => {
    renderWithRouter(<App />, { route: '/' });

    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();
  });

  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
    renderWithRouter(<App />, { route: '/' });

    await Promise.all(pokemonList.map(async (pokemon) => {
      const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });

      userEvent.click(nextPokemonBtn);

      await waitFor(() => screen.findByText(pokemon.name));
    }));
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  test('um novo Pokémom foi renderizado', async () => {
    renderWithRouter(<Pokedex pokemonList={ pokemonList } favoritePokemonIdsObj={ {} } />, { route: '/' });

    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    expect(nextPokemonBtn).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);

    // const pokemonCard = pokemonList;

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe(pokemonList[0].name);

    // expect(pokemonCard.length).toBe(1);
  });
});

// for (let i = 0; i < pokemonList.length - 1; i++) {
//   const pokemonName = screen.getByTestId('pokemon-name');
//   expect(pokemonName.textContent).toBe(pokemonList[i].name);

//   fireEvent.click(nextPokemonBtn);
//   await waitFor(() => {
//     expect(screen.getByTestId('pokemon-name').textContent).toBe(pokemonList[i + 1].name);
//   });
// }

test('Teste se a Pokédex tem os botões de filtro.', () => {
  renderWithRouter(<App />, { route: '/' });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />, { route: '/' });

    const pokemonClass = screen.getAllByTestId('pokemon-type-button');

    expect(pokemonClass.length).toBe(7);
    expect(pokemonClass[0].textContent).toBe('Electric');
    expect(pokemonClass[1].textContent).toBe('Fire');
    expect(pokemonClass[2].textContent).toBe('Bug');
    expect(pokemonClass[3].textContent).toBe('Poison');
    expect(pokemonClass[4].textContent).toBe('Psychic');
    expect(pokemonClass[5].textContent).toBe('Normal');
    expect(pokemonClass[6].textContent).toBe('Dragon');
  });
});

test('Verifica se o botão Eletric está funcionando corretamente', async () => {
  renderWithRouter(<App />, { route: '/' });

  screen.debug();
  const pokemonClass = screen.getByRole('button', { name: /Electric/i });
  const nextPokemonBtn = screen.getByRole('button', { name: /Próximo Pokémon/i });

  const pokeFilter = pokemonList.filter((pokemon) => (
    pokemon.type === pokemonClass.textContent
  ));

  expect(pokeFilter.length).toBe(1);
  await userEvent.click(pokemonClass);

  expect(nextPokemonBtn).toBeDisabled();

  expect(screen.getByText(pokeFilter[0].name).textContent).toBe(pokeFilter[0].name);
});

test('Verifica se o botão Fire está funcionando corretamente', async () => {
  renderWithRouter(<App />, { route: '/' });

  screen.debug();
  const pokemonClass = screen.getByRole('button', { name: /Fire/i });

  const pokeFilter = pokemonList.filter((pokemon) => (
    pokemon.type === pokemonClass.textContent
  ));

  expect(pokeFilter.length).toBe(2);
  await userEvent.click(pokemonClass);

  expect(screen.getByText(pokeFilter[0].name).textContent).toBe(pokeFilter[0].name);
});
test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
  renderWithRouter(<Pokedex pokemonList={ pokemonList } favoritePokemonIdsObj={ {} } />);

  const electricButton = screen.getByRole('button', { name: /Electric/i });
  fireEvent.click(electricButton);

  let currentPokemonName = screen.getByTestId('pokemon-name').textContent;

  const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });

  let nextPokemonName;

  do {
    fireEvent.click(nextButton);
    nextPokemonName = screen.getByTestId('pokemon-name').textContent;

    expect(screen.getAllByText('Electric')[0]).toBeInTheDocument();
    currentPokemonName = nextPokemonName;
  } while (nextPokemonName !== currentPokemonName);
});

test('Verifique se existe um elemento com o datatest-id "pokemon-type-button" ', () => {
  renderWithRouter(<Pokedex pokemonList={ pokemonList } favoritePokemonIdsObj={ {} } />);

  const buttonExist = screen.getAllByTestId('pokemon-type-button');
  expect(buttonExist[0]).toBeInTheDocument();
});

test('Testa se o botão All esta sendo renderizado na tela', () => {
  renderWithRouter(<Pokedex pokemonList={ pokemonList } favoritePokemonIdsObj={ {} } />);

  const allBtn = screen.getByRole('button', { name: /all/i });
  expect(allBtn).toBeInTheDocument();
  fireEvent.click(allBtn);
  expect(allBtn).toContain(/all/i);
});

test('Verifica se o botão All funciona corretamente', () => {
  renderWithRouter(<Pokedex pokemonList={ pokemonList } favoritePokemonIdsObj={ {} } />);

  fireEvent.click(screen.getByRole('button', { name: /fire/i }));
  const fireBtn = screen.getByRole('button', { name: /fire/i });
  expect(fireBtn).toBeInTheDocument();

  const renderFire = screen.getByText(/Charmander/i);
  expect(renderFire).toBeInTheDocument();

  const allBtn = screen.getByRole('button', { name: /all/i });
  expect(allBtn).toBeInTheDocument();
  fireEvent.click(allBtn);

  const renderAllPokemon = screen.getByText(/Pikachu/i);
  expect(renderAllPokemon).toBeInTheDocument();

  const nextPokemonBtn = screen.getByRole('button', { name: /Próximo Pokémon/i });
  fireEvent.click(nextPokemonBtn);

  expect(screen.getByText(/Charmander/i));
  fireEvent.click(nextPokemonBtn);

  expect(screen.getByText(/Caterpie/i));
});
