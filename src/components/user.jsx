import React, { Component } from "react";

class User extends Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="number"
            required
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
    const count = 0;
    return count;
  }
}

export default User;
