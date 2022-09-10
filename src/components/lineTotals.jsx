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
                className="total"
                name="subtotal"
                style={{ backgroundColor: "#f0f8ff" }}
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
                className="total"
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
                className="total"
                name="tip"
                type="number"
                value={this.getTip()}
                required
                onChange={(e) => this.props.updateTip(Number(e.target.value))}
              ></input>
            </div>
          </div>
          <div style={{ paddingTop: "5px" }}></div>

          <div className="row">
            <div className="col">
              <label>Grand Total</label>
            </div>
            <div className="col">
              <input
                className="total"
                style={{ backgroundColor: "#f0f8ff" }}
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
