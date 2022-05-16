import React from "react";
import {Button, Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import {MdAddShoppingCart} from "react-icons/all";

const Product = (props) => {
  return <div>
      <Card>
          <CardMedia
              style={{ borderStyle: "none" }}
              component="img"
              height="190"
              image=""
              src={`http://localhost:3000/images/${props.product.image}`}
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
                  onClick={}
              >
                  Add
              </Button>
          </div>
      </Card>
  </div>;
};

export default Product;
