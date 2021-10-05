import React from "react";
import Prims from "./Prims.js";
import Kruskals from "./Kruskal.js";

function Test(props) {
  let h = null;
  if (props.running) {
    h = <h3>ALGO: {String(Kruskals(props.adj, 0))}</h3>;
  }
  return h;
}

export default Test;
