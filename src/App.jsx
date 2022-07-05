import { useState, useEffect } from "react";
import { CssBaseline, Grid, LinearProgress, Box } from "@material-ui/core";

import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";
import { getPlacesData } from "./api";

function App() {
  const [Places, setPlaces] = useState([]);
  const [FilteredPlaces, setFilteredPlaces] = useState([]);
  const [Coordinates, setCoordinates] = useState({});
  // const [WeatherData, setWeatherData] = useState({});
  const [Bounds, setBounds] = useState({});
  const [IsLoading, setIsLoading] = useState(false);
  const [ChildClicked, setChildClicked] = useState(null);

  const [type, setType] = useState("restaurants");
  const [Rating, setRating] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filterdPlaces = Places?.filter((place) => place.rating >= Rating);

    setFilteredPlaces(filterdPlaces);
  }, [Rating]);

  useEffect(() => {
    if (Bounds.sw && Bounds.ne) {

      setIsLoading(true);

      // getWeatherData(Coordinates.lat, Coordinates.lng)
      // .then((data) => setWeatherData(data));


      getPlacesData(type, Bounds.sw, Bounds.ne).then((res) => {
        setPlaces(res?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, Bounds]);

  // console.log(Places);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            Places={FilteredPlaces.length ? FilteredPlaces : Places}
            ChildClicked={ChildClicked}
            IsLoading={IsLoading}
            type={type}
            Rating={Rating}
            setRating={setRating}
            setType={setType}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            Coordinates={Coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            Places={FilteredPlaces.length ? FilteredPlaces : Places}
            setChildClicked={setChildClicked}
            // WeatherData={WeatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
