import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Button, Typography } from "@material-ui/core";

function ChangePassword(props) {
  return (
    <div>
      <Card className={"p-5 mb-3"}>
        {" "}
        <div className="text-center mb-2">
          <h1 className="form-titles ">Change Password</h1>
          <hr className="divide" />
        </div>
        <Typography
          style={{ color: "#e23636" }}
          className={"mb-2"}
          variant="caption"
        >
          *You are about to change you password. Hope you know what you are
          doing
        </Typography>
        <Form.Group className={"mb-3"} as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
          />
        </Form.Group>
        <Form.Group className={"mb-3"} as={Col} controlId="formGridPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            // onChange={(e) => {
            //   setCPassword(e.target.value);
            // }}
          />
        </Form.Group>
        <div className="d-flex  gap-2">
          <Button
            className={"cancel-button"}
            variant="outlined"
            onClick={() => {
              props.close("change");
            }}
          >
            Cancel
          </Button>
          <Button
            className={"save-button"}
            variant="outlined"
            // onClick={() => {
            //   props.fun("address");
            // }}
          >
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ChangePassword;
