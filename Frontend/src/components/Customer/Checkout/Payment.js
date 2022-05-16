import React, { useEffect,useState } from "react";
import { Card, Container, Form, Table, Row, Button } from "react-bootstrap";
import "../../../stylesheets/payment.css";
import Paypal from "./Paypal";
import {useLocation} from "react-router-dom";
import axios from "axios";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";


let myCurrentDate = new Date();
let date = myCurrentDate.getDate();
let month = myCurrentDate.getMonth() + 1;
let year = myCurrentDate.getFullYear();
let time =  myCurrentDate.getHours() + ':' + myCurrentDate.getMinutes();
let fullDate = year + " / " + month + " / " + date;
export default function Payment () {



  const location=useLocation();

  const [button, setButton] = useState(true);

  const [products, setProducts] = useState(location.state.product);
  const [Total, setTotal] = useState(location.state.total);


  const [Name, setName] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [Date, setDate] = useState("");
  const [Cvv, setCvv] = useState("");

  const [ProductID, setProductID] = useState("");
  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [Qty, setQty] = useState("");


useEffect(() => {
    products.map((item) => {
      setProductID(item._id)
      setTitle(item.title)
      setImage(item.image)
      setQty(item.qty)
    });
  
}, [3])

  
function makePayment(){

  console.log(ProductID);

  var transaction = Math.floor(100000 + Math.random() * 1000000);
  var Email= localStorage.getItem("Email");
  var UserName= localStorage.getItem("userName");

const data ={
  Name,
  CardNumber,
  Date,
  Cvv,
  Title,
  Image,
  Qty,
  Total,
  transaction,
  time,
  fullDate,
  Email,
  UserName,
  ProductID
}

axios
.post("http://localhost:8070/payment/add", data)
.then((response) => {

  if(response.data.Message == "Error"){
    NotificationManager.warning("Warning", "Please enter correct payment details", 3000);
    }
  else if(response.data.Message == "Success"){
    window.location.href = "/";
    }


})

.catch((err) => {
  alert(err);
});


}

    return (
      <Container className={"pt-3"}>
        <Card className={"p-5 mb-3"}>
        <NotificationContainer />


        
          <div class="card-body">
            <div class="row">
            
              <div class="col-md-7">
                <div class="left border">
                  <div class="row">
                    {/* <h3 class="header">Payment</h3> */}
                    <div class="icons">
                     
                      <img src="https://img.icons8.com/color/48/000000/visa.png" />
                      <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
                      <img src="https://img.icons8.com/color/48/000000/maestro.png" />
                    </div>
                  </div>
                  <Form>
                    <Form.Group controlId="formGridEmail">
                      <Form.Label>Cardholder's name:</Form.Label>
                      <Form.Control className="CardHName" type="text" placeholder="Mr.sample"     
                       onChange={(e)=>{
                        setName(e.target.value);
                       }}/>
                    </Form.Group>
                    <Form.Group controlId="formGridPassword">
                      <Form.Label>Card Number:</Form.Label>
                      <Form.Control className="CardNumber" type="text" placeholder="Card Number" 

                      onChange={(e)=>{
                        setCardNumber(e.target.value);
                       }}/>
                    </Form.Group>
                    <Row className="mb-3">
                      <Form.Label class="col-4">
                        <span>Expiry date:</span>

                        <Form.Control type="text" className="YYMM" placeholder="YY/MM" 
                          
                      onChange={(e)=>{
                        setDate(e.target.value);
                       }}
                        />
                      </Form.Label>
                      <Form.Label class="col-4">
                        <span>CVV:</span>

                        <Form.Control type="text" id="cvv " className="CVV" placeholder="cvv"
                        onChange={(e)=>{
                          setCvv(e.target.value);
                       }}
                         />
                      </Form.Label>
                    </Row>
                    <input type="checkbox" id="save_card" class="align-left" />{" "}
                    <Form.Label for="save_card">
                      Save card details to wallet
                    </Form.Label>
                  </Form>

                  <Paypal />
                </div>
              </div>
              <div class="col-md-5">
                <div class="right border">
                  <h3 class="header">Order Summary</h3>
                  <br />
                  {products.map((item, index) => (
                  <Row class="row item">
                    <div class="col-4 align-self-center">
            
                        <img class="img-fluid" style={{ width:'80px', height:'80px'}} src={`http://localhost:3000/Profile/${item.image}`}/>
                         
                    </div>
                    <div class="col-8">
                      <Form.Label class="row">
                        <b>Rs.{item.price}</b>
                      </Form.Label>
                      <Form.Label style={{marginLeft:'10px'}} class="row text-muted">
                        {item.title}
                      </Form.Label>
                      <Form.Label style={{marginLeft:'10px'}} class="row">Qty:  {item.qty}</Form.Label>
                    </div>
                  </Row>
                  
                  ))}
                  <hr />
                  <br />
                  <Row className="row lower">
                    <Form.Label class="col text-left">Subtotal</Form.Label>
                    <Form.Label class="col text-right">{Total}</Form.Label>
                  </Row>
                  <Row class="row lower">
                    <Form.Label class="col text-left">Delivery</Form.Label>
                    <Form.Label class="col text-right">Free</Form.Label>
                  </Row>
                  <Row class="row lower">
                    <Form.Label class="col text-left">
                      <b>Total to pay</b>
                    </Form.Label>
                    <Form.Label class="col text-right">
                      <b>{Total}</b>
                    </Form.Label>
                  </Row>
                  <Row class="row lower">
                    <div class="col text-left">
                      <a href="#">
                        <u>Add promo code</u>
                      </a>
                    </div>
                  </Row>{" "}
                  <Button onClick={makePayment} class="placeOrder" style={{background:'#b80c00'}}>Place order</Button>
                  <Form.Label class="text-muted text-center">
                    Complimentary Shipping & Returns
                  </Form.Label>
                </div>
              </div>
            </div>
          </div>
          <div> </div>
        </Card>
      </Container>
    );
  }