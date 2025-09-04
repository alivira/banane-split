import React, { Component } from "react";
import Counter from "./counter";
import UserName from "./username";
import LineTotal from "./lineTotals";
import UserTotal from "./userTotals";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import IconButton from "@mui/material/IconButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CancelIcon from "@mui/icons-material/Cancel";

import { createTheme, ThemeProvider } from "@mui/material/styles";

class Counters extends Component {
  state = {
    modifyUsersModalOpen: false,
  };

  handleOpenModifyUsers = () => {
    this.setState({ modifyUsersModalOpen: true });
  };

  handleCloseModifyUsers = () => {
    this.setState({ modifyUsersModalOpen: false });
  };

  render() {
    const {
      onAddRow,
      onReset,
      onDelete,
      onAddUser,
      onRemoveUser,
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
          <Container style={{ overflowX: "scroll" }}>
            <Row style={{ marginBottom: "10px", flexWrap: "nowrap" }}>
              <Col xs="auto" style={{ width: "450px" }}>
                <h6
                  style={{
                    textAlign: "center",
                    color: "grey",
                    fontWeight: "400",
                  }}
                >
                  Line Items
                </h6>
              </Col>
              <Col xs="auto" style={{ width: "585px" }}>
                <h6
                  style={{
                    textAlign: "center",
                    color: "grey",
                    fontWeight: "400",
                  }}
                >
                  Portions
                </h6>
              </Col>
            </Row>

            <Row style={{ flexWrap: "nowrap" }}>
              <Col
                xs="auto"
                style={{ paddingRight: "170px", paddingLeft: "15px" }}
              >
                <IconButton color="primary" onClick={onReset}>
                  <RestartAltIcon />
                </IconButton>
              </Col>
              <Col xs="auto">
                <IconButton color="primary" onClick={onAddRow}>
                  <PostAddIcon />
                </IconButton>
              </Col>

              <Col xs="auto" style={{ marginRight: "10px" }}>
                <IconButton color="primary" onClick={onAddUser}>
                  <PersonAddIcon />
                </IconButton>
              </Col>
              <Col xs="auto" style={{ marginRight: "25px" }}>
                <IconButton
                  color="primary"
                  onClick={this.handleOpenModifyUsers}
                >
                  <PersonRemoveIcon />
                </IconButton>
              </Col>

              {this.props.users.map((user) => (
                <Col
                  key={user.id}
                  style={{ width: "100px", minWidth: "100px" }}
                >
                  <UserName user={user} updateName={updateName}></UserName>
                </Col>
              ))}
            </Row>

            <div style={{ marginBottom: "8px" }}>
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

            <div style={{ marginTop: "30px" }}> </div>

            <Row style={{ flexWrap: "nowrap" }}>
              <Col
                xs="auto"
                style={{ marginLeft: "50px", marginRight: "51px" }}
              >
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
                <Col
                  key={user.id}
                  style={{ width: "100px", minWidth: "100px", marginLeft: "0" }}
                >
                  <UserTotal
                    user={user}
                    users={users}
                    globalGrandTotal={grandtotal}
                  ></UserTotal>
                </Col>
              ))}
            </Row>
          </Container>

          {/* Modify Users Modal */}
          <Modal
            open={this.state.modifyUsersModalOpen}
            onClose={this.handleCloseModifyUsers}
            aria-labelledby="modify-users-modal"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography
                id="modify-users-modal"
                variant="h6"
                component="h2"
                style={{ marginBottom: "20px" }}
              >
                Manage Users
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }}>
                Click the red X to remove a user. You must have at least one
                user.
              </Typography>
              {this.props.users.map((user) => (
                <div
                  key={user.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{user.name}</span>
                  <IconButton
                    aria-label="cancel"
                    color="error"
                    onClick={() => {
                      onRemoveUser(user.id);
                    }}
                    disabled={this.props.users.length <= 1}
                  >
                    <CancelIcon />
                  </IconButton>
                </div>
              ))}
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Button
                  onClick={this.handleCloseModifyUsers}
                  variant="outlined"
                >
                  Close
                </Button>
              </div>
            </Box>
          </Modal>
        </ThemeProvider>
      </div>
    );
  }
}

export default Counters;
