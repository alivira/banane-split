import React, { Component } from "react";

class User extends Component {
  render() {
    return (
      <input
        className="shares"
        type="number"
        required
        value={this.getValue()}
        style={{ fontWeight: "200", width: "90px" }}
        onChange={(e) =>
          this.props.updateBill(
            this.props.counter,
            this.props.user,
            Number(e.target.value)
          )
        }
      ></input>
    );
  }

  getValue() {
    // Find the bill entry that matches the current counter's ID
    const billEntry = this.props.user.bills.find(
      (bill) => bill.billId === this.props.counter.id
    );
    return billEntry ? billEntry.portion : 0;
  }
}

export default User;
