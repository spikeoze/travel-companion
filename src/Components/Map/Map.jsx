import React from "react";
import GoogleMapReact from "google-map-react";

import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { LocationOnOutlined } from "@material-ui/icons";
import useStyles from "./styles";

function Map({ Coordinates, setCoordinates, setBounds, Places, setChildClicked }) {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");

  console.log(Places);
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyALQhEYGltrKnhdz0We2V8Qo-8gPw-VVXU" }}
        defaultCenter={{ lat: 2.0442, lng: 45.3358 }}
        center={Coordinates}
        defaultZoom={14}
        zoom={14}
        margin={[50, 50, 50, 50]}
        // options={' '}
        onChange={(e) => {
          // console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child)=> setChildClicked(child)}
      >
        {Places?.map((place, i) => {
          const { name, photo, rating } = place;
          return (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {isMobile ? (
                <LocationOnOutlined color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper} >
                  <Typography
                    className={classes.typography}
                    variant="subtitle1"
                    gutterBottom
                  >
                    {name}
                  </Typography>
                  <img
                    src={
                      place.photo
                        ? photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    className={classes.pointer}
                    alt={name}
                  />
                  <Rating size="small" value={Number(rating)} readOnly />
                </Paper>
              )}
            </div>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
