function ListElement(props) {
  const text = props.text;
  const url = props.url;
  const setData = props.setData;
  const isAreasShown = props.isAreasShown;
  const setIsAreasShown = props.setIsAreasShown;
  const setAreas = props.setAreas;
  const setAreaSelected = props.setAreaSelected;

  async function getAreas(url) {
    const response = await fetch(url);
    const areas = await response.json();
    if (!isAreasShown) {
      setData(areas.areas);
      setIsAreasShown(true);
      setAreas(areas.areas);
    } else {
      setAreas(areas)
      setAreaSelected(true);
    }
  }

  return <li onClick={async () => await getAreas(url)}>{text}</li>;
}

export default ListElement;
