import React, { Component } from "react";
import Counter from "./counter";
import UserName from "./username";
import LineTotal from "./lineTotals";
import UserTotal from "./userTotals";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { createTheme, ThemeProvider } from "@mui/material/styles";

class Counters extends Component {
  render() {
    const {
      onAddRow,
      onReset,
      onDelete,
      onAddUser,
      updateValue,
      updateBill,
      updateBillName,
      updateBillQuantity,
      updateTax,
      updateTip,
      grandtotal,
      updateName,
      counters,
      users,
      subtotal,
      totals,
    } = this.props;
    const theme = createTheme({
      palette: {
        primary: {
          main: "#FEB83E",
          darker: "#E59812",
        },
      },
    });
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div className="row" style={{ paddingTop: "60px" }}>
            <div className="col">
              {" "}
              <p
                style={{
                  fontSize: "15pt",
                  fontWeight: "400",
                }}
              >
                Line Items
              </p>
            </div>
            <div className="col">
              {" "}
              <p style={{ fontSize: "15pt", fontWeight: "400" }}>Shares</p>
            </div>
          </div>

          <div className="row" style={{ paddingBottom: "15px" }}>
            <div style={{ paddingRight: "250px", paddingLeft: "15px" }}>
              <IconButton color="primary" onClick={onReset}>
                <RestartAltIcon />
              </IconButton>
            </div>
            <div>
              <IconButton color="primary" onClick={onAddRow}>
                <PostAddIcon />
              </IconButton>
            </div>

            <div style={{ paddingRight: "33px" }}>
              <IconButton color="primary" onClick={onAddUser}>
                <PersonAddIcon />
              </IconButton>
            </div>

            {this.props.users.map((user) => (
              <div
                className="col"
                style={{ width: "50px", paddingTop: "10px" }}
              >
                <UserName user={user} updateName={updateName}></UserName>
              </div>
            ))}
          </div>

          <div style={{ paddingLeft: "15px" }}>
            {counters.map((counter) => (
              <Counter
                key={counter.id}
                onDelete={onDelete}
                updateValue={updateValue}
                updateBill={updateBill}
                updateBillName={updateBillName}
                updateBillQuantity={updateBillQuantity}
                counter={counter}
                users={users}
              ></Counter>
            ))}
          </div>

          <div style={{ paddingTop: "30px", marginLeft: "-15px" }}>
            <LineTotal
              totals={totals}
              counter={counters}
              subtotal={subtotal}
              updateTax={updateTax}
              updateTip={updateTip}
              grandtotal={grandtotal}
            />
          </div>

          {this.props.users.map((user) => (
            <div className="col" style={{ width: "400px", paddingTop: "10px" }}>
              <UserTotal user={user}></UserTotal>
            </div>
          ))}
        </ThemeProvider>
      </div>
    );
  }
}

export default Counters;
