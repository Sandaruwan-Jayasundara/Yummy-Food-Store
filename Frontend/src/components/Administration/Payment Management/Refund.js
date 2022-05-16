import axios from "axios";
import React, { Component } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactNotifications from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { GiRollingEnergy, ImExit } from "react-icons/all";

let myCurrentDate = new Date();
let date = myCurrentDate.getDate();
let month = myCurrentDate.getMonth() + 1;
let year = myCurrentDate.getFullYear();
let time = myCurrentDate.getHours() + ":" + myCurrentDate.getMinutes();
let refundDate = year + " / " + month + " / " + date;

class ViewRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Management: [],
      transaction: "",
      Total: "",
      time: "",
      fullDate: "",
      BuyerID: this.props.match.params.id,
      RefundStatus: "Refund",
    };
    this.Refund = this.Refund.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:8070/payment/payment-management/transaction/${id}`)
      .then((response) => {
        this.setState({
          transaction: response.data.transactions.transaction,
          Qty: response.data.transactions.Qty,
          Total: response.data.transactions.Total,
          time: response.data.transactions.time,
          fullDate: response.data.transactions.fullDate,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  Refund() {
    var RefundTransaction = Math.floor(100000 + Math.random() * 1000000);
    var refund = this.state.Total;
    var status = this.state.RefundStatus;
    var RefundDate = refundDate;
    var id = this.state.BuyerID;

    const data = {
      status,
      refund,
      RefundDate,
      RefundTransaction,
    };

    axios
      .put(
        `http://localhost:8070/payment/payment-management/refund/${id}`,
        data
      )
      .then((response) => {
        NotificationManager.success("Success", "Refund Success");
        setTimeout(
          function () {
            window.location.href = "/admin/payment/management";
          }.bind(this),
          1000
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <Container className={"pt-3"}>
        <NotificationContainer />
        <Paper elevation={"9"}>
          <Card className={"p-5 mb-3"}>
            <div className={"go-back-icon"}>
              <Link to={"/admin/payment/management"}>
                <ImExit color={"black"} />
              </Link>
            </div>
            <Card.Header>
              {" "}
              <h1 className={"text-center sub-titles mt-2"}>Refund & Return</h1>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <div
                  align="center"
                  style={{ marginTop: "60px", marginLeft: "100px" }}
                >
                  <div>
                    <form style={{ backgroundColor: "white" }} class="form1">
                      <div class="input-group mb-3" style={{ width: "600px" }}>
                        <div style={{ width: "300px", marginRight: "100;" }}>
                          <span>
                            <h4
                              style={{
                                float: "left",
                                marginLeft: "80px",
                                color: "black",
                              }}
                            >
                              Purchase Details
                            </h4>
                          </span>
                        </div>
                      </div>

                      <div class="input-group mb-3" style={{ width: "600px" }}>
                        <div style={{ width: "300px", marginRight: "100;" }}>
                          <span>
                            <p style={{ float: "left", marginLeft: "80px" }}>
                              Transaction
                              <span style={{ color: "red" }}>:</span>
                            </p>
                          </span>
                        </div>
                        <p>{this.state.transaction}</p>
                      </div>

                      <div class="input-group mb-3" style={{ width: "600px" }}>
                        <div style={{ width: "300px", marginRight: "100;" }}>
                          <span>
                            <p style={{ float: "left", marginLeft: "80px" }}>
                              Date
                              <span style={{ color: "red" }}>:</span>
                            </p>
                          </span>
                        </div>
                        <p>{this.state.fullDate}</p>
                      </div>

                      <div class="input-group mb-3" style={{ width: "600px" }}>
                        <div style={{ width: "300px", marginRight: "100;" }}>
                          <span>
                            <p style={{ float: "left", marginLeft: "80px" }}>
                              Time<span style={{ color: "red" }}>:</span>
                            </p>
                          </span>
                        </div>
                        <p>{this.state.time}</p>
                      </div>

                      <div class="input-group mb-3" style={{ width: "600px" }}>
                        <div style={{ width: "300px", marginRight: "100;" }}>
                          <span>
                            <p style={{ float: "left", marginLeft: "80px" }}>
                              Amount<span style={{ color: "red" }}>:</span>
                            </p>
                          </span>
                        </div>
                        <p>Rs. {this.state.Total}. 00</p>
                      </div>

                      <div class="input-group mb-3" style={{ width: "600px" }}>
                        <div style={{ width: "300px", marginRight: "100;" }}>
                          <span>
                            <h4
                              style={{
                                float: "left",
                                marginLeft: "80px",
                                color: "black",
                                marginTop: "10px",
                              }}
                            >
                              Refund Details
                            </h4>
                          </span>
                        </div>
                      </div>

                      <div class="input-group mb-3" style={{ width: "600px" }}>
                        <div style={{ width: "300px", marginRight: "100;" }}>
                          <span>
                            <p style={{ float: "left", marginLeft: "80px" }}>
                              Refund Amount
                              <span style={{ color: "red" }}>:</span>
                            </p>
                          </span>
                        </div>
                        <p>Rs. - {this.state.Total}. 00</p>
                      </div>

                      <div class="input-group mb-3" style={{ width: "600px" }}>
                        <div style={{ width: "300px", marginRight: "100;" }}>
                          <span>
                            <p style={{ float: "left", marginLeft: "80px" }}>
                              Transaction Fee
                              <span style={{ color: "red" }}>:</span>
                            </p>
                          </span>
                        </div>
                        <p>Rs. 0. 00</p>
                      </div>

                      <div class="input-group mb-3" style={{ width: "600px" }}>
                        <div style={{ width: "300px", marginRight: "100;" }}>
                          <span>
                            <p style={{ float: "left", marginLeft: "80px" }}>
                              Total<span style={{ color: "red" }}>:</span>
                            </p>
                          </span>
                        </div>
                        <p>Rs. - {this.state.Total}. 00</p>
                      </div>
                    </form>
                  </div>
                </div>
              </Card.Text>
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                onClick={this.Refund}
                variant="contained"
                style={{ backgroundColor: "#d00000", color: "#FFF" }}
              >
                Refund
              </Button>
              <Link to={"/admin/payment/management"}>Back to Home</Link>
            </Card.Body>
          </Card>
        </Paper>
      </Container>
    );
  }
}

export default ViewRecords;
