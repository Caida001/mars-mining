import React, { Component } from 'react';
import './App.css';
import axios from "axios";

const GRID_ROWS = 20
const GRID_COLS = 20
const NODES_URL = 'http://headlight-tournament-1.herokuapp.com/nodes'
const BOTS_URL = 'http://headlight-tournament-1.herokuapp.com/bots'

class App extends Component {
  state = {
    nodes: {},
    bots: {}
  }

  componentDidMount() {
    let result = axios.get(NODES_URL)
    let payload = result.data['Nodes']

    let newState = {}
    for (var i = 0; i < payload.length; i++) {
      let node = payload[i]
      if (!newState[node.Location.X]) {
        newState[node.Location.X] = {}
      }
      newState[node.Location.X][node.Location.Y] = node
    }
    this.setState(newState);

  }

   colorClass (x, y) {
    let nodes = this.state.nodes

    let nodePresent = nodes[x] && nodes[x][y]

    if (!nodePresent) { // Empty
      return 'white'
    }

    if (nodePresent) { // Node present
      return 'blue'
    }
}

  paint () {
    var grid = document.getElementById("grid");
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    for (var i = 0; i < GRID_ROWS; i++) {
      for (var j = 0; j < GRID_COLS; j++) {
        var template = document.getElementsByTagName("template")[0];
        var cell = template.content.cloneNode(true);
        cell.firstElementChild.classList.add(this.colorClass(i, j))
        grid.appendChild(cell)
      }
    }
  }

  start () {
    setInterval(() => {
      this.componentDidMount()
      this.paint()
    }, 1000)
  }





  render() {
    return (
      <div className="app">
      </div>
    )
  }
}

export default App;
