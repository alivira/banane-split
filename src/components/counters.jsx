import React, { Component } from "react";
import Counter from "./counter";
class Counters extends Component {
  render() {
    const {
      onAddRow,
      onReset,
      onDelete,
      onIncrement,
      onAddUser,
      updateValue,
      updateBill,
      counters,
      users,
    } = this.props;
    return (
      <div>
        <button onClick={onAddUser} className="btn-primary btn-sm m-2">
          Add User
        </button>

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
            updateBill={updateBill}
            counter={counter}
            users={users}
          ></Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
