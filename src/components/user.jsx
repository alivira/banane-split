import React, { Component } from "react";

class User extends Component {
  render() {
    console.log(this.props.counter);
    console.log(this.props.users);
    return (
      <div>
        <form>
          <input
            type="number"
            required
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
