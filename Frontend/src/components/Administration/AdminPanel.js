import React, { useState } from "react";
import AdminSideBar from "./Admin Navigation/AdminSideBar";
import AdminRoutes from "../../routes/AdminRoutes";
import { Switch } from "react-router-dom";

function AdminPanel(props) {
  const [active, setActive] = useState(false);
  return (
    <div>

      <AdminSideBar
        onCollapse={(active) => {
          console.log(active);
          setActive(active);
        }}
      />
      <div className={`admin-container ${active ? "active" : ""}`}>
        <Switch>
          <AdminRoutes />
        </Switch>
      </div>
    </div>
  );
}

export default AdminPanel;
