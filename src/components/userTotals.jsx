import React, { Component } from "react";
class UserTotal extends Component {
  state = {};
  render() {
    return (
      <div className="col" style={{ paddingTop: "10px" }}>
        <form>
          {/* Tax */}
          <div className="row">
            <h4>{this.props.user.name}</h4>
          </div>
          <div className="row">
            <div className="col">
              <label>Tax</label>
            </div>
            <div className="col">
              <input
                name="Tax"
                style={{ backgroundColor: "#EFEFEF" }}
                type="number"
                value={this.props.user.tax.toFixed(2)}
                required
              ></input>
            </div>
          </div>
          {/* Tip */}
          <div className="row">
            <div className="col">
              <label>Tip</label>
            </div>
            <div className="col">
              <input
                name="Tip"
                style={{ backgroundColor: "#EFEFEF" }}
                type="number"
                value={this.props.user.tip.toFixed(2)}
                required
              ></input>
            </div>
          </div>
          {/* GrandTotal */}
          <div className="row">
            <div className="col">
              <label>Grand Total</label>
            </div>
            <div className="col">
              <input
                name="GrandTotal"
                style={{ backgroundColor: "lightgreen" }}
                type="number"
                value={this.props.user.grandTotal.toFixed(2)}
                required
              ></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserTotal;
