import React from "react";
import NavButton from "./NavButton.js";

const style = {
  height: 80,
  width: "100%",
  backgroundColor: "#F0F8FF",
  display: "flex",
  alignItems: "center",
};

const button_default_style = {
  color: "#FFFFFF",
  backgroundColor: "#7E8D9B",
  height: 50,
  width: 200,
  borderRadius: 10,
  margin: 10,
  fonntFamily: "arial",
  fontSize: 10,
  float: "left",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  userSelect: "none",
};

const button_pushed_style = {
  color: "#EAECEE",
  backgroundColor: "#A9B3BC",
  height: 50,
  width: 200,
  borderRadius: 10,
  margin: 10,
  fonntFamily: "arial",
  fontSize: 10,
  float: "left",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  userSelect: "none",
};

const header_style = {
  height: 30,
  marginLeft: 100,
  border: "1px solid black",
  borderRadius: 10,
  padding: 10,
  backgroundColor: "#FFFFFF",
  fontSize: 20,
  textAlign: "center",
  overflow: "hidden",
  userSelect: "none",
};

const directions_style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  color: "#483D8B",
  height: 30,
};

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      pressed: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.handleNavClick(event.target.getAttribute("name"));
    const name = event.target.getAttribute("name");
    this.setState({
      pressed: name,
    });
  }

  render() {
    var instruction_text = "";
    if (this.props.running_state === "Running") {
      instruction_text = "Running Algorithim...";
    } else if (this.props.running_state === "Waiting") {
      instruction_text = "Algorithim Finished! Click Below";
    } else if (this.state.pressed !== "") {
      instruction_text = "Double click below to place a Node";
    }
    return (
      <div>
        <div style={style}>
          <NavButton
            style={
              this.state.pressed === "Kruskal's"
                ? button_pushed_style
                : button_default_style
            }
            name="Kruskal's"
            text="Kruskal's Algorithim"
            handleClick={this.handleClick}
          />

          <NavButton
            style={
              this.state.pressed === "Prim's"
                ? button_pushed_style
                : button_default_style
            }
            name="Prim's"
            text="Prim's Algorithim"
            handleClick={this.handleClick}
          />
          <h2 style={this.state.pressed === "" ? {} : header_style}>
            {" "}
            {this.state.pressed === ""
              ? ""
              : "Current Algorithim: " + this.state.pressed}
          </h2>
        </div>
        <div style={directions_style}>
          <h3 style={{ userSelect: "none" }}>{instruction_text}</h3>
        </div>
      </div>
    );
  }
}

export default NavBar;
