import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectOwnPokemon from '../Components/SelectOwnPokemon';

test('renders a list of user pokemons', () => {
    const mockPokemons = [
        { name: 'Bulbasaur',
            sprites: {
                front_default: 'https://example.com/pikachu.png',
            }
        },
        { name: 'Charmander',
            sprites: {
                front_default: 'https://example.com/charmander.png',
            }
        }
    ];

    render(<SelectOwnPokemon userPokemons={mockPokemons} />);

    const pokemonList = screen.getByRole('list');
    expect(pokemonList).toBeInTheDocument();

    const pokemonItem = screen.getByText('Bulbasaur');
    expect(pokemonItem).toBeInTheDocument();
});