import React, { useState } from 'react';
import { Card, Col, Form, Row } from "react-bootstrap";
import { Button, Typography } from "@material-ui/core";
import Select from "react-select";
import axios from 'axios';

function AddAddress(props) {
  const options = [
    { value: "Colombo", label: "Colombo" },
    { value: "Galle", label: "Galle" },
    { value: "Kandy", label: "Kandy" },
    { value: "Kaluthara", label: "Kaluthara" },
    { value: "Kurunegala", label: "Kurunegala" },
  ];

  const [fullname,setFullName]=useState(props.address.fullname);
  const [email,setEmail]=useState(props.address.user);
  const [address,setAddress]=useState(props.address.address);
  const [city,setCity]=useState(props.address.city);
  const [zipcode,setZipcode]=useState(props.address.zipcode);
  const [state,setState]=useState(props.address.state);

  return (
    <div>
      <Card className={"p-5 mb-3"}>
        {" "}
        <div className="text-center mb-2">
          <h1 className="form-titles ">Add New Address</h1>
          <hr className="divide" />
        </div>
        <Form.Group as={Col} controlId="formGridAddress">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
          defaultValue={props.address.fullname}
            onChange={(e) => {
               setFullName(e.target.value);
            }}
          />

          <Form.Label>Address</Form.Label>
          <Form.Control
              type="text"
              defaultValue={props.address.address}
              onChange={(e) => {
               setAddress(e.target.value);
             }}
          />


        </Form.Group>
        <div className={"mb-4"}>
          <Form.Group className={"mb-4"}>
            <Form.Label>City</Form.Label>
            <Select
              maxMenuHeight={125}
             onChange={(e)=>{
               setCity(e.value);
             }}
              options={options}
            />
          </Form.Group>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
              type="text"
              defaultValue={props.address.zipcode}
              onChange={(e) => {
                  setZipcode(e.target.value);
               }}
          />

          <Form.Label>State</Form.Label>
          <Form.Control
              type="text"
              defaultValue={props.address.state}
               onChange={(e) => {
                  setState(e.target.value);
              }}
          />


        </div>



        <div className="d-flex  gap-2">
          <Button
            className={"cancel-button"}
            variant="outlined"
            onClick={() => {
              props.close("add");
            }}
          >
            Cancel
          </Button>
          <Button
            className={"save-button"}
            variant="outlined"
            onClick={() => {
                const newAddress={
                  fullname:fullname,
                  address:address,
                  city:city,
                  zipcode:zipcode,
                  state:state
                }
                axios.patch(`http://localhost:8070/deliveries/update/${props.address._id}`,newAddress).then(res=>{
                  alert("Delivery details updated successfully");
                  
                  }).catch(err=>{
                      console.log(err)
                  })
             }}
          >
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default AddAddress;
