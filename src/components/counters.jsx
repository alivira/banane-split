import React, { Component } from "react";
import Counter from "./counter";
import UserName from "./username";
import LineTotal from "./lineTotals";
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
      updateTax,
      updateTip,
      grandtotal,
      updateName,
      counters,
      users,
      subtotal,
      totals,
    } = this.props;
    return (
      <div>
        <div className="row" style={{ paddingLeft: "183px" }}>
          <button onClick={onAddUser} className="btn-primary btn-sm m-2">
            Add User
          </button>
          {this.props.users.map((user) => (
            <div
              className="col"
              style={{ columnWidth: "50px", paddingTop: "10px" }}
            >
              <UserName user={user} updateName={updateName}></UserName>
            </div>
          ))}
        </div>

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

        <button onClick={onAddRow} className="btn-primary btn-sm m-2">
          Add Line Item
        </button>

        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        <LineTotal
          totals={totals}
          counter={counters}
          subtotal={subtotal}
          updateTax={updateTax}
          updateTip={updateTip}
          grandtotal={grandtotal}
        />
      </div>
    );
  }
}

export default Counters;
