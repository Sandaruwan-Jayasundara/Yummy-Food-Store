import {react,Component} from 'react';
import axios from 'axios';
import Select from 'react-select';

class ChangeStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            del_guys:[],
            chefs:[],
            emp:'',
            options:[],
            status:this.props.status,


          }
          this.updateOrder=this.updateOrder.bind(this);
    }

    updateOrder(){
        let newOrder={};
       if(this.state.status=='new'){
       newOrder={
          status:'processing',
          assign_to:this.state.emp
      }
       }
       else if(this.state.status=='processing'){
        newOrder={
            status:'ready',
        }
       }

     axios.patch(`http://localhost:8070/orders/edit/${this.props.order}`,newOrder).then(res=>{
         alert('Stage completed');
         window.location='/admin/orders'
     })
    .catch(err=>{
        console.log(err);
    })
    }

    componentDidMount() {
    if(this.state.status=='new'){
        axios.get(`http://localhost:8070/employee-management/employee/chefs/${this.props.city}`).then(res=>{
            this.setState({chefs:res.data});
            
            let data=[];
            this.state.chefs.map(chef=>{
            let item={  
                value:chef._id,
                label:chef.FirstName+' '+chef.LastName
            }
            console.log(item)
            data.push(item);
            })
            console.log(data)
          this.setState({options:data});
                }).catch(err=>{
                    console.log(err);
                })
    }
    else if(this.state.status=='ready'){
        axios.get().then(res=>{
            this.setState({del_guy:res.data});
            let data=[];
           thsi.state.del_guys.map(chef=>{
            let item={
                value:chef._id,
                lable:chef.name
            }
            data.push(item);
            })
            console.log(data)
           this.setState({options:data});
                }).catch(err=>{
                   this.setState({emp:e.value});
                   console.log(this.state.emp)
                })
    }
   }
    render() { 
        if(this.state.status=='new'){
            return(
               <div>
               <h1>Status:New</h1>
         
               <Select
               maxMenuHeight={125}
               options={this.state.options}
               onChange={(e)=>{
                   this.setState({emp:e.value});
               }}
             />
               <button onClick={this.updateOrder}>Assign a chef</button>
            
               </div>
                );
        }
    
        else if(this.state.status=='processing'){
            return(
                <div>
                <h1>Status:Processing</h1>
                <button onClick={this.updateOrder}>Mark as ready</button>
                </div>
                
                );
        }
    

    
    }
}
 
export default ChangeStatus ;