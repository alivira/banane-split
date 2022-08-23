import React, { Component } from "react";
import Counter from "./counter";
class Counters extends Component {
  render() {
    const { onAddRow, onReset, onDelete, onIncrement, updateValue, counters } =
      this.props;
    return (
      <div>
        <button onClick={onAddRow} className="btn-primary btn-sm m-2">
          Add Row
        </button>

        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={onDelete}
            onIncrement={onIncrement}
            updateValue={updateValue}
            counter={counter}
          ></Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
