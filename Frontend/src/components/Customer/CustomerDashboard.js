import React from "react";
import { Switch } from "react-router-dom";
import UserRoutes from "../../routes/UserRoutes";
import CustomerNavbar from "./Main Pages/Supportive Files/CustomerNavbar";
import BottomBar from "./Main Pages/Supportive Files/CustomerBottomBar";
import Home from "./Main Pages/Home";

function CustomerDashboard(props) {
  return (
    <div className={"dash"}>
      <div className={"customer-container"}>
        <Switch>
          <UserRoutes />
        </Switch>
      </div>
    </div>
  );
}

export default CustomerDashboard;
