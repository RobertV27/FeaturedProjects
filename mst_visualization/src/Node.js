import React from "react";

const node_style = {
  backgroundColor: "#FFFFFF",
  width: 30,
  height: 30,
  borderRadius: 25,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  zIndex: 3,
};

const text_style = {
  fontSize: 6,
};

function Node(props) {
  return (
    <div
      id={props.uniq_val}
      style={{
        ...node_style,
        position: "absolute",
        top: props.ycord - 125,
        left: props.xcord - 15,
        border:
          props.selected_idx === props.idx
            ? "2px solid blue"
            : "2px solid black",
      }}
      draggable
      onDrag={props.draggingNode}
      onDragStart={props.startDraggingNode}
      onMouseEnter={props.enteringNode}
      onMouseLeave={props.leavingNode}
    >
      {/*  <h4 style={text_style}> id:{props.uniq_val} </h4>
      <h4 style={text_style}> y:{props.idx} </h4>
    <h3>{props.animations}</h3> */}
    </div>
  );
}

export default Node;
