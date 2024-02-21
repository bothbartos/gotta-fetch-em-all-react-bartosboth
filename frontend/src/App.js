import "./App.css";
import { useState, useEffect } from "react";
import ListElement from "./Components/ListElement";
import SelectPokemon from "./Components/SelectPokemon";


function App() {
  const [locations, setLocations] = useState(null);
  const [data, setData] = useState([]);
  const [isAreasShown, setIsAreasShown] = useState(false);
  const [areas, setAreas] = useState(null);
  const [isSecondArea, setIsSecondArea] = useState(false);

  useEffect(() => {
    async function fetchLocations() {
      const data = await fetchData("https://pokeapi.co/api/v2/location");
      setData(data.results);
      setLocations(data.results);
    }
    fetchLocations();
  }, []);

  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  function returnToHome() {
    setData(locations);
    setIsAreasShown(false);
    setAreas(null);
  }
  console.log(data);

  return (
    <div className="App">
      <button onClick={returnToHome}>Back</button>
      {!isSecondArea ? (
        <>
        {data.map((location) => (
          <ListElement
            areas={areas}
            text={location.name}
            key={location.name}
            url={location.url}
            setData={setData}
            isAreasShown={isAreasShown}
            setIsAreasShown={setIsAreasShown}
            setAreas={setAreas}
            setIsSecondArea={setIsSecondArea}
          ></ListElement>
        ))}
        </>
      ) : (
        <SelectPokemon area={areas}></SelectPokemon>
      )}
    </div>
  );
}

export default App;
