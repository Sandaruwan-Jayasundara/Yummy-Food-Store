import React, { useEffect, useState } from "react";
import axios from "axios";

//Logout Function
function Logout(props) {

    axios
      .get("http://localhost:8070/auth/logout")
      .then((response) => {
        localStorage.removeItem("user");
        localStorage.removeItem("userid");
        localStorage.removeItem("icon_id");
        localStorage.removeItem("Email");
        localStorage.removeItem("__paypal_storage__");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
}
export default Logout;
