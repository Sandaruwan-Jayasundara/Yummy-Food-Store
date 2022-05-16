import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/all";
import { Grid, Paper } from "@material-ui/core";
import SingleProduct from "./SingleProduct";

//menu function 
const Home = () => {
  const [category, setCategoryState] = useState("");
  const [products, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8071/products")//retrieve all the products using api
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log("err=>" + err);
      });
  }, [category]);
  
  //This function is to set category when customer click one of the category button
  function openFoodList(cat) {
    console.log(cat);
    setCategoryState(cat);
  }


  return (
    <Container fluid={"lg"}>
      <div className="d-flex gap-2">
   
        <div className={"p-3"} style={{ width: "100%" }}>
          <div className={`tab-content ${category === "" ? "active" : ""}`}>

            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products.map((product, index) => {
                return (
                  <Grid item xs={4}>
                    <Paper>
                      <SingleProduct product={product} />
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <div
            className={`tab-content ${category === "Pizza" ? "active" : ""}`}
          >
            <h1 className="food-titles">Pizza</h1>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products
                .filter((product) => {
                  if (product.status == "Pizzas") { 
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <Grid item xs={4}>
                      <Paper>
                        <SingleProduct product={product} />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
          <div
            className={`tab-content ${
              category === "Appetizers" ? "active" : ""
            }`}
          >
            <h1 className="food-titles">Appetizers</h1>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products
                .filter((product) => {
                  if (product.status == "Appetizers") {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <Grid item xs={4}>
                      <Paper>
                        <SingleProduct product={product} />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
          <div
            className={`tab-content ${category === "Pastas" ? "active" : ""}`}
          >
            <h1 className="food-titles">Pastas</h1>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products
                .filter((product) => {
                  if (product.status == "Pastas") {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <Grid item xs={4}>
                      <Paper>
                        <SingleProduct product={product} />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
          <div
            className={`tab-content ${category === "Desserts" ? "active" : ""}`}
          >
            <h1 className="food-titles">Desserts</h1>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products
                .filter((product) => {
                  if (product.status == "Desserts") {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <Grid item xs={4}>
                      <Paper>
                        <SingleProduct product={product} />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
          <div
            className={`tab-content ${
              category === "Beverages" ? "active" : ""
            }`}
          >
            <h1 className="food-titles">Beverages</h1>
            <hr className="food-divide" />
            <Grid container spacing={3}>
              {products
                .filter((product) => {
                  if (product.status == "Beverages") {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <Grid item xs={4}>
                      <Paper>
                        <SingleProduct product={product} />
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
