import React, { Component } from "react";

class UserName extends Component {
  render() {
    console.log(this.props.counter);
    console.log(this.props.users);

    return (
      <input
        className="names"
        type="string"
        style={{ width: "90px" }}
        required
        value={this.getName()}
        onChange={(e) => this.props.updateName(this.props.user, e.target.value)}
      />
    );
  }

  getValue() {
    const count = 0;
    return count;
  }

  getName() {
    return this.props.user.name;
  }
}

export default UserName;
