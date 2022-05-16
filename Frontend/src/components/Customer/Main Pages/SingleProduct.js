import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { MdAddShoppingCart } from "react-icons/all";
import { Modal, Form, ToggleButton } from "react-bootstrap";

const SingleProduct = (props) => {
  const [model, setModelView] = useState(false);
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
 

  const history = useHistory();
//these are the options thats are use in the select size dropdown
  const options = [
    { value: "Small", label: "Small" },
    { value: "Medium", label: "Medium" },
    { value: "Large", label: "Large" },
    { value: "Regular", label: "Regular" },
  ];

  //This function is use to increment the count variable
  function increamentCount() {
    setCount(count + 1);
  }
  
  //This function is use to decrement the count variable
  function decreamentCount() {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  //This fucntion is use to close the pop up window in menu.js page
  const handleClose = () => setModelView(false);
  //This function is use to trigger popup window when press add to cart button
  const handleShow = () => setModelView(true);

  //This function get purticular user responses and add product to the cart using Cart API
  function addToCart() {
    const cartItem = {
      qty: count,
      product_id: props.product._id,
      price: price,
      title: props.product.title,
      size: size,
      user:localStorage.getItem("userid"),
      image:props.product.image
    };
    axios
      .get(`http://localhost:8070/carts/${localStorage.getItem("userid")}/${props.product._id}/${size}`)
      .then((res) => {
     const Item=res.data[0];
     return Item;
      
      })
      .then((Item) => {
        console.log(Item)
        if (Item != null) {
          const newCartItem = {
            qty: count+Item.qty,
          };
          axios
            .patch(
              `http://localhost:8070/carts/update/${Item._id}`,
              newCartItem
            )
            .then((res) => {
              console.log(res);
              alert("product successfully added to the cart");
            });
        } else {
          axios
            .post(`http://localhost:8070/carts/add`, cartItem)
            .then((res) => {
              console.log(res);
              alert("product successfully added to the cart");
            })
            .catch((err) => {
              console.log(cartItem)
              console.log(err);
            });
        }
      });
    setModelView(false);
  }
//This function is use to set size varibale with user response that come as onclick event
  function selectSize(e) {
    const value = e.value;
    if (value == "Small") {
      setPrice(props.product.prices.small);
      setSize("small");
    } else if (value == "Medium") {
      setPrice(props.product.prices.medium);
      setSize("medium");
    } else if (value == "Large") {
      setPrice(props.product.prices.large);
      setSize("large");
    } else {
      setPrice(props.product.prices.regular);
      setSize("regular");
    }
  }

  return (
    <div>
      <Card>
        <CardMedia
          style={{ borderStyle: "none" }}
          component="img"
          height="190"
          image=""
          src={`http://localhost:3000/Profile/${props.product.image}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom component="h2">
            {props.product.title}
          </Typography>
          <Typography
            style={{ fontSize: "12px" }}
            color="textSecondary"
            component="p"
          >
            {props.product.description}
          </Typography>
          <Typography
            style={{ fontSize: "11px", textAlign: "end" }}
            component="div"
            color="textSecondary"
          >
            Starting From :{" "}
            <Typography color="textPrimary" component="span">
              {props.product.prices.regular}
            </Typography>
          </Typography>
        </CardContent>
        <div className="d-flex justify-content-around ">
          <Button
            size="small"
            style={{ backgroundColor: "#70a401", color: "white" }}
            className={"m-2"}
          >
            Customize
          </Button>
          <Button
            style={{ backgroundColor: "#e13340", color: "white" }}
            size="small"
            color="primary"
            className={"m-2"}
            startIcon={<MdAddShoppingCart />}
            onClick={handleShow}
          >
            Add
          </Button>
        </div>
      </Card>
      <Modal show={model} onHide={handleClose} animation={true}>
        <Modal.Header className={"d-flex justify-content-center"}>
          <Modal.Title>Add to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Select Size</Form.Label>
          <Form.Group>
            {" "}
            <Select
              // value={selectedOption}
              onChange={selectSize}
              options={options}
            />
          </Form.Group>
          <div className={"d-flex justify-content-center pt-3"}>
            <Button
              style={{
                color: "#c92e31",
              }}
              onClick={increamentCount}
            >
              +
            </Button>
            <span
              className={"p-2"}
              style={{
                fontSize: "18px",
                fontStyle: "bolder",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              {count}
            </span>
            <Button
              style={{
                color: "#c92e31",
              }}
              onClick={decreamentCount}
            >
              -
            </Button>
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer className={"d-flex justify-content-center"}>
          <Button
            variant="primary"
            startIcon={<MdAddShoppingCart />}
            type={"submit"}
            onClick={addToCart}
            style={{ backgroundColor: "#e13340", color: "white" }}
          >
            Add
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingleProduct;
