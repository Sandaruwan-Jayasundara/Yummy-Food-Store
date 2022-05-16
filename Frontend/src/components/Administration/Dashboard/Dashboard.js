import React,{Component} from "react";
import { PieChart } from 'react-minimal-pie-chart';
import axios from "axios";



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      transactions:'',
      products:'',
      orders:'',
      Employee:'',
      User:''
     }
  }


componentDidMount(){
  axios
      .get("http://localhost:8070/report/summary")
            .then((response) => {
    
              this.setState({
                transactions:response.data.transaction,
                products:response.data.products,
                orders:response.data.orders,
                products:response.data.products,
                Employee:response.data.Employee,
                User:response.data.User,
              })
              // console.log(response.data.transaction)
            })
            .catch((err) => {
              alert(err);
            });
  
}


  render() { 
    return ( 

<div>

<table class='table' style={{marginTop:'80px'}} >
              <thead  >
              
                <tr>
                <th ></th>
                <th ></th>
                <th ></th>
                <th ></th>
                <th ></th>
                <th ></th>
                <th ></th>
                <th ></th>
                  <th>
                  <div style={{width:"300px", height:"300px"}}>
                  <h4>Sales</h4>

                 <PieChart
                    data={[
                      { title: 'Transactions', value: this.state.transactions, color: '#E38627' },
                      { title: 'Products', value: this.state.products, color: '#C13C37' },
                      { title: 'Orders', value: this.state.orders, color: '#6A2135' },
                    ]}
                  />; 
                   </div>
                  </th>
                 
                  <th >
        <div style={{width:"300px", height:"300px"}}>
            <h4>User Interactive</h4>
          <PieChart
            data={[
              { title: 'Transactions', value: this.state.Employee, color: '#b30000' },
              { title: 'Products', value: this.state.User, color: '#000033' },

            ]}
          />;
          </div>

                  </th>



  
                </tr>

                
              </thead>



</table>





</div>

     );
  }
}
 
export default Dashboard;