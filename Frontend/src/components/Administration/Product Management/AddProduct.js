import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Card, Container, Form, Row, Col, Dropdown } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { Link } from "react-router-dom";
import { ImExit } from "react-icons/all";

function AddProduct(props) {
  const [imgPreview, setimgPreview] = useState(null);
  const [error, setError] = useState(false);
  const [Small, setSmall] = useState(0);
  const [Regular, setRegular] = useState(0);
  const [Large, setLarge] = useState(0);
  const [Medium, setMedium] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topping, setTopping] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState([]);
  const [validated, setValidated] = useState(false);

  const categories = [
    {
      value: "Pizzas",
      label: "Pizzas",
    },
    {
      value: "Pastas",
      label: "Pastas",
    },
    {
      value: "Appetizers",
      label: "Appetizers",
    },
    {
      value: "Desserts",
      label: "Desserts",
    },
    {
      value: "Beverages",
      label: "Beverages",
    },
  ];

  const options = [
    {
      value: "List1",
      label: "List1",
    },
    {
      value: "List2",
      label: "List2",
    },
    {
      value: "List3",
      label: "List3",
    },
  ];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  };

  const onChange = (e) => {
    const txt = document.getElementById([e.target.name]);
    txt.disabled = e.target.checked ? false : true;
    if (!txt.disabled) {
      txt.focus();
    }
  };

  const submitDetails = (e) => {
    const form = e.currentTarget;

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("file", image);
    data.append("small", Small);
    data.append("medium", Medium);
    data.append("large", Large);
    data.append("regular", Regular);
    data.append("status", status);
    console.log(status);
    console.log(image);
    axios
      .post("http://localhost:8070/products/add", data)
      .then((res) => {
        window.location = "/admin/view-products";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container className={"pt-3"}>
        <Card className={"p-5 mb-3"}>
          <div className={"go-back-icon"}>
            <Link to={"/admin/view-products"}>
              <ImExit color={"black"} />
            </Link>
          </div>
          <div className="text-center mb-2">
            <h1 className="form-titles ">ADD PRODUCTS</h1>
            <hr className="divide" />
          </div>

          <Form noValidate validated={validated} onSubmit={submitDetails}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                name="title"
                type="text"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>

            <>
              <p>Add an image</p>
              <label htmlFor="fileUpload" className="customeFileUplad">
                Choose File
              </label>
              <input
                class="form-control"
                type="file"
                id="fileUpload"
                onChange={handleImageChange}
                multiple
                required
              />
              <span>(jpg, jpeg 0r png)</span>
            </>

            <br />

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Check
                  type="checkbox"
                  label="Small"
                  name="Small"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  id="Small"
                  name="Small"
                  placeholder="Price"
                  disabled={true}
                  onChange={(e) => {
                    setSmall(e.target.value);
                    console.log(Small);
                  }}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Check
                  type="checkbox"
                  label="Medium"
                  name="Medium"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  id="Medium"
                  name="Medium"
                  placeholder="Price"
                  disabled={true}
                  onChange={(e) => {
                    setMedium(e.target.value);
                    console.log(Medium);
                  }}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Check
                  type="checkbox"
                  label="Large"
                  name="Large"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  id="Large"
                  name="Large"
                  placeholder="Price"
                  disabled={true}
                  onChange={(e) => {
                    setLarge(e.target.value);
                    console.log(Large);
                  }}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Check
                  type="checkbox"
                  label="Regular"
                  name="Regular"
                  onChange={onChange}
                  checked={true}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  id="Regular"
                  name="Regular"
                  placeholder="Price"
                  onChange={(e) => {
                    setRegular(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Add topings(Optional)</Form.Label>
              </Form.Group>

              <div className="form-group">
                <Select
                  options={options}
                  onChange={(e) => {
                    setTopping(topping);
                  }}
                  required
                />
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
              </Form.Group>

              <div className="form-group">
                <Select
                  required
                  aria-label=".form-select-lg example"
                  options={categories}
                  onChange={(e) => {
                    setStatus(e.value);
                  }}
                />
              </div>
            </Row>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#d00000",
                color: "#FFF",
              }}
            >
              Add
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default AddProduct;
