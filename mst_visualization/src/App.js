import "./App.css";
import React from "react";
import NavBar from "./Navbar.js";
import Graph from "./Graph.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      display_graph: false,
      pressed: "",
      running_state: "",
    };
    this.handleNavClick = this.handleNavClick.bind(this);
    this.update_running_state = this.update_running_state.bind(this);
  }

  update_running_state(new_state) {
    this.setState({
      running_state: new_state,
    });
  }

  handleNavClick(button) {
    this.setState({
      display_graph: true,
      pressed: button,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <body>
          <NavBar
            handleNavClick={this.handleNavClick.bind(this)}
            running_state={this.state.running_state}
          />
          <Graph
            display_graph={this.state.display_graph}
            algo_type={this.state.pressed}
            update_running_state={this.update_running_state}
          />
        </body>
      </div>
    );
  }
}
export default App;
