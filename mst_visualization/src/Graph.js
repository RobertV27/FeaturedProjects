import React from "react";
import Node from "./Node.js";
import Edge from "./Edge.js";
import HoverEdge from "./HoverEdge.js";
import Test from "./test.js";
import Prims from "./Prims.js";
import Kruskals from "./Kruskal.js";
import CCA from "./ConnectedComponentAlg.js";

const graph_style = {
  backgroundColor: "#F0FFFF",
  display: "flex",
  height: "calc(100vh - 100px)",
  width: "100vw",
};

const delete_button_style = {
  height: 26,
  width: 100,
  backgroundColor: "#7E8D9B",
  position: "absolute",
  top: -28,
  left: 50,
  borderRadius: 5,
  border: "1px solid black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const run_button_style = {
  height: 26,
  width: 100,
  backgroundColor: "#7E8D9B",
  position: "absolute",
  top: -28,
  left: 200,
  borderRadius: 5,
  border: "1px solid black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

let is_running_algo = false;
let can_edit_graph = true;

class Graph extends React.Component {
  constructor() {
    super();
    this.node_id = 0;
    this.state = {
      nodes: [],
      edges: [],
      selected_node_idx: -1,
      selected_edge_idx: -1,
      hovered_edge: [-1, -1],
      running: false,
      animation_instructions: [],
      converter: [],
      connected_component: false,
    };
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteElemq = this.deleteElement.bind(this);
    this.addEdge = this.addEdge.bind(this);
    this.handleEnterNode = this.handleEnterNode.bind(this);
    this.handleLeaveNode = this.handleLeaveNode.bind(this);
    this.handleEdgeValueChange = this.handleEdgeValueChange.bind(this);
    this.runAlgo = this.runAlgo.bind(this);
  }

  updateCCA() {
    let con = CCA(this.generateAdjMatrix());
    this.setState((prevState) => {
      return {
        connected_component: con,
      };
    });
  }

  handleDoubleClick(event) {
    if (!can_edit_graph) return;
    let isValid = true;
    if (event.clientY < 135) {
      isValid = false;
    }

    for (let i = 0; i < this.state.nodes.length; i++) {
      if (
        Math.abs(event.clientX - this.state.nodes[i][0]) < 30 &&
        Math.abs(event.clientY - this.state.nodes[i][1]) < 30
      ) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      this.node_id++;
      this.setState(
        (prevState) => {
          return {
            nodes: [
              ...prevState.nodes,
              [event.clientX, event.clientY, this.node_id],
            ],
          };
        },
        () => this.updateCCA()
      );
    }
  }

  allow_editing() {
    if (!is_running_algo && !can_edit_graph) {
      can_edit_graph = true;
      this.props.update_running_state("");
    }
  }

  handleClick(event) {
    if (!can_edit_graph) return;

    if (this.state.nodes === undefined) {
      return;
    }
    for (let i = 0; i < this.state.nodes.length; i++) {
      if (
        Math.abs(event.clientX - this.state.nodes[i][0]) < 15 &&
        Math.abs(event.clientY - this.state.nodes[i][1]) < 15
      ) {
        if (
          i !== this.state.selected_node_idx &&
          this.state.selected_node_idx !== -1
        ) {
          this.addEdge(
            this.state.nodes[this.state.selected_node_idx][2],
            this.state.nodes[i][2]
          );
        }
        this.setState((prevState) => {
          return {
            selected_node_idx: i,
            selected_edge_idx: -1,
          };
        });
        return;
      }
    }
    this.setState((prevState) => {
      return {
        selected_node_idx: -1,
      };
    });
  }

  handleEnterNode(event) {
    if (this.state.selected_node_idx === -1) {
      return;
    }
    let edge_node1_id = this.state.nodes[this.state.selected_node_idx][2];
    let edge_node2_id = -1;
    for (let i = 0; i < this.state.nodes.length; i++) {
      if (
        Math.abs(event.clientX - this.state.nodes[i][0]) < 30 &&
        Math.abs(event.clientY - this.state.nodes[i][1]) < 30
      ) {
        edge_node2_id = this.state.nodes[i][2];
      }
    }
    let min_edge_node = Math.min(edge_node1_id, edge_node2_id);
    let max_edge_node = Math.max(edge_node1_id, edge_node2_id);
    for (let i = 0; i < this.state.edges.length; i++) {
      if (
        this.state.edges[i][0] === min_edge_node &&
        this.state.edges[i][1] === max_edge_node
      ) {
        return;
      }
    }

    if (edge_node1_id !== edge_node2_id) {
      this.setState((prevState) => {
        return {
          hovered_edge: [edge_node1_id, edge_node2_id],
        };
      });
    }
  }

  handleLeaveNode(event) {
    this.setState((prevState) => {
      return {
        hovered_edge: [-1, -1],
      };
    });
  }

  handleEdgeValueChange(event) {
    let updated_edges = this.state.edges.slice();
    updated_edges[event.target.id][2] = parseInt(event.target.value);
    this.setState({
      edges: updated_edges,
    });
  }

  deleteElement() {
    if (this.state.selected_node_idx !== -1) {
      let updated_nodes = this.state.nodes.filter(
        (value, index) => this.state.selected_node_idx !== index
      );

      let updated_edges = this.state.edges.filter(
        (value, index) =>
          this.state.nodes[this.state.selected_node_idx][2] !== value[0] &&
          this.state.nodes[this.state.selected_node_idx][2] !== value[1]
      );
      this.setState(
        (prevState) => {
          return {
            nodes: updated_nodes,
            edges: updated_edges,
            selected_node_idx: updated_nodes.length !== 0 ? 0 : -1,
          };
        },
        () => this.updateCCA()
      );
    } else {
      let updated_edges = this.state.edges.filter(
        (value, index) => String(this.state.selected_edge_idx) !== String(index)
      );
      this.setState(
        (prevState) => {
          return {
            edges: updated_edges,
            selected_edge_idx: updated_edges.length !== 0 ? 0 : -1,
          };
        },
        () => this.updateCCA()
      );
    }
  }

  addEdge(first_node_idx, second_node_idx) {
    let min_node_idx = Math.min(first_node_idx, second_node_idx);
    let max_node_idx = Math.max(first_node_idx, second_node_idx);
    for (let i = 0; i < this.state.edges.length; i++) {
      if (
        min_node_idx === this.state.edges[i][0] &&
        max_node_idx === this.state.edges[i][1]
      ) {
        return;
      }
    }
    this.setState(
      (prevState) => {
        return {
          edges: [...prevState.edges, [min_node_idx, max_node_idx, 1]],
        };
      },
      () => this.updateCCA()
    );
  }

  handleNodeDrag(event) {
    if (!can_edit_graph) return;
    event.dataTransfer.setDragImage(new Image(), 0, 0);
    let node_idx = -1;
    let node_id = -1;
    for (let i = 0; i < this.state.nodes.length; i++) {
      if (
        Math.abs(event.clientX - this.state.nodes[i][0]) < 15 &&
        Math.abs(event.clientY - this.state.nodes[i][1]) < 15
      ) {
        node_idx = i;
        node_id = this.state.nodes[i][2];
        break;
      }
    }
    let updated_nodes = this.state.nodes.filter(
      (value, index) => node_idx !== index
    );
    if (node_id !== -1) {
      this.setState((prevState) => {
        return {
          nodes: [[event.clientX, event.clientY, node_id], ...updated_nodes],
        };
      });
    }
  }

  handleStartNodeDrag(event) {
    event.dataTransfer.setDragImage(new Image(), 0, 0);
  }

  selectEdge(event) {
    this.setState({
      selected_edge_idx: event.target.id,
      selected_node_idx: -1,
    });
  }

  generateAdjMatrix() {
    let adj = [];
    let id_converter = new Map();
    let adj_converter = new Map();
    for (let i = 0; i < this.state.nodes.length; i++) {
      adj[i] = [];
      id_converter.set(this.state.nodes[i][2], i);
      adj_converter.set(i, this.state.nodes[i][2]);
      for (let j = 0; j < this.state.nodes.length; j++) {
        adj[i][j] = 0;
      }
    }
    for (let i = 0; i < this.state.edges.length; i++) {
      adj[id_converter.get(this.state.edges[i][0])][
        id_converter.get(this.state.edges[i][1])
      ] = this.state.edges[i][2];
      adj[id_converter.get(this.state.edges[i][1])][
        id_converter.get(this.state.edges[i][0])
      ] = this.state.edges[i][2];
    }

    this.setState({
      converter: adj_converter,
    });
    return adj;
  }

  runAlgo() {
    let instructions;
    let a = this.generateAdjMatrix();
    if (this.props.algo_type === String("Prim's")) {
      if (this.state.selected_node_idx > -1) {
        instructions = Prims(a, this.state.selected_node_idx);
      } else {
        instructions = Prims(a, 0);
      }
    } else {
      instructions = Kruskals(a);
    }
    let new_state = [];
    for (let i = 0; i < instructions.length; i++) {
      new_state.push([
        instructions[i].substring(0, 2),
        instructions[i].substring(2, 3),
        instructions[i].substring(3),
        i,
      ]);
    }
    this.setState({
      animation_instructions: new_state,
    });
    this.forceUpdate();
    is_running_algo = true;
    can_edit_graph = false;
    this.props.update_running_state("Running");
    setTimeout(
      function () {
        this.props.update_running_state("Waiting");
        is_running_algo = false;
        this.setState({
          animation_instructions: [],
        });
      }.bind(this),
      new_state.length * 1000
    );
  }

  shouldComponentUpdate(prevProps, nextState) {
    if (!can_edit_graph) {
      return false;
    }
    return true;
  }

  render() {
    let to_render = null;
    if (this.props.display_graph) {
      to_render = (
        <div
          class="field_container"
          style={{ position: "relative" }}
          onClick={this.allow_editing.bind(this)}
        >
          <div
            class="delete_button"
            style={{
              ...delete_button_style,
              visibility:
                this.state.selected_edge_idx === -1 &&
                this.state.selected_node_idx === -1
                  ? "hidden"
                  : "visible",
            }}
            onClick={this.deleteElement.bind(this)}
          >
            <h4 style={{ fontSize: 12, color: "#FFFFFF" }}> Delete </h4>
          </div>
          <div
            style={{
              ...run_button_style,
              visibility:
                this.state.edges.length >= 2 &&
                this.state.connected_component &&
                can_edit_graph
                  ? "visible"
                  : "hidden",
            }}
            onClick={this.runAlgo.bind(this)}
          >
            <h4 style={{ fontSize: 12, color: "#FFFFFF" }}>Run Algorithim</h4>
          </div>
          <div
            class="graph_field"
            onDoubleClick={this.handleDoubleClick}
            onClick={this.handleClick}
            style={graph_style}
          >
            {this.state.nodes.map((node, i) => {
              let animations = [];
              for (
                let i = 0;
                i < this.state.animation_instructions.length;
                i++
              ) {
                let n = this.state.converter.get(
                  parseInt(this.state.animation_instructions[i][1])
                );
                if (
                  (this.state.animation_instructions[i][0] === "SN") &
                  (node[2] === n)
                ) {
                  animations.push(this.state.animation_instructions[i]);
                }
              }
              return (
                <Node
                  selected_idx={this.state.selected_node_idx}
                  idx={i}
                  key={i}
                  xcord={node[0]}
                  ycord={node[1]}
                  uniq_val={node[2]}
                  enteringNode={this.handleEnterNode.bind(this)}
                  leavingNode={this.handleLeaveNode.bind(this)}
                  draggingNode={this.handleNodeDrag.bind(this)}
                  startDraggingNode={this.handleStartNodeDrag.bind(this)}
                  animations={animations}
                />
              );
            })}
            {this.state.edges.map((edge, i) => {
              let node1_cords = [-1, -1];
              let node2_cords = [-1, -1];
              for (let i = 0; i < this.state.nodes.length; i++) {
                if (edge[0] === this.state.nodes[i][2]) {
                  node1_cords = [
                    this.state.nodes[i][0],
                    this.state.nodes[i][1],
                  ];
                }
              }
              for (let i = 0; i < this.state.nodes.length; i++) {
                if (edge[1] === this.state.nodes[i][2]) {
                  node2_cords = [
                    this.state.nodes[i][0],
                    this.state.nodes[i][1],
                  ];
                }
              }
              let animations = [];
              for (
                let i = 0;
                i < this.state.animation_instructions.length;
                i++
              ) {
                let n1 = this.state.converter.get(
                  parseInt(this.state.animation_instructions[i][1])
                );
                let n2 = this.state.converter.get(
                  parseInt(this.state.animation_instructions[i][2])
                );
                if (
                  (this.state.animation_instructions[i][0] === "PE" ||
                    this.state.animation_instructions[i][0] === "SE") &&
                  ((n1 === edge[0] && n2 === edge[1]) ||
                    (n1 === edge[1] && n2 === edge[0]))
                ) {
                  animations.push([
                    ...this.state.animation_instructions[i],
                    this.state.animation_instructions.length,
                  ]);
                }
              }
              return (
                <Edge
                  idx={i}
                  key={i}
                  node1_cords={node1_cords}
                  node2_cords={node2_cords}
                  preview={false}
                  on_click={this.selectEdge.bind(this)}
                  onValueChange={this.handleEdgeValueChange.bind(this)}
                  selected_edge_idx={this.state.selected_edge_idx}
                  value={1}
                  animations={animations}
                  algo_type={this.props.algo_type}
                />
              );
            })}
            <HoverEdge state={this.state} />
          </div>
        </div>
      );
    }
    return to_render;
  }
}

export default Graph;
