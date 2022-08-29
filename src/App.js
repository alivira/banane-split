import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import update from "immutability-helper";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    counters: [
      { id: uuidv4(), value: 0 },
      { id: uuidv4(), value: 0 },
      { id: uuidv4(), value: 0 },
      { id: uuidv4(), value: 0 },
    ],
    users: [
      {
        id: uuidv4(),
        name: "sample",
        total: 0,
        grandTotal: 0,
        bills: [{ billId: "sample", portion: 0 }],
      },
    ],
    totals: [
      {
        subTotal: 0,
        grandTotal: 0,
        tax: 0,
        taxRatio: 0,
        tip: 0,
        tipRatio: 0,
      },
    ],
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleUpdateValue = (counter, e) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value = e;
    this.setState({ counters });
    this.updateBreakdown();
  };

  handleUpdateBill = (counter, user, portion) => {
    const newBillId = counter.id;
    const newPortion = portion;
    const newUser = user;

    const newRow = { billId: newBillId, portion: newPortion };
    const newUsers = this.state.users.slice();
    const userIndex = newUsers.indexOf(newUser);

    var billIndex = 0;

    for (var i = 0; i < newUsers[userIndex].bills.length; i++) {
      if (newUsers[userIndex].bills[i].billId === newBillId) {
        billIndex = i;
      } else {
        billIndex = -1;
      }
    }

    if (billIndex !== -1) {
      newUsers[userIndex].bills[billIndex].portion = newPortion;
      console.log("Bill updated!");
    } else {
      newUsers[userIndex].bills.push(newRow);
      console.log("New bill line pushed!");
    }
    this.setState({ users: newUsers });
    console.log("Updated users", this.state.users);
    this.updateBreakdown();
  };

  handleUpdateName = (user, name) => {
    const newUser = user;
    const newName = name;
    const newUsers = this.state.users.slice();
    const userIndex = newUsers.indexOf(newUser);
    console.log("User Index", userIndex);
    newUsers[userIndex].name = newName;
    this.setState({ users: newUsers });
    console.log("Updated user name", this.state.users);
  };

  handleAddRow = () => {
    const newId = uuidv4();
    const newRow = { id: newId, value: 0 };
    const newArray = this.state.counters.slice();
    newArray.push(newRow);
    this.setState({ counters: newArray });
    // this.setState({ counters });
  };

  handleAddUser = () => {
    const newId = uuidv4();
    const newName = "";
    const newTotal = 0;
    const newRow = {
      id: newId,
      name: newName,
      total: newTotal,
      bills: [{ billId: "sample", portion: 0 }],
    };
    const newArray = this.state.users.slice();
    newArray.push(newRow);
    this.setState({ users: newArray });
  };

  handleUpdateTax = (tax) => {
    const totals = [...this.state.totals];
    totals.tax = tax;
    this.setState({
      totals: update(this.state.totals, { 0: { tax: { $set: tax } } }),
    });
  };

  handleUpdateTip = (tip) => {
    const totals = [...this.state.totals];
    totals.tip = tip;
    this.setState({
      totals: update(this.state.totals, { 0: { tip: { $set: tip } } }),
    });
  };

  calculateTotal = () => {
    var count = 0;
    for (var i = 0, n = this.state.counters.length; i < n; i++) {
      count += this.state.counters[i].value;
    }
    return count;
  };

  finalTotal = () => {
    var count = this.calculateTotal();
    count +=
      Number(this.state.totals[0].tax) + Number(this.state.totals[0].tip);

    return count;
  };

  updateBreakdown = () => {
    let newUsers = this.state.users;
    for (let i = 0; i < newUsers.length; i++) {
      newUsers[i].total = this.calculateBreakdown(newUsers[i]);
      console.log(newUsers);
    }
    this.setState({ users: newUsers });
    this.calculateUserTaxTip();
    console.log("User State (Update Breakdown)", this.state.users);
  };

  findPortionTotals = (billId) => {
    var total = 0;
    for (let i = 0; i < this.state.users.length; i++) {
      for (let j = 0; j < this.state.users[i].bills.length; j++)
        if (this.state.users[i].bills[j].billId === billId) {
          total += this.state.users[i].bills[j].portion;
        }
    }
    console.log("Bill portion total: ", total);
    return total;
  };

  calculateUserTaxTip = () => {
    var ratio = 0;
    var tax = 0;
    var tip = 0;
    var grandTotal = 0;
    var newUsers = this.state.users.slice();

    if ((this.state.totals[0].tax || this.state.totals[0].ti) !== 0)
      for (let i = 0; i < this.state.users.length; i++) {
        ratio =
          Number(this.state.users[i].total) / Number(this.calculateTotal());
        tax = Number(this.state.totals[0].tax) * ratio;
        tip = Number(this.state.totals[0].tip) * ratio;
        grandTotal = Number(this.state.users[i].total) + tax + tip;
        newUsers[i].tax = tax;
        newUsers[i].tip = tip;
        newUsers[i].grandTotal = grandTotal;

        this.setState({ users: newUsers });
      }
  };

  calculateBreakdown = (user) => {
    var bills = this.state.counters.slice();
    var total = 0;

    for (let i = 0; i < user.bills.length; i++) {
      var sampleBill = user.bills[i].billId;
      var billIndex = -1;

      for (var finder = 0; finder < bills.length; finder++) {
        if (bills[finder].id === sampleBill) {
          billIndex = finder;
          console.log("MATCHED");
          if (billIndex !== -1) {
            total +=
              bills[billIndex].value *
              (user.bills[i].portion /
                this.findPortionTotals(bills[billIndex].id));
          }
        }
      }
    }
    return total;
  };

  render() {
    console.log(this.state.users);

    return (
      <React.Fragment>
        <NavBar totalCounters={this.calculateTotal()} />
        <main className="container">
          <Counters
            counters={this.state.counters}
            users={this.state.users}
            totals={this.state.totals}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            onAddRow={this.handleAddRow}
            onAddUser={this.handleAddUser}
            updateValue={this.handleUpdateValue}
            updateBill={this.handleUpdateBill}
            updateName={this.handleUpdateName}
            updateTax={this.handleUpdateTax}
            updateTip={this.handleUpdateTip}
            subtotal={this.calculateTotal()}
            grandtotal={this.finalTotal()}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
