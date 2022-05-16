import React from "react";
import { Card, Col, DropdownButton, Form, Row } from "react-bootstrap";
import { Button, Divider, Paper, Select, Typography } from "@material-ui/core";
import "../../../../../stylesheets/DeliveryPop.css";
import { Link, useHistory } from "react-router-dom";

function DeliveryPop(props) {
  let history = useHistory();
  const options = [
    { value: "My Home", label: "My Home" },
    { value: "My Office", label: "My Office" },
  ]; // get all saved addresses here axios

  return (
    <div>
      <Card className={"p-5 mb-3"}>
        {" "}
        <div className="text-center mb-2">
          <h1 className="form-titles ">Choose Your Location</h1>
          <hr className="divide" />
        </div>
        <Row className="mb-3">
          <Typography style={{ color: "#747474" }} variant="caption">
            *Hint: Delivery options and delivery speeds may vary for different
            locations.
          </Typography>
          <div className={"selected-box"}>
            <Typography variant="subtitle2">
              Receiver's Name - City - Address
            </Typography>
            <Typography className={"default-tag"} variant="overline">
              Default Address
            </Typography>
          </div>
          <div>
            <h6 className="text-divider">
              <span>or select a saved address</span>
            </h6>{" "}
          </div>
          <div className={"mb-4"}>
            <Form.Group>
              {" "}
              <Select
                className={"text-center"}
                native
                variant={"outlined"}
                fullWidth={true}
                // value={selectedOption}
                onChange={""} //Refer Single product.js Modal tag
              >
                {" "}
                {/*<option aria-label="None" value="" />*/}
                {/*loop below*/}
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </Form.Group>
          </div>

          <div className="d-flex gap-2">
            <Button
              className={"address-button"}
              variant="outlined"
              onClick={() => {
                props.fun("address");
                history.push("/home");
              }}
            >
              Manage address book
            </Button>

            <Button
              className={"done-button"}
              variant="outlined"
              onClick={() => {
                props.fun("address");
              }}
            >
              Done
            </Button>
          </div>
        </Row>
      </Card>
    </div>
  );
}

export default DeliveryPop;
