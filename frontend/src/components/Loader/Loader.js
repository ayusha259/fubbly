import React from "react";
import { CircularProgress } from "@material-ui/core";

import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loader}>
      <CircularProgress className={classes.mainLoader} />
    </div>
  );
};

export default Loader;
