
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Customer/Main Pages/Home";
import Payment from "../components/Customer/Main Pages/Checkout/Payment";
import Menu from "../components/Customer/Menu";
import Cart from "../components/Customer/Main Pages/Cart";
import Profile from "../components/Customer/Profile/Profile";
import Checkout from "../components/Customer/Main Pages/Checkout";
import Search from "../components/Customer/Main Pages/Search";

function UserRoutes() {
  return (
    <>
      <Route path="/" exact component={Home} />

      <Route path="/home" exact component={Home} />
      
      <Route path="/menu" component={Menu} />
        
      <Route path="/cart" component={Cart} />

      <Route path="/payment" component={Payment} />

      <Route path="/checkout" component={Checkout} />
      <Route path="/search/:keyword" component={Search} />
      <Route path="/customer/profile" component={Profile} />

    

    </>
  );
}

export default UserRoutes;
