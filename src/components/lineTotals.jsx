import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class LineTotal extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Row xs="auto" style={{ flexWrap: "nowrap" }}>
          <Col xs={5}>
            <label>Subtotal</label>
          </Col>
          <Col>
            <div className="money" style={{ fontWeight: "200" }}>
              <input
                className="total"
                name="subtotal"
                style={{ backgroundColor: "#efefef" }}
                type="number"
                value={this.props.subtotal.toFixed(2)}
                required
              ></input>
            </div>
          </Col>
        </Row>

        <Row xs="auto" style={{ flexWrap: "nowrap" }}>
          <Col xs={5}>
            <label>Tax</label>
          </Col>
          <Col className="col">
            <div className="money" style={{ fontWeight: "200" }}>
              <input
                className="total"
                name="tax"
                type="number"
                value={this.getTax()}
                required
                onChange={(e) => this.props.updateTax(Number(e.target.value))}
              ></input>
            </div>
          </Col>
        </Row>

        <Row xs="auto" style={{ flexWrap: "nowrap" }}>
          <Col xs={5}>
            <label>Tip</label>
          </Col>
          <Col>
            <div className="money" style={{ fontWeight: "200" }}>
              <input
                className="total"
                name="tip"
                type="number"
                value={this.getTip()}
                required
                onChange={(e) => this.props.updateTip(Number(e.target.value))}
              ></input>
            </div>
          </Col>
        </Row>
        <div style={{ paddingTop: "5px" }}></div>

        <Row xs="auto" style={{ flexWrap: "nowrap" }}>
          <Col xs={5}>
            <label>Grand Total</label>
          </Col>
          <Col>
            <div className="money" style={{ fontWeight: "200" }}>
              <input
                className="total"
                style={{
                  backgroundColor: this.isZero() ? "#FEF8D1" : "lightgreen",
                }}
                value={this.props.grandtotal.toFixed(2)}
                name="grandtotal"
                type="number"
                required
              ></input>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  getTax() {
    const { tax } = this.props.totals[0];
    return tax;
  }

  getTip() {
    const { tip } = this.props.totals[0];
    return tip;
  }

  isZero() {
    const total = Number(this.props.grandtotal.toFixed(2));
    if (total === 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default LineTotal;
