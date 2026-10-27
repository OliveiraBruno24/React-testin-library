# Testes de uma Pokédex com React Testing Library

Projeto focado em **escrever testes** para uma Pokédex em React já pronta: navegação, filtros por tipo, detalhes, favoritos e página 404.

> Projeto desenvolvido durante o curso de Desenvolvimento Web da [Trybe](https://www.betrybe.com/) (2023).

## O que foi feito

- Testes de cada página e componente em `src/tests/` (App, Pokedex, Pokemon, PokemonDetails, FavoritePokemon, About, NotFound)
- Testes de navegação com React Router (helper `renderWithRouter`)
- Testes de mutação com Stryker para verificar a qualidade da suíte

## Stack

React 18 · TypeScript · React Router · Vitest · React Testing Library · Stryker

## Como rodar

```bash
npm install
npm run dev
```

Testes:

```bash
npm test
```
