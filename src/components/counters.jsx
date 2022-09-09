import React, { Component } from "react";
import Counter from "./counter";
import UserName from "./username";
import LineTotal from "./lineTotals";
import UserTotal from "./userTotals";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Grid from '@mui/material/Grid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
          <Container style={{overflowX:"scroll"}}>
            <Row  style={{flexWrap:"nowrap"}}>
            <Col  xs="auto" style={{ paddingRight: "250px", paddingLeft: "15px" }}>
              <IconButton color="primary" onClick={onReset}>
                <RestartAltIcon />
              </IconButton>
            </Col>
            <Col  xs="auto" >
              <IconButton color="primary" onClick={onAddRow}>
                <PostAddIcon />
              </IconButton>
            </Col>

            <Col  xs="auto"style={{ paddingRight: "50px" }}>
              <IconButton color="primary" onClick={onAddUser}>
                <PersonAddIcon />
              </IconButton>
            </Col>

            {this.props.users.map((user) => (
              <Col
              >
                <UserName user={user} updateName={updateName}></UserName>
              </Col>
            ))}
            </Row>

            <div style={{marginBottom:"8px"}}>

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

          </Container>
          


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
