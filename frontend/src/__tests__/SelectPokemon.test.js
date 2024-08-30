import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectPokemon from '../Components/SelectPokemon';

jest.mock('../Components/EnemyPokes');

test('renders random enemy button and list of enemy pokemons', () => {
    const mockArea = {
        pokemon_encounters: [
            { pokemon: { name: 'Bulbasaur' } },
            { pokemon: { name: 'Charmander' } },
        ],
    };

    render(<SelectPokemon area={mockArea} />);

    const randomEnemyButton = screen.getByText('Random Enemy');
    expect(randomEnemyButton).toBeInTheDocument();

    const enemyList = screen.getByRole('list');
    expect(enemyList).toBeInTheDocument();
});