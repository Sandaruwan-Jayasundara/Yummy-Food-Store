import axios from "axios";
import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { GiRollingEnergy, ImExit } from "react-icons/all";
import { Col, Divider, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';  


class ViewRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Management: [],
      transaction:"",
      Title: "",
      Image: "",
      Qty: "",
      Total: "",
      time:"",
      fullDate: "",
      Email: "",
      UserName:"",
      refund:"",
      refundDate:"",
      status:"",
      RefundTransaction:""
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
          RefundStatus: "Completed"
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }



  Report =()=>{

    const input = document.getElementById('pdfdiv');  
    html2canvas(input)  
      .then((canvas) => {  
        
        var imgWidth = 220;  
        var pageHeight = 300;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        
        var position = 0;  
        var heightLeft = imgHeight; 
        pdf.setFont('Helvertica','bold');
        pdf.setFontSize(14)
        pdf.setFont('Helvertica','normal');
        pdf.setFontSize(12)
        pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);  
        pdf.save("Transactions.pdf");  
      });  
      
  }
  


  render() {
    return (

<div>

<div className={"go-back-icon"}>
            <Link to={"/admin/payment/management"}>
              <ImExit color={"black"} />
            </Link>
          </div>
          <Card.Header>
              {" "}
              <h1 className={"text-center sub-titles mt-2"}>REFUND & RETURN</h1>
            </Card.Header>


<div style={{marginLeft:100}} id="pdfdiv" component={Paper}>
<Row>
  <Col>
    <Divider><b>Refund Invoice</b></Divider>
  </Col>
</Row>

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
        <td>{this.state.RefundTransaction}</td>
      </tr>
      <tr>
        <th>Refund Date :   </th>
        <td> {this.state.refundDate}</td>
      </tr>
      <tr>
        <th>Status :</th>
        <td>{this.state.status}</td>
      </tr>
    </table>
  </Col>
</Row>

<Row style={{ marginTop: 48 }}>
  <div>Bill To: <strong>{this.state.UserName}   /</strong></div>
<div>  
{this.state.Email}
</div>
</Row>


<Row style={{ marginTop: 48 }}>
  <Table style={{width:'1000px'}} dataSource={[{
      id: 1,
      description: <p> {this.state.Title}</p>,
      name: <p> {this.state.fullDate}</p>,
      price: <p>Rs. {this.state.Total} .00</p>,
      quantity: <p>{this.state.Qty} </p>
  }]}
  pagination={false}
  >
      <Table.Column title="Description" dataIndex='description' />
    <Table.Column title="Purchase Date" dataIndex='name' />

    <Table.Column title="Quantity" dataIndex='quantity' />
    <Table.Column title="Price" dataIndex='price' />
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
        <th>Refund Amount :</th>
        <td>Rs. - {this.state.refund} .00</td>
      </tr>
    </table>
  </Col>

</Row>
      </div>



      <br/><br/><br/><br/><br/>
      <div style={{marginLeft:100}}>
        
      <button style={{color:'white'}} className="btn-report" onClick={this.Report}>Generate Report</button><br/>


      </div>
 
</div>



    );
  }
}

export default ViewRecords;
