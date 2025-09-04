import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class UserTotal extends Component {
  state = {};

  // Check if the sum of all user grand totals equals the global grand total
  totalsMatch = () => {
    const { users, globalGrandTotal } = this.props;
    if (!users || !globalGrandTotal) return false;

    const sumOfUserTotals = users.reduce((sum, user) => {
      return sum + (user.grandTotal || 0);
    }, 0);

    // Allow for small floating point differences
    const difference = Math.abs(sumOfUserTotals - globalGrandTotal);
    return difference < 0.01;
  };

  render() {
    return (
      <Container>
        {/* SubTotal */}
        <Row>
          <div className="money" style={{ fontWeight: "200" }}>
            <input
              className="usertotal"
              name="Subtotal"
              style={{
                backgroundColor: "#efefef",
                borderRadius: "5px",
                width: "90px",
              }}
              type="number"
              value={this.props.user.total.toFixed(2)}
              required
            ></input>
          </div>
        </Row>
        {/* Tax */}
        <Row style={{ paddingTop: "6px" }}>
          <div className="money" style={{ fontWeight: "200" }}>
            <input
              className="usertotal"
              name="Tax"
              style={{ backgroundColor: "#efefef", width: "90px" }}
              type="number"
              value={this.props.user.tax.toFixed(2)}
              required
            ></input>
          </div>
        </Row>
        {/* Tip */}
        <Row style={{ paddingTop: "6px" }}>
          <div className="money" style={{ fontWeight: "200" }}>
            <input
              className="usertotal"
              name="Tip"
              style={{ backgroundColor: "#efefef", width: "90px" }}
              type="number"
              value={this.props.user.tip.toFixed(2)}
              required
            ></input>
          </div>
        </Row>
        <div style={{ paddingTop: "5px" }}></div>
        {/* GrandTotal */}
        <Row style={{ paddingTop: "6px" }}>
          <div className="money" style={{ fontWeight: "200" }}>
            <input
              className="usertotal"
              name="GrandTotal"
              style={{
                backgroundColor:
                  this.totalExists() || !this.totalsMatch()
                    ? "#FEF8D1"
                    : "lightgreen",
                width: "90px",
              }}
              type="number"
              value={this.props.user.grandTotal.toFixed(2)}
              required
            ></input>
          </div>
        </Row>
      </Container>
    );
  }

  totalExists() {
    const total = Number(this.props.user.grandTotal.toFixed(2));
    if (total === 0 || Number.isNaN(total)) {
      console.log("IsZero? True", this.props.user.grandTotal);
      return true;
    } else {
      console.log("IsZero? False", this.props.user.grandTotal);
      return false;
    }
  }
}

export default UserTotal;
