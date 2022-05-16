import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
function OrderItem(props) {
  return (
    <div>
      {" "}
      <div>
        <div className={"list-order-item  d-flex justify-content-between"}>
          <div>
            <div>
              <span className={"order-title"}>ORDER ID: {props.order._id}</span>
            </div>
            <div>
              <span className={"order-desc"}>{props.order.order_date}</span>
            </div>
          </div>{" "}
          <div className={" d-grid "}>
            <div>
              <span className={"status-title "}>{props.order.status}</span>
            </div>
            <div>
              <span className={"status"}>Status</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
