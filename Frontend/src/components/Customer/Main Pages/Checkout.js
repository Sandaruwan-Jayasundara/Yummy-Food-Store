import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import { ThemeProvider } from 'react-bootstrap';


const Checkout=()=>{

    const [fullname,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [address,setAddress]=useState("");
    const [city,setCity]=useState("");
    const [zipcode,setZipcode]=useState("");
    const [state,setState]=useState("");
    const history=useHistory();
    const location=useLocation();
    const total=location.state.total;
    const [product, setProduct] = useState(location.state.product);

const onSubmitForm=(e)=>{

const delivery={
    fullname:fullname,
    user:localStorage.getItem('Email'),
    address:address,
    city:city,
    zipcode:zipcode,
    state:state,
    status:'temp',
    total:total
}
axios.post('http://localhost:8070/deliveries/add',delivery).then(res=>{
history.push({
    pathname:"/payment",
    state:{
        delivery:delivery,
        delivery_code:res.data._id,
        product:product
    }
})

}).catch(err=>{
    console.log(err)
})
}


return(
<React.Fragment>

<h3>Contact Form</h3>
<label>Full Name</label><br/>
<input type={Text} placeholder="Full Name" onChange={
(e)=>{
    setFullName(e.target.value);
}

}/><br/>


<label>Address</label><br/>
<input type={Text} placeholder="Address" onChange={
    (e)=>{
        setAddress(e.target.value)
    }
}/><br/>
<label>City</label><br/>
<input type={Text} placeholder="City" onChange={
  
    (e)=>{
        setCity(e.target.value)
    }
} /><br/>


<label>Zip Code</label><br/>
<input type={Text} placeholder="Zip Code" onChange={
  
    (e)=>{
        setZipcode(e.target.value)
    }
}/><br/>

<label>State</label><br/>
<input type={Text} placeholder="State" onChange={
    (e)=>{
        setState(e.target.value)
    }
} /><br/><br/>

<input type="submit" value="Submit" onClick={onSubmitForm}/>
</React.Fragment>
);
}

export default Checkout;