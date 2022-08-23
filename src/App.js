import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    counters: [
      { id: uuidv4(), value: 0 },
      { id: uuidv4(), value: 0 },
      { id: uuidv4(), value: 0 },
      { id: uuidv4(), value: 0 },
    ],
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleUpdateValue = (counter, e) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value = e;
    this.setState({ counters });
  };

  handleAddRow = () => {
    const newId = uuidv4();
    const newRow = { id: newId, value: 0 };
    const newArray = this.state.counters.slice();
    newArray.push(newRow);
    this.setState({ counters: newArray });
    // this.setState({ counters });
  };

  calculateTotal = () => {
    var count = 0;
    for (var i = 0, n = this.state.counters.length; i < n; i++) {
      count += this.state.counters[i].value;
    }
    return count;
  };

  render() {
    return (
      <React.Fragment>
        <NavBar totalCounters={this.calculateTotal()} />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            onAddRow={this.handleAddRow}
            updateValue={this.handleUpdateValue}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
