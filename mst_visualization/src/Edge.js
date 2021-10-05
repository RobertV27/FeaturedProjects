import React from "react";

let angle = 0;
let length = 0;
let xcord = 0;
let ycord = 0;

const edge_style = {
  width: 10,
  backgroundColor: "#A9A9A9",
  position: "absolute",
  zIndex: 1,
  display: "inlineFlex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: 8,
};

const preview_style = {
  width: 10,
  backgroundColor: "#EEEEEE",
  position: "absolute",
  zIndex: 1,
  display: "inlineFlex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: 8,
};

const se_style = {
  width: 10,
  backgroundColor: "#47D147",
  position: "absolute",
  zIndex: 1,
  display: "inlineFlex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: 8,
};

const pe_style = {
  width: 10,
  backgroundColor: "#FFA64D",
  position: "absolute",
  zIndex: 1,
  display: "inlineFlex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: 8,
};

const ue_style = {
  width: 10,
  backgroundColor: "#CFCFCF",
  position: "absolute",
  zIndex: 1,
  display: "inlineFlex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: 8,
};

class Edge extends React.Component {
  constructor() {
    super();
    this.state = {
      animation_edge: "",
    };
  }

  translate_animation(instructions) {
    for (let i = 0; i < instructions.length; i++) {
      if (instructions[i][0] === "PE") {
        setTimeout(
          function () {
            this.setState({
              animation_edge: "PE",
            });
          }.bind(this),
          instructions[i][3] * 1000
        );

        if (this.props.algo_type !== String("Prim's")) {
          setTimeout(
            function () {
              if (this.state.animation_edge === "PE") {
                this.setState({
                  animation_edge: "UE",
                });
              }
            }.bind(this),
            (instructions[i][3] + 1) * 1010
          );
        }
      } else if (instructions[i][0] === "SE") {
        setTimeout(
          function () {
            this.setState({
              animation_edge: "SE",
            });
          }.bind(this),
          instructions[i][3] * 1000
        );
      }
    }
  }

  componentDidUpdate(prevProps, nextState) {
    if (prevProps.animations !== this.props.animations) {
      if (this.props.animations && this.props.animations.length > 0) {
        this.translate_animation(this.props.animations);
      } else {
        this.setState({
          animation_edge: "",
        });
      }
    }
  }

  render() {
    length = Math.sqrt(
      Math.pow(this.props.node1_cords[0] - this.props.node2_cords[0], 2) +
        Math.pow(this.props.node1_cords[1] - this.props.node2_cords[1], 2)
    );

    xcord =
      Math.min(this.props.node1_cords[0], this.props.node2_cords[0]) +
      Math.abs((this.props.node1_cords[0] - this.props.node2_cords[0]) / 2);

    ycord =
      Math.min(this.props.node1_cords[1], this.props.node2_cords[1]) -
      length / 2 +
      Math.abs((this.props.node1_cords[1] - this.props.node2_cords[1]) / 2) +
      160;

    angle =
      (Math.atan(
        (this.props.node1_cords[1] - this.props.node2_cords[1]) /
          (this.props.node1_cords[0] - this.props.node2_cords[0])
      ) *
        180) /
        Math.PI +
      90;
    let rendered_style = this.props.preview ? preview_style : edge_style;
    if (this.state.animation_edge === "PE") {
      rendered_style = pe_style;
    } else if (this.state.animation_edge === "SE") {
      rendered_style = se_style;
    } else if (this.state.animation_edge === "UE") {
      rendered_style = ue_style;
    }

    return (
      <div
        id={this.props.idx}
        class="edge_container"
        style={{
          left: xcord,
          top: ycord - 270,
          transform: "rotate(" + angle + "deg)",
          height: length,
          ...rendered_style,
          zIndex: this.props.preview ? 1 : 2,
          border:
            String(this.props.selected_edge_idx) === String(this.props.idx) &&
            !this.props.preview
              ? "2px solid blue"
              : "",
        }}
        onClick={this.props.on_click}
      >
        <input
          type="text"
          id={this.props.idx}
          placeholder={this.props.value}
          onChange={this.props.onValueChange}
          style={{
            transform: "rotate(" + -1 * angle + "deg)",
            color: "#000000",
            position: "relative",
            top: length / 2,
            visibility: this.props.preview ? "hidden" : "visible",
            border: "1px solid black",
            backgroundColor: "#FFFFFF",
            padding: 3,
            borderRadius: 3,
            width: 15,
            userSelect: "none",
          }}
        ></input>
      </div>
    );
  }
}

export default Edge;
