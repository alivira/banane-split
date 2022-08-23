import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
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
        name: "",
        total: 0,
        bills: [{ billId: "", portion: 0 }],
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
  };

  handleUpdateBill = (counter, user, portion) => {
    const newBillId = counter.id;
    const newPortion = portion;
    const newUser = user;

    const newRow = { billId: newBillId, portion: newPortion };
    const newUsers = this.state.users.slice();
    const userIndex = newUsers.indexOf(newUser);

    var billIndex = 0;

    console.log("User Index", userIndex);
    console.log("Bill Id", newBillId);
    console.log("User Array", newUsers);
    console.log("UserId", user);

    for (var i = 0; i < newUsers[userIndex].bills.length; i++) {
      if (newUsers[userIndex].bills[i].billId === newBillId) {
        billIndex = i;
      } else {
        billIndex = -1;
      }
    }

    console.log("Bill Index", billIndex);

    // const billIndex = newUsers[userIndex][3][1].indexOf(newBillId);

    if (billIndex !== -1) {
      newUsers[userIndex].bills[billIndex].portion = newPortion;
      console.log("Bill updated!");
    } else {
      newUsers[userIndex].bills.push(newRow);
      console.log("New bill line pushed!");
    }
    this.setState({ users: newUsers });
    console.log("Updated users", this.state.users);
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
      bills: [{ billId: "", portion: 0 }],
    };
    const newArray = this.state.users.slice();
    newArray.push(newRow);
    this.setState({ users: newArray });
  };

  calculateTotal = () => {
    var count = 0;
    for (var i = 0, n = this.state.counters.length; i < n; i++) {
      count += this.state.counters[i].value;
    }
    return count;
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
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            onAddRow={this.handleAddRow}
            onAddUser={this.handleAddUser}
            updateValue={this.handleUpdateValue}
            updateBill={this.handleUpdateBill}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
