import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { IoLocationSharp, IoSearchOutline } from "react-icons/all";
import "../../../../stylesheets/CustomerNav.css";
import {
  Badge,
  Button,
  Dialog,
  Grow,
  Menu,
  MenuItem,
  Slide,
} from "@material-ui/core";
import axios from "axios";
import { ShoppingCart } from "@material-ui/icons";
import Login from "../../../Authentications/Login";
import SignUp from "../../../Authentications/SignUp";
import DeliveryPop from "./Delivery/DeliveryPop";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

function CustomerNavbar(props) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

 const [text,setText]=useState('');

  const [openSignIn, setSignIn] = useState(false);
  const [openSignUp, setSignUp] = useState(false);
  const [openAddress, setAddress] = useState(false);
  const [count,setCount]=useState(0);

  const handleClickOpenPop = (value) => {
    if (value === "login") {
      setSignIn(true);
    } else if (value === "address") {
      setAddress(true);
    } else {
      setSignUp(true);
    }
  };

  const handleClosePop = (value) => {
    if (value === "login") {
      setSignIn(false);
    } else if (value === "address") {
      setAddress(false);
    } else {
      setSignUp(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


const search=()=>{
  window.location=`/search/${text}`;
}


  const closeFromChild = (value) => {
    if (value === "login") {
      handleClosePop("");
      handleClickOpenPop("login");
    } else {
      handleClosePop("login");
      handleClickOpenPop("");
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8070/carts/count/${localStorage.getItem('Email')}`)
      .then((res) => {
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log("err=>" + err);
      });
  }, [count]);

  const Logout = () => {
    axios
      .get("http://localhost:8070/auth/logout")
      .then((response) => {
        localStorage.removeItem("user");
        localStorage.removeItem("userid");
        localStorage.removeItem("icon_id");
        localStorage.removeItem("userName");
        localStorage.removeItem("Email");
        localStorage.removeItem("__paypal_storage__");

        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const role = localStorage.getItem("user");
  return (
    <div>
      <Navbar
        collapseOnSelect
        className={"customer-nav"}
        expand={"lg"}
        variant={"dark"}
        bg={"dark"}
      >
        <Container fluid={"lg"} className={"mt-1 mb-1"}>
          <Navbar.Brand href="/">
            <img src={"Pizza.svg"} height={70} width={110} />{" "}
          </Navbar.Brand>
          <Nav className="me-auto" style={{ maxHeight: "100px" }} navbarScroll>
            <Button
              className="deliver-button "
              onClick={() => handleClickOpenPop("address")}
              startIcon={<IoLocationSharp className={"deliver-icon"} />}
            >
              <div>
                <span
                  className={"d-block  text-deliver "}
                  style={{
                    fontSize: 13,
                    fontWeight: "lighter",
                    color: "#dedede",
                  }}
                >
                  {" "}
                  Deliver to
                </span>
                <span
                  className={`d-block text-deliver p-0 m-0 ${
                    role ? "d-none" : ""
                  }`}
                >
                  Your Address
                </span>
                <span
                  className={`d-block text-deliver p-0 m-0 ${
                    role ? "" : "d-none"
                  }`}
                >
                  Your Address
                </span>
              </div>
            </Button>
          </Nav>
          <Form className="d-flex me-auto ">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
              className={"bar"}
              onChange={(e)=>{
                setText(e.target.value);
              }}
            />

            <Button
              className={"search-button"}
              startIcon={<IoSearchOutline style={{ color: "white" }} />}
   	      onClick={search}
            />
          </Form>{" "}
          <div
            className={`${role ? "d-none" : ""} `}
            style={{
              marginRight: "10px",
            }}
          >
            <Button
              className="sign-button"
              onClick={() => handleClickOpenPop("login")}
            >
              <span className={"button-text"}> Sign In</span>
            </Button>
          </div>
          <div className={`${role ? "d-none" : ""} `}>
            <Button
              className="signup-button"
              onClick={() => handleClickOpenPop("")}
            >
              <span className={"button-text"}> Sign Up</span>
            </Button>
          </div>{" "}
          <div className={`${role ? "" : "d-none"} `}>
            <Badge
              badgeContent={count}
              color="secondary"
            >
              <ShoppingCart
                style={{
                  color: "white",
                  fontSize: 32,
                }}
                onClick={() => (window.location.href = "/cart")}
                className={"menu-icons"}
              />
            </Badge>

            <AccountCircleIcon
              style={{
                color: "white",
                marginLeft: 20,
                fontSize: 32,
              }}
              className={"menu-icons"}
              onClick={handleClick}
            />
            <Menu
              className={"p-2"}
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              {" "}
              <MenuItem onClick={handleClose}>Submissions</MenuItem>
              <MenuItem onClick={() => history.push("/customer/profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={Logout}>Logout</MenuItem>
            </Menu>
          </div>
        </Container>
      </Navbar>

      <Dialog
        style={{ zIndex: 10000 }}
        open={openSignIn}
        fullWidth={true}
        maxWidth={"md"}
        TransitionComponent={Grow}
        onClose={() => handleClosePop("login")}
      >
        <div>
          <Login fun={closeFromChild} />
        </div>
      </Dialog>
      <Dialog
        style={{ zIndex: 10000 }}
        open={openSignUp}
        fullWidth={true}
        maxWidth={"md"}
        TransitionComponent={Grow}
        onClose={() => handleClosePop("")}
      >
        <SignUp fun={closeFromChild} />
      </Dialog>
      <Dialog
        style={{ zIndex: 10000 }}
        open={openAddress}
        fullWidth={true}
        TransitionComponent={Slide}
        onClose={() => handleClosePop("address")}
      >
        <DeliveryPop fun={handleClosePop} />
      </Dialog>
    </div>
  );
}

export default CustomerNavbar;
