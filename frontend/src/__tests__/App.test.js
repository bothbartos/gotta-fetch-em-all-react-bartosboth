import React from 'react';
import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import App from '../App';


describe('App', () => {
    it('renders App and fetches data', async () => {
        render(<App/>);

        expect(await screen.findByText(/Choose Location/i)).toBeInTheDocument();

        expect(await screen.findByText(/canalave-city/)).toBeInTheDocument();
    });
    it("navigates to select area, then see enemy pokemons", async () => {
        render(<App/>);

        expect(await screen.findByText(/canalave-city/)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/canalave-city/));

        await waitFor(() => {
            expect(screen.getByText(/canalave-city-area/)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/canalave-city-area/));

        await waitFor(() => {
            expect(screen.getByText(/Tentacool/i)).toBeInTheDocument();
        });
    });

    it("navigates to select area, select random enemy, then see player pokemons", async () => {
        render(<App/>);

        expect(await screen.findByText(/canalave-city/)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/canalave-city/));

        await waitFor(() => {
            expect(screen.getByText(/canalave-city-area/)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/canalave-city-area/));

        await waitFor(() => {
            expect(screen.getByText(/random enemy/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/random enemy/i));

        await waitFor(() => {
            expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
        });
    });

    it("navigates to select area, select random enemy, then select player pokemons", async () => {
        render(<App/>);

        expect(await screen.findByText(/canalave-city/)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/canalave-city/));

        await waitFor(() => {
            expect(screen.getByText(/canalave-city-area/)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/canalave-city-area/));

        await waitFor(() => {
            expect(screen.getByText(/Tentacool/i)).toBeInTheDocument();
        });
    });
})


