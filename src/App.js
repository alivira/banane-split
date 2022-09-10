import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import update from "immutability-helper";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossorigin="anonymous"
/>

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
    this.updateUserTotalBreakdownValue(
      this.state.users,
      this.state.totals[0].tax,
      this.state.totals[0].tip,
      counters
    );
  };

  handleReset = () => {
    const resetState = {
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
    this.setState({ counters: resetState.counters });
    this.setState({ users: resetState.users });
    this.setState({ totals: resetState.totals });
  };

  handleUpdateBillValue = (counter, e) => {
    var input = this.preventNegative(e);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value = input;
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
    this.updateUserTotalBreakdownValue(
      this.state.users,
      this.state.totals[0].tax,
      this.state.totals[0].tip,
      counters
    );
  };

  handleUpdateBillQuantity = (counter, e) => {
    var input = this.preventNegative(e);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].quantity = input;
    this.setState({ counters });
    console.log("Updated quantity", input);
    this.updateUserTotalBreakdownValue(
      this.state.users,
      this.state.totals[0].tax,
      this.state.totals[0].tip,
      counters
    );
  };

  handleUpdateBillPortion = (counter, user, portion) => {
    const newBillId = counter.id;
    console.log("billID: ", newBillId);
    console.log("Bills: ", this.state.counters);

    var newPortion = this.preventNegative(portion);
    if (!newPortion) {
      newPortion = 0;
    }
    console.log("newPortion: ", newPortion);

    const newUser = user;

    const newRow = { billId: newBillId, portion: newPortion };
    const newUsers = this.state.users.slice();
    const userIndex = newUsers.indexOf(newUser);

    console.log("userIndex", userIndex);

    var billIndex = -1;

    console.log("billIndex (before): ", billIndex);

    for (var i = 0; i < newUsers[userIndex].bills.length; i++) {
      if (newUsers[userIndex].bills[i].billId === newBillId) {
        billIndex = i;
        console.log(
          "Match!",
          i,
          newUsers[userIndex].bills[i].billId,
          newBillId
        );
        newUsers[userIndex].bills[billIndex].portion = newPortion;
      } else {
        console.log(
          "Failed to Match!",
          i,
          newUsers[userIndex].bills[i].billId,
          newBillId
        );
      }
    }
    console.log("billIndex (after): ", billIndex);

    if (billIndex === -1) {
      newUsers[userIndex].bills.push(newRow);
    }

    this.setState({ users: newUsers });
    console.log("New users (portion):", newUsers);
    this.updateUserTotalBreakdownTaxTip(
      newUsers,
      this.state.totals[0].tax,
      this.state.totals[0].tip
    );
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
    const newRow = { id: newId, value: 0, name: "", quantity: 1 };
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

  updateUserTotalBreakdownTaxTip = (users, tax, tip) => {
    let newUsers = users;
    for (let i = 0; i < newUsers.length; i++) {
      newUsers[i].total = this.calculateUserSubTotal(newUsers[i]);
      var ratio = Number(this.calculateUserRatio(newUsers[i]));
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
        if (
          user.bills[i].billId === bills[j].id &&
          this.findPortionTotals(bills[j].id) > 0
        ) {
          total +=
            bills[j].value *
            bills[j].quantity *
            (user.bills[i].portion / this.findPortionTotals(bills[j].id));
        }
      }
    }
    return total;
  };

  calculateGlobalSubTotalValue = (counters) => {
    var count = 0;
    for (var i = 0, n = counters.length; i < n; i++) {
      count += counters[i].quantity * counters[i].value;
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
        if (
          user.bills[i].billId === bills[j].id &&
          this.findPortionTotals(bills[j].id) > 0
        ) {
          total +=
            bills[j].value *
            bills[j].quantity *
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
      count += this.state.counters[i].value * this.state.counters[i].quantity;
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

  preventNegative = (input) => {
    return input < 0 ? 0 : input;
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
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "40px",
              padding: "10px",
              width: "200px",
            }}
          >
            <p style={{ textAlign: "center", fontWeight: "200" }}>
              made with &#x1F497; by{" "}
              <a
                style={{ color: "#FEB83E", fontWeight: "400" }}
                href="https://linktr.ee/alivira"
              >
                ali
              </a>
            </p>
            <a href="https://www.buymeacoffee.com/alivira" target="_blank">
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                style={{
                  margin: "auto",
                  display: "block",
                  width: "75%",
                }}
              />
            </a>
          </div>

          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "30px",
              marginBottom: "30px",
              padding: "10px",
              width: "300px",
            }}
          >
            <p style={{ textAlign: "center", fontWeight: "200" }}>
        
              <a
                style={{ color: "#FEB83E", fontWeight: "400" }}
                href="https://github.com/alivira/banane-split"
                target="_blank"
              >
                contribute
              </a>
<br></br>
              <a
                style={{ color: "#FEB83E", fontWeight: "200", fontSize: "8pt" }}
                href="https://github.com/alivira/banane-split/blob/master/LICENSE"
                target="_blank"
              >
                Some Rights Reserved (c) | MIT License
              </a>
            </p>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
