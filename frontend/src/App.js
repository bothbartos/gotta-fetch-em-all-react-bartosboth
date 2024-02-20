import "./App.css";
import { useState, useEffect } from "react";
import ListElement from "./Components/ListElement";

function App() {
  const [locations, setLocations] = useState(null);
  const [data, setData] = useState(false);
  const [isAreasShown, setIsAreasShown] = useState(false);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://pokeapi.co/api/v2/location");
      const data = await response.json();
      setLocations(data.results);
      setData(data.results);
    }
    fetchData();
  }, []);

  function returnToHome() {
    setData(locations);
    setIsAreasShown(false);
    setAreas(null);
  }
  function showAreas(){
    console.log(areas);
  }

  return (
    <div className="App">
      <button onClick={returnToHome}>Back</button>
      {data
        ? data.map((location) => (
            <ListElement
              text={location.name}
              key={location.name}
              url={location.url}
              setData={setData}
              isAreasShown={isAreasShown}
              setIsAreasShown={setIsAreasShown}
              setAreas={setAreas}
            ></ListElement>
          ))
        : console.log("no fetch")}
    </div>
  );
}

export default App;
