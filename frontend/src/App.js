import './App.css';
import { useState, useEffect } from 'react';
import RenderFight from './Components/RenderFight';

function App() {

  const testPoke = 'https://pokeapi.co/api/v2/pokemon/ditto'

  return (
    <div className="App">

      <RenderFight usersPokeUrl = {testPoke} enemyPokeUrl = {testPoke}/>
      
    </div>
  );
}

export default App;
