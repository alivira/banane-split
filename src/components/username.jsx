import React, { Component } from "react";

class UserName extends Component {
  render() {
    console.log(this.props.counter);
    console.log(this.props.users);
    return (
      <div>
        <form>
          <input
            type="string"
            style={{ fontWeight: "200", width: "160px" }}
            required
            value={this.getName()}
            onChange={(e) =>
              this.props.updateName(this.props.user, e.target.value)
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

  getName() {
    return this.props.user.name;
  }
}

export default UserName;
