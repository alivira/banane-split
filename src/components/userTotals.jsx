import React, { Component } from "react";
class UserTotal extends Component {
  state = {};
  render() {
    return (
      <div className="col" style={{ paddingTop: "10px" }}>
        <form>
          <div className="row">
            <h4>{this.props.user.name}</h4>
          </div>
          {/* SubTotal */}
          <div className="row">
            <div className="col">
              <label>Subtotal</label>
            </div>
            <div className="col">
              <input
                className="total"
                name="Subtotal"
                style={{ backgroundColor: "#f0f8ff", borderRadius: "5px" }}
                type="number"
                value={this.props.user.total.toFixed(2)}
                required
              ></input>
            </div>
          </div>
          {/* Tax */}
          <div className="row">
            <div className="col">
              <label>Tax</label>
            </div>
            <div className="col">
              <input
                className="total"
                name="Tax"
                style={{ backgroundColor: "#f0f8ff" }}
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
                className="total"
                name="Tip"
                style={{ backgroundColor: "#f0f8ff" }}
                type="number"
                value={this.props.user.tip.toFixed(2)}
                required
              ></input>
            </div>
          </div>
          <div style={{ paddingTop: "5px" }}></div>
          {/* GrandTotal */}
          <div className="row">
            <div className="col">
              <label>Grand Total</label>
            </div>
            <div className="col">
              <input
                className="total"
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
