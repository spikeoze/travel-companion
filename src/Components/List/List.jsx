import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles.js";
import PlaceDetail from "../PlaceDetail/PlaceDetail.jsx";

function List({
  Places,
  ChildClicked,
  IsLoading,
  type,
  Rating,
  setType,
  setRating,
}) {
  const classes = useStyles();

  const [elRefs, setelRefs] = useState([]);

  useEffect(() => {
    setelRefs((refs) =>
      Array(Places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [Places]);

  // console.log({ ChildClicked });
  return (
    <div className={classes.container}>
      <Typography variant="h5">
        Resturant Hotels & Attractions Around You
      </Typography>
      {IsLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={Rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {Places?.map((place, i) => {
              return (
                <Grid key={i} item xs={12}>
                  <PlaceDetail
                    place={place}
                    selected={Number(ChildClicked) === i}
                    refProp={elRefs[i]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
}

export default List;
