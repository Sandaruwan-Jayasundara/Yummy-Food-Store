import axios from "axios";
import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import { Button, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { GiRollingEnergy, ImExit, RiDownload2Fill } from "react-icons/all";
import { Col, Divider, Row, Table } from "antd";
import "antd/dist/antd.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

class ViewRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Management: [],
      transaction: "",
      Title: "",
      Image: "",
      Qty: "",
      Total: "",
      time: "",
      fullDate: "",
      Email: "",
      UserName: "",
      refund: "",
      refundDate: "",
      status: "",
      RefundTransaction: "",
    };
    this.Report = this.Report.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:8070/payment/payment-management/transaction/${id}`)
      .then((response) => {
        this.setState({
          transaction: response.data.transactions.transaction,
          Title: response.data.transactions.Title,
          Email: response.data.transactions.Email,
          Image: response.data.transactions.Image,
          Qty: response.data.transactions.Qty,
          Total: response.data.transactions.Total,
          time: response.data.transactions.time,
          fullDate: response.data.transactions.fullDate,
          UserName: response.data.transactions.UserName,
          refund: response.data.transactions.refund,
          refundDate: response.data.transactions.refundDate,
          RefundTransaction: response.data.transactions.RefundTransaction,
          status: response.data.transactions.status,
          RefundStatus: "Completed",
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  Report = () => {
    const input = document.getElementById("pdfdiv");
    html2canvas(input).then((canvas) => {
      let imgWidth = 220;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      let position = 0;
      pdf.addImage(imgData, "JPEG", 0, 10, imgWidth, imgHeight);
      pdf.save("Transactions.pdf");
    });
  };

  render() {
    return (
      <div>
        <Container className={"pt-3"}>
          <Card className={"p-5 mb-3"}>
            <div className={"go-back-icon"}>
              <Link to={"/admin/payment/management"}>
                <ImExit color={"black"} />
              </Link>
            </div>

            <div className="text-center ">
              <h1 className="form-titles ">TRANSACTIONS</h1>
              <hr className="divide" />
            </div>

            <div id="pdfdiv" component={Paper}>
              <Card className={"p-5"}>
                <div className={"text-center"}>
                  <h6 className="profile-divider m-0">
                    <span>INVOICE</span>
                  </h6>{" "}
                </div>

                <Row gutter={24} style={{ marginTop: 32 }}>
                  <Col span={8}>
                    <h3>PizzaHut</h3>
                    <div>Colombo</div>
                    <div>Sri Lanka</div>
                    <div>1000</div>
                    <div>011 - 8569423</div>
                  </Col>
                  <Col span={8} offset={8}>
                    <table>
                      <tr>
                        <th>Invoice # :</th>
                        <td>{this.state.transaction}</td>
                      </tr>
                      <tr>
                        <th>Transaction Date : </th>
                        <td> {this.state.fullDate}</td>
                      </tr>
                      <tr>
                        <th>Transaction Time :</th>
                        <td>{this.state.time}</td>
                      </tr>
                    </table>
                  </Col>
                </Row>

                <Row style={{ marginTop: 48 }}>
                  <div>
                    Bill To: <strong>{this.state.UserName} /</strong>
                  </div>
                  <div>{this.state.Email}</div>
                </Row>

                <Row style={{ marginTop: 48 }}>
                  <Table
                    style={{ width: "1000px" }}
                    dataSource={[
                      {
                        id: 1,
                        name: (
                          <img
                            alt="Avatar"
                            center
                            style={{
                              width: "100px",
                              height: "100px",
                            }}
                            src={`http://localhost:3000/Profile/${this.state.Image}`}
                          />
                        ),

                        description: <p> {this.state.Title}</p>,
                        price: <p>Rs. {this.state.Total} .00</p>,
                        quantity: <p>{this.state.Qty} </p>,
                      },
                    ]}
                    pagination={false}
                  >
                    <Table.Column title="Items" dataIndex="name" />
                    <Table.Column title="Description" dataIndex="description" />
                    <Table.Column title="Quantity" dataIndex="quantity" />
                    <Table.Column title="Price" dataIndex="price" />
                  </Table>
                </Row>

                <Row style={{ marginTop: 48 }}>
                  <Col span={8} offset={16}>
                    <table>
                      <tr>
                        <th>Fee :</th>
                        <td>Rs.0.00</td>
                      </tr>
                      <tr>
                        <th>Nett Total :</th>
                        <td>Rs. {this.state.Total} .00</td>
                      </tr>
                    </table>
                  </Col>
                </Row>
              </Card>
            </div>

            <Button
              style={{ width: "200px", marginLeft: "40%" }}
              className="cancel-button mt-3"
              startIcon={<RiDownload2Fill />}
              onClick={this.Report}
            >
              Generate Report
            </Button>
          </Card>
        </Container>
      </div>
    );
  }
}

export default ViewRecords;
