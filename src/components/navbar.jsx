import React, { Component } from "react";
import logo from "../images/bananeLogo.svg";

const NavBar = ({ totalCounters }) => {
  return (
    <nav class="navbar">
      <div class="container-fluid">
        <img
          src={logo}
          style={{ width: "100px", margin: "10px" }}
          alt="logo"
        ></img>
      </div>
    </nav>
  );
};

export default NavBar;
