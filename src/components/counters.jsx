import React, { Component } from "react";
import Counter from "./counter";
import { v4 as uuidv4 } from "uuid";

class Counters extends Component {
  state = {
    counters: [
      { id: uuidv4(), value: 4 },
      { id: uuidv4(), value: 0 },
      { id: uuidv4(), value: 2 },
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

  handleAddRow = () => {
    const newId = uuidv4();
    const newRow = { id: newId, value: 0 };
    const newArray = this.state.counters.slice();
    newArray.push(newRow);
    this.setState({ counters: newArray });
    // this.setState({ counters });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleAddRow} className="btn-primary btn-sm m-2">
          Add Row
        </button>

        <button
          onClick={this.handleReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {this.state.counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            counter={counter}
          ></Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
