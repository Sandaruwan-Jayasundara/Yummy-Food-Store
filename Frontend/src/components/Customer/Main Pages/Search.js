import { Card } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const Search=(props)=>{
const text=props.match.params.keyword;
const [products,setProducts]=useState([]);

useEffect(() => {
    axios
      .get("http://localhost:8070/products")//retrieve all the products using api
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("err=>" + err);
      });
  }, [3]);

return(

    <div>
<h1>Search Results</h1>
{products.filter((data)=>{
    if(text==null){
        return data;
    }
    else if(data.title.toLowerCase().includes(text.toLowerCase())){
return data;
    }
}).map((product,index)=>{
return(
    <div key={index}>
    <Card>
    <h5>{product.title}</h5>
    
    </Card>
    </div>

);
})}
</div>

);

}

export default Search;