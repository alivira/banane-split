import React, { Component } from "react";

class User extends Component {
  render() {
    return (
      <div>
        <form>
          <input
            className="shares"
            type="number"
            required
            value={this.getValue()}
            style={{ fontWeight: "200", width: "160px" }}
            onChange={(e) =>
              this.props.updateBill(
                this.props.counter,
                this.props.user,
                Number(e.target.value)
              )
            }
          ></input>
        </form>
      </div>
    );
  }

  getValue() {
    return this.props.user.bills.portion;
  }
}

export default User;
