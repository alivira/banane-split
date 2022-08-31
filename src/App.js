import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import update from "immutability-helper";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    counters: [
      { id: uuidv4(), value: 0, itemName: "name", quantity: 1 },
      { id: uuidv4(), value: 0, itemName: "name", quantity: 1 },
      { id: uuidv4(), value: 0, itemName: "name", quantity: 1 },
      { id: uuidv4(), value: 0, itemName: "name", quantity: 1 },
    ],
    users: [
      {
        id: uuidv4(),
        name: "Name",
        total: 0,
        tax: 0,
        tip: 0,
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

  handleUpdateBillValue = (counter, e) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value = e;
    this.setState({ counters });
    // this.updateUserTotalBreakdown();
    this.updateUserTotalBreakdownValue(
      this.state.users,
      this.state.totals[0].tax,
      this.state.totals[0].tip,
      counters
    );
    console.log("Temp counters on Value: ", counters);
  };

  handleUpdateBillName = (counter, e) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].name = e;
    this.setState({ counters });
    this.updateUserTotalBreakdown();
  };

  handleUpdateBillQuantity = (counter, e) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].quantity = e;
    this.setState({ counters });
    this.updateUserTotalBreakdown();
  };

  handleUpdateBillPortion = (counter, user, portion) => {
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
    } else {
      newUsers[userIndex].bills.push(newRow);
    }
    this.setState({ users: newUsers });
    this.updateUserTotalBreakdown();
  };

  handleUpdateName = (user, name) => {
    const newUser = user;
    const newName = name;
    const newUsers = this.state.users.slice();
    const userIndex = newUsers.indexOf(newUser);
    newUsers[userIndex].name = newName;
    this.setState({ users: newUsers });
  };

  handleAddRow = () => {
    const newId = uuidv4();
    const newRow = { id: newId, value: 0, name: "name", quantity: 1 };
    const newArray = this.state.counters.slice();
    newArray.push(newRow);
    this.setState({ counters: newArray });
    // this.setState({ counters });
  };

  handleAddUser = () => {
    const newId = uuidv4();
    const newName = "Name";
    const newTotal = 0;
    const newTax = 0;
    const newTip = 0;
    const newGrandTotal = 0;
    const newRow = {
      id: newId,
      name: newName,
      total: newTotal,
      tax: newTax,
      tip: newTip,
      grandTotal: newGrandTotal,
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
    this.updateUserTotalBreakdownTaxTip(
      this.state.users,
      tax,
      this.state.totals[0].tip
    );
  };

  handleUpdateTip = (tip) => {
    const totals = [...this.state.totals];
    totals.tip = tip;
    this.setState({
      totals: update(this.state.totals, { 0: { tip: { $set: tip } } }),
    });
    this.updateUserTotalBreakdownTaxTip(
      this.state.users,
      this.state.totals[0].tax,
      tip
    );
  };

  //Updates the tax total, tip total, and grand total for users
  updateUserTotalBreakdown = () => {
    let newUsers = this.state.users;
    for (let i = 0; i < newUsers.length; i++) {
      newUsers[i].total = this.calculateUserSubTotal(newUsers[i]);
      newUsers[i].tax = this.calculateUserTax(newUsers[i]);
      newUsers[i].tip = this.calculateUserTip(newUsers[i]);
      newUsers[i].grandTotal =
        newUsers[i].tax + newUsers[i].tip + newUsers[i].total;
      console.log(newUsers);
    }
    this.setState({ users: newUsers });
  };

  updateUserTotalBreakdownTaxTip = (users, tax, tip) => {
    let newUsers = users;
    for (let i = 0; i < newUsers.length; i++) {
      var ratio = Number(this.calculateUserRatio(newUsers[i]));
      newUsers[i].total = this.calculateUserSubTotal(newUsers[i]);
      newUsers[i].tax = Number(tax) * ratio;
      newUsers[i].tip = Number(tip) * ratio;
      newUsers[i].grandTotal =
        newUsers[i].total + newUsers[i].tax + newUsers[i].tip;
    }

    this.setState({ users: newUsers });
  };

  updateUserTotalBreakdownValue = (users, tax, tip, counters) => {
    let newUsers = users;
    for (let i = 0; i < newUsers.length; i++) {
      newUsers[i].total = this.calculateUserSubTotalValue(
        newUsers[i],
        counters
      );
      var ratio =
        Number(newUsers[i].total) /
        Number(this.calculateGlobalSubTotalValue(counters));
      console.log("New Users total: ", newUsers[i].total);
      console.log("New Users ratio: ", ratio);
      console.log(
        "Global Sub Total: ",
        this.calculateGlobalSubTotalValue(counters)
      );
      newUsers[i].tax = Number(tax) * ratio;
      newUsers[i].tip = Number(tip) * ratio;
      newUsers[i].grandTotal =
        newUsers[i].total + newUsers[i].tax + newUsers[i].tip;
    }

    this.setState({ users: newUsers });
  };

  calculateUserSubTotalValue = (user, counters) => {
    var bills = counters;
    var total = 0;

    for (let i = 0; i < user.bills.length; i++) {
      for (let j = 0; j < bills.length; j++) {
        if (user.bills[i].billId === bills[j].id) {
          total +=
            bills[j].value *
            (user.bills[i].portion / this.findPortionTotals(bills[j].id));
        }
      }
    }
    return total;
  };

  calculateGlobalSubTotalValue = (counters) => {
    var count = 0;
    for (var i = 0, n = counters.length; i < n; i++) {
      count += counters[i].value;
      console.log("Global count:", count);
    }

    return count;
  };

  //Finds the total portions (shares) for a bill item
  findPortionTotals = (billId) => {
    var total = 0;
    for (let i = 0; i < this.state.users.length; i++) {
      for (let j = 0; j < this.state.users[i].bills.length; j++)
        if (this.state.users[i].bills[j].billId === billId) {
          total += this.state.users[i].bills[j].portion;
        }
    }
    return total;
  };

  //Finds the total owed without tax & tip per user
  calculateUserSubTotal = (user) => {
    var bills = this.state.counters.slice();
    var total = 0;

    for (let i = 0; i < user.bills.length; i++) {
      for (let j = 0; j < bills.length; j++) {
        if (user.bills[i].billId === bills[j].id) {
          total +=
            bills[j].value *
            (user.bills[i].portion / this.findPortionTotals(bills[j].id));
        }
      }
    }
    return total;
  };

  //Finds the total tax owed per user
  calculateUserTax = (user) => {
    var ratio = 0;
    var tax = 0;

    ratio = Number(user.total) / Number(this.calculateGlobalSubTotal());
    tax = Number(this.state.totals[0].tax) * ratio;

    return tax;
  };

  //Finds the total tax owed per user
  calculateUserTip = (user) => {
    var ratio = 0;
    var tip = 0;

    ratio = Number(user.total) / Number(this.calculateGlobalSubTotal());
    tip = Number(this.state.totals[0].tip) * ratio;

    return tip;
  };

  calculateUserRatio = (user) => {
    return Number(user.total) / Number(this.calculateGlobalSubTotal());
  };

  //Calculates global subtotal
  calculateGlobalSubTotal = () => {
    var count = 0;
    for (var i = 0, n = this.state.counters.length; i < n; i++) {
      count += this.state.counters[i].value;
    }

    return count;
  };

  //Calculates global grand total
  calculateGlobalGrandTotal = () => {
    var count = this.calculateGlobalSubTotal();
    count +=
      Number(this.state.totals[0].tax) + Number(this.state.totals[0].tip);
    return count;
  };

  render() {
    console.log(this.state.users);

    return (
      <React.Fragment>
        <NavBar totalCounters={this.calculateGlobalSubTotal()} />
        <main className="container">
          <Counters
            counters={this.state.counters}
            users={this.state.users}
            totals={this.state.totals}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onAddRow={this.handleAddRow}
            onAddUser={this.handleAddUser}
            updateValue={this.handleUpdateBillValue}
            updateBillName={this.handleUpdateBillName}
            updateBillQuantity={this.handleUpdateBillQuantity}
            updateBill={this.handleUpdateBillPortion}
            updateName={this.handleUpdateName}
            updateTax={this.handleUpdateTax}
            updateTip={this.handleUpdateTip}
            subtotal={this.calculateGlobalSubTotal()}
            grandtotal={this.calculateGlobalGrandTotal()}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
