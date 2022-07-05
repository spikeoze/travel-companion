import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@material-ui/icons/Search";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import useStyles from "./styles";

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box className={classes.Box}>
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          {/* <Autocomplete> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
            />
          </div>
          {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
