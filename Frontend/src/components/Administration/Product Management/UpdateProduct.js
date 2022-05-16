import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import {
  Card,
  Container,
  Form,
  Row,
  Col,
  Image,
  Dropdown,
} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import ImagePreview from "./ImagePreview";

function UpdateProduct() {
  const location = useLocation();
  const [product, setproduct] = useState(location.state.product);
  const [Small, setSmall] = useState(location.state.product.prices.small);
  const [Regular, setRegular] = useState(location.state.product.prices.regular);
  const [Large, setLarge] = useState(location.state.product.prices.large);
  const [Medium, setMedium] = useState(location.state.product.prices.medium);
  const [title, setTitle] = useState(location.state.product.title);
  const [description, setDescription] = useState(
    location.state.product.description
  );
  const [topping, setTopping] = useState("");
  const [status, setStatus] = useState(location.state.product.status);
  const [image, setImage] = useState(location.state.product.image);
  const [validated, setValidated] = useState(false);
  const history = useHistory();

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

  useEffect(() => {
    if (product.prices.small > 0) {
      const txt = document.getElementById("Small");
      const box = document.getElementById("small_check");
      box.checked = true;
      txt.disabled = box.checked ? false : true;
      if (!txt.disabled) {
        txt.focus();
      }
    }
    if (product.prices.medium > 0) {
      const txt = document.getElementById("Medium");
      const box = document.getElementById("medium_check");
      box.checked = true;
      txt.disabled = box.checked ? false : true;
      if (!txt.disabled) {
        txt.focus();
      }
    }
    if (product.prices.large > 0) {
      const txt = document.getElementById("Large");
      const box = document.getElementById("large_check");
      box.checked = true;
      txt.disabled = box.checked ? false : true;
      if (!txt.disabled) {
        txt.focus();
      }
    }
  }, [image]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onChange = (e) => {
    const txt = document.getElementById([e.target.name]);
    txt.disabled = !e.target.checked;
    if (!txt.disabled) {
      txt.focus();
    }
  };

  const getIndexOfArray = (array, item) => {
    let i = 0;
    while (i < array.length) {
      if (array[i].value === item) {
        return i;
      } else {
        ++i;
      }
    }
  };

  const submitDetails = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("file", image);
    data.append("small", Small);
    data.append("medium", Medium);
    data.append("large", Large);
    data.append("regular", Regular);
    data.append("status", status);

    console.log(data);
    console.log(product._id);
    axios
      .patch(`http://localhost:8070/products/edit/${product._id}`, data)
      .then((res) => {
        alert("data successfully updated!!!");
        history.push("/admin/view-products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container className={"pt-3"}>
        <Card className={"p-5 mb-3"}>
          <div className="text-center mb-2">
            <h1 className="form-titles ">Update Product</h1>
            <hr className="divide" />
          </div>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              name="title"
              defaultValue={product.title}
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
              defaultValue={product.description}
              rows={3}
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Group>

          <>
            <ImagePreview
              product={product}
              handleImageChange={handleImageChange}
            />
          </>

          <br />

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Check
                id="small_check"
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
                defaultValue={product.prices.small}
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
                id="medium_check"
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
                defaultValue={product.prices.medium}
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
                id="large_check"
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
                defaultValue={product.prices.large}
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
                defaultValue={product.prices.regular}
                onChange={(e) => {
                  setRegular(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Row>

          {/*<Row className="mb-3">*/}
          {/*  <Form.Group as={Col} controlId="formGridState">*/}
          {/*    <Form.Label>Add topings(Optional)</Form.Label>*/}
          {/*  </Form.Group>*/}

          {/*  <div className="form-group">*/}
          {/*    <Select*/}
          {/*      options={options}*/}
          {/*      onChange={(e) => {*/}
          {/*        setTopping(topping);*/}
          {/*      }}*/}
          {/*      value="dfdefd"*/}
          {/*      required*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</Row>*/}
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
                defaultValue={
                  categories[getIndexOfArray(categories, product.status)]
                }
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
            onClick={submitDetails}
          >
            Submit
          </Button>
        </Card>
      </Container>
    </div>
  );
}

export default UpdateProduct;
