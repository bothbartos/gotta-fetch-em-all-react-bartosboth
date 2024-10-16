import fetchData from "../Utils";

function ListElement({text, url, isAreasShown, onAreaSelect, onLocationSelect}) {


  async function getAreas(url) {
    const areas = await fetchData(url);
    if (!isAreasShown) {
      onAreaSelect(areas.areas);
      /*setData(areas.areas);
      setIsAreasShown(true);
      setAreas(areas.areas);*/
    } else {
      onLocationSelect(areas);
      /*setAreas(areas)
      setAreaSelected(true);*/
    }
  }

  return <li onClick={async () => await getAreas(url)}>{text}</li>;
}

export default ListElement;
