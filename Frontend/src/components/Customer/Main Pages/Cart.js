import React, {useEffect, useState} from "react";
import {
    Card,
    Col,
    Container,
    Row,
    Table
} from "react-bootstrap";
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import {GrNext, MdAddShoppingCart} from "react-icons/all";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import axios from "axios";


import { useHistory } from "react-router";


function Cart(props) {
    const [products, setProducts] = useState([]);
    const history=useHistory();
    const [total,setTotal]=useState(0);
    const [value,setValue]=useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8070/carts/${localStorage.getItem("userid")}`).then((res) => {

        console.log(res.data);
            setProducts(res.data);
        }).then(()=>{
          axios.get(`http://localhost:8070/carts/total/${localStorage.getItem("userid")}`).then(res=>{
        setTotal(res.data.total);
           console.log(total);
})
        }).catch((err) => {
            console.log("err=>" + err);
        });
    }, [value]);

//remove products using product id
    const removeProduct = (product) => {
        axios.delete(`http://localhost:8070/carts/delete/${
            product._id
        }`).then((res) => {
            setValue(value+1);

        }).catch((err) => {
            console.log("err=>" + err);
        });
    }

//This function is to update the product qty of product in the cart 
    function increamentCount(p) {
        const qty = p.qty + 1;
        const product = {
            qty: qty
        }
        axios.patch(`http://localhost:8070/carts/update/${
            p._id
        }`, product).then(res => {
            setValue(value+1);
        }).catch(err => {
            console.log(err);
        })
    }
//This function use to get total amount of cost of the cart items
    function getTotal() {
      return total;
    }

    function continueToCheckout(){
     if(total>0){
        history.push({
            pathname:"/checkout",
              state:{
             total:total,
             product:products
             }
          })
     }else{
         alert('There Are No Items To Checkout')
     }
       
    }


    //This function use to update product qty(decrement the count)
     function decreamentCount(p) {
        if (p.qty > 0) {
            const qty = p.qty - 1;
            const product = {
                qty: qty
            }
            axios.patch(`http://localhost:8070/carts/update/${
                p._id
            }`, product).then(res => {
                setValue(value+1);
            }).catch(err => {
                console.log(err);
            })
        }
    }
    return (
        <Container fluid={"lg"}>
            {/*<div className="text-center">*/}
            {/*  <h1 className="main-titles">Cart</h1>*/}
            {/*  <hr className="main-divide" />*/}
            {/*</div>*/}
            <Card className={"mt-2"}>
                <Card.Body>
                    <Row>
                        <Col lg={9}>
                            <div className="">
                                <h1 className="cart-titles">Cart</h1>
                                <hr className="food-divide"/>
                            </div>
                            <Grid container
                                spacing={3}>
                                {
                                products.map((product, index) => {
                                    return (
                                        <Grid item
                                            xs={12}>
                                            <Paper className={"p-2 "}>
                                                <div className="d-flex justify-content-around align-items-center">
                                                    <div className="p-2 ">
                                                        {
                                                        product.title + "(" + product.size + ")"
                                                    } </div>

                                                    <div className="p-2 text-center">
                                                        <div> {" "}
                                                            <div className={"d-flex justify-content-center "}>
                                                                <Button style={
                                                                        {color: "#c92e31"}
                                                                    }
                                                                    onClick={
                                                                        increamentCount.bind(this, product)
                                                                }>
                                                                    +
                                                                </Button>
                                                                <span className={"p-2"}>
                                                                    {
                                                                    product.qty
                                                                }</span>
                                                                <Button style={
                                                                        {color: "#c92e31"}
                                                                    }
                                                                    onClick={
                                                                        decreamentCount.bind(this, product)
                                                                }>
                                                                    -
                                                                </Button>
                                                                <br/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-2 ">
                                                        {
                                                        "Rs " + product.price + ".00"
                                                    }</div>
                                                    <div className="p-2 ">
                                                        <Button startIcon={<RemoveCircleOutlineIcon/>}
                                                            style={
                                                                {color: "#c92e31"}
                                                            }
                                                            onClick={
                                                                removeProduct.bind(this, product)
                                                        }>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Paper>
                                        </Grid>
                                    );
                                })
                            } </Grid>
                        </Col>
                        <Col lg={3}>
                            <div className="text-center">
                                <h1 className="cart-titles">Summary</h1>
                                <hr className="food-divide"/>
                            </div>
                            <Button variant="primary"
                                style={
                                    {
                                        backgroundColor: "#70a401",
                                        color: "white",
                                        fontSize: "12px",
                                        padding: "10px 20px 8px 20px"
                                    }
                            }>
                                Enter your coupon code
                            </Button>
                            <Button variant="primary"
                                className={"mt-3"}
                                style={
                                    {
                                        backgroundColor: "#808080",
                                        fontSize: "12px",
                                        color: "white",
                                        padding: "10px 20px 8px 20px"
                                    }
                            }>
                                Redeem GES discount
                            </Button>
                            <Table striped bordered
                                className={"mt-2"}>
                                <tbody>
                                    <tr>
                                        <td className={"bill-fields"}>Sub Total</td>
                                        <td className={"bill-fields text-right "}
                                            width={25}>
                                            {
                                            'Rs ' + getTotal() + '.00'
                                        } </td>
                                    </tr>
                                    <tr>
                                        <td className={"bill-fields"}>Discount Amount</td>
                                        <td className={"bill-fields text-right "}
                                            width={25}>
                                            .00
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={"bill-fields"}>Service Charge(5.00%)</td>
                                        <td className={"bill-fields text-right "}
                                            width={25}>
                                            .00
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"
                                            className={"bill-total-field"}>
                                            <div className={"d-flex justify-content-end"}>
                                                <div className={"p-2"}>Net Total:</div>
                                                <div className={"p-2"}>
                                                    {
                                                    'Rs ' + getTotal() + '.00'
                                                }</div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Button variant="primary"
                                className={"mt-3"}
                                endIcon={<NavigateNextIcon/>}
                                style={
                                    {
                                        backgroundColor: "#c92e31",
                                        fontSize: "12px",
                                        color: "white",
                                        padding: "10px 20px 8px 20px"
                                    }
                           	 }
          			  onClick={continueToCheckout}

				>
                                Continue
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Cart;
