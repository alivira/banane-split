import React, { Component } from "react";
import User from "./user";

class Counter extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>

          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            Increment
          </button>

          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm m-2"
          >
            Delete
          </button>

          <form>
            <input
              type="number"
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
