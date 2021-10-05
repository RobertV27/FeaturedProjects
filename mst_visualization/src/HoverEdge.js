import React from "react";
import Edge from "./Edge.js";

function HoverEdge(props) {
  let hovered_edge = null;
  if (
    props.state.hovered_edge[0] !== -1 &&
    props.state.hovered_edge[1] !== -1
  ) {
    let node1_cords = [-1, -1];
    let node2_cords = [-1, -1];
    for (let i = 0; i < props.state.nodes.length; i++) {
      if (props.state.hovered_edge[0] === props.state.nodes[i][2]) {
        node1_cords = [props.state.nodes[i][0], props.state.nodes[i][1]];
      }
    }
    for (let i = 0; i < props.state.nodes.length; i++) {
      if (props.state.hovered_edge[1] === props.state.nodes[i][2]) {
        node2_cords = [props.state.nodes[i][0], props.state.nodes[i][1]];
      }
    }
    hovered_edge = (
      <Edge
        node1_cords={node1_cords}
        node2_cords={node2_cords}
        preview={true}
      />
    );
  }
  return hovered_edge;
}

export default HoverEdge;
