import React, { Component } from "react";
import close from "../images/circle-xmark-solid.svg";
import User from "./user";
class Counter extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <form>
            <input
              type="number"
              style={{ fontWeight: "200", width: "190px" }}
              required
              value={this.getValue()}
              onChange={(e) =>
                this.props.updateValue(
                  this.props.counter,
                  Number(e.target.value)
                )
              }
            ></input>
          </form>

          <img
            src={close}
            style={{ width: "15px", fill: "white", margin: "10px" }}
            onClick={() => this.props.onDelete(this.props.counter.id)}
            type="button"
            alt="remove line entry"
          ></img>

          {this.props.users.map((user) => (
            <div className="col" style={{ columnWidth: "50px" }}>
              <User
                user={user}
                counter={this.props.counter}
                updateBill={this.props.updateBill}
              ></User>
            </div>
          ))}
        </div>
      </div>
    );
  }

  getValue() {
    const { value: count } = this.props.counter;
    return count;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.props.counter;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
