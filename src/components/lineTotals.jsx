import React, { Component } from "react";
class LineTotal extends Component {
  state = {};
  render() {
    return (
      <div className="col" style={{ width: "400px" }}>
        <form>
          <div className="row">
            <div className="col">
              <label>Subtotal</label>
            </div>
            <div className="col">
              <input
                name="subtotal"
                style={{ backgroundColor: "#EFEFEF" }}
                type="number"
                value={this.props.subtotal.toFixed(2)}
                required
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Tax</label>
            </div>
            <div className="col">
              <input
                name="tax"
                type="number"
                value={this.getTax()}
                required
                onChange={(e) => this.props.updateTax(Number(e.target.value))}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Tip</label>
            </div>
            <div className="col">
              <input
                name="tip"
                type="number"
                value={this.getTip()}
                required
                onChange={(e) => this.props.updateTip(Number(e.target.value))}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Grand Total</label>
            </div>
            <div className="col">
              <input
                style={{ backgroundColor: "#EFEFEF" }}
                value={this.props.grandtotal.toFixed(2)}
                name="grandtotal"
                type="number"
                required
              ></input>
            </div>
          </div>
        </form>
      </div>
    );
  }

  getTax() {
    const { tax } = this.props.totals;
    return tax;
  }

  getTip() {
    const { tip } = this.props.totals;
    return tip;
  }
}

export default LineTotal;
