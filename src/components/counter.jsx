import React, { Component } from "react";
import close from "../images/circle-xmark-solid.svg";
import User from "./user";
import Grid from '@mui/material/Grid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Counter extends Component {
  render() {
    return (
        <Row style={{flexWrap:"nowrap"}}>
        <Col xs="auto">
        <div className="quantity" style={{fontWeight:'200'}}>
            <input
              className="quantity"
              type="number"
              style={{ fontWeight: "200", width: "60px" }}
              required
              value={this.getQuantity()}
              onChange={(e) =>
                this.props.updateBillQuantity(
                  this.props.counter,
                  Number(e.target.value)
                )
              }
            ></input>
            </div>
            </Col>
            <Col  xs="auto">
            <input
              type="string"
              style={{ fontWeight: "200", width: "190px" }}
              required
              value={this.getName()}
              onChange={(e) =>
                this.props.updateBillName(this.props.counter, e.target.value)
              }
            ></input>
            </Col>

            <Col  xs="auto">
              <div className="money"  style={{ fontWeight:'200'}}>

            <input
              className="quantity"
              type="number"
              style={{ fontWeight: "200", width: "90px" }}
              required
              value={this.getValue()}
              onChange={(e) =>
                this.props.updateValue(
                  this.props.counter,
                  Number(e.target.value)
                )
              }
            ></input>
            </div>
          </Col>


          <Col  xs="auto">
          <img
            src={close}
            style={{ width: "15px", fill: "white", margin: "10px", marginLeft:"-10px" }}
            onClick={() => this.props.onDelete(this.props.counter.id)}
            type="button"
            alt="remove line entry"
          ></img>
          </Col>

          {this.props.users.map((user) => (
            <Col>
              <User
                user={user}
                counter={this.props.counter}
                updateBill={this.props.updateBill}
              ></User>
            </Col>
          ))}
        </Row>
    );
  }

  getValue() {
    const { value: count } = this.props.counter;
    return count;
  }

  getName() {
    return this.props.counter.name;
  }

  getQuantity() {
    return this.props.counter.quantity;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.props.counter;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
