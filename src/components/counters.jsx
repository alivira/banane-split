import React, { Component } from "react";
import Counter from "./counter";
import UserName from "./username";
import LineTotal from "./lineTotals";
import UserTotal from "./userTotals";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
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
            <Row style={{marginBottom:"10px", flexWrap:"nowrap"}}>
              <Col xs={4}><h6 style={{textAlign:"center", color:"grey", fontWeight:"400"}}>Line Items</h6></Col>
              <Col xs={8}><h6 style={{textAlign:"center", color:"grey",fontWeight:"400"}}>Shares</h6></Col>
            </Row>

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

            <Col  xs="auto" style={{ marginRight: "30px" }}>
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

          
            <div style={{ marginTop: "30px"}}> </div>

         <Row  style={{flexWrap:"nowrap"}}> 
          <Col xs="auto" style={{marginLeft: "50px", marginRight: "55px"  }}>
            <LineTotal
              totals={totals}
              counter={counters}
              subtotal={subtotal}
              updateTax={updateTax}
              updateTip={updateTip}
              grandtotal={grandtotal}
            />
         

          </Col>
          {this.props.users.map((user) => (
                      <Col style ={{marginLeft:"0"}}>

              <UserTotal user={user}></UserTotal>
              </Col>

          ))}


</Row>
</Container>

        </ThemeProvider>
      </div>
    );
  }
}

export default Counters;
