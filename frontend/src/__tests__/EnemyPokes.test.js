import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnemyPokes from '../Components/EnemyPokes'; // Adjust the import path as needed

describe('EnemyPokes', () => {
    it('calls setEnemy and setEnemySelected on click', () => {

        const setEnemy = jest.fn();
        const setEnemySelected = jest.fn();

        const pokemon = {
            name: 'Pikachu',
            sprites: {
                front_default: 'https://example.com/pikachu.png',
            },
        };

        render(
            <EnemyPokes
                pokemon={pokemon}
                setEnemy={setEnemy}
                setEnemySelected={setEnemySelected}
            />
        );

        const pokeDiv = screen.getByTestId('enemy-poke');

        fireEvent.click(pokeDiv);

        expect(setEnemy).toHaveBeenCalledWith(pokemon);

        expect(setEnemySelected).toHaveBeenCalledWith(true);
    });
});
