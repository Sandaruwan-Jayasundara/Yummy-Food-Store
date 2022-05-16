import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import "../../../stylesheets/Profile.css";
import { Button } from "@material-ui/core";
import {
  FaRegAddressBook,
  MdNotificationsNone,
  RiHistoryLine,
  RiSettings2Line,
  RiSuitcaseFill,
} from "react-icons/all";
import CurrentOrders from "./Profile Sub Components/CurrentOrders";
import OrderHistory from "./Profile Sub Components/OrderHistory";
import AddressBook from "./Profile Sub Components/AddressBook";
import Notifications from "./Profile Sub Components/Notifications";
import Settings from "./Profile Sub Components/Settings";
function Profile(props) {
  const [section, setSectionState] = useState("current-orders");
  function openSection(value) {
    console.log(value);
    setSectionState(value);
  }
  return (
    <div>
      <Container fluid>
        {/*</div>*/}
        <div className="d-flex gap-2">
          <Card className={"profile-box text-center"}>
            <div className="text-center">
              <h1 className="account-titles">My Profile</h1>
            </div>
            <div>
              <img
                src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800"
                className={"profile-image"}
              />
            </div>
            <div className="d-grid mb-3">
              <span className={"profile-text"}>Mandara Fernando</span>
              <span className={"number-text"}>+94 77 8341425</span>
            </div>
            <div className="d-grid ">
              <Button
                className={"profile-button"}
                startIcon={<RiSuitcaseFill />}
                onClick={() => openSection("current-orders")}
              >
                Current Orders
              </Button>{" "}
              <Button
                className={"profile-button"}
                startIcon={<RiHistoryLine />}
                onClick={() => openSection("order-history")}
              >
                Order History
              </Button>{" "}
              <Button
                className={"profile-button"}
                startIcon={<FaRegAddressBook />}
                onClick={() => openSection("address-book")}
              >
                Address Book
              </Button>{" "}
              <Button
                className={"profile-button"}
                startIcon={<MdNotificationsNone />}
                onClick={() => openSection("notifications")}
              >
                Notifications
              </Button>{" "}
              <Button
                className={"profile-button"}
                startIcon={<RiSettings2Line />}
                onClick={() => openSection("settings")}
              >
                Settings
              </Button>
            </div>
          </Card>
          <div style={{ width: "100%" }}>
            <div
              className={`profile-content ${
                section === "current-orders" || "" ? "" : "d-none"
              }`}
            >
              <CurrentOrders />
            </div>{" "}
            <div
              className={`profile-content ${
                section === "order-history" ? "" : "d-none"
              }`}
            >
              <OrderHistory />
            </div>{" "}
            <div
              className={`profile-content ${
                section === "address-book" ? "" : "d-none"
              }`}
            >
              <AddressBook />
            </div>{" "}
            <div
              className={`profile-content ${
                section === "notifications" ? "" : "d-none"
              }`}
            >
              <Notifications />
            </div>{" "}
            <div
              className={`profile-content ${
                section === "settings" ? "" : "d-none"
              }`}
            >
              <Settings />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
