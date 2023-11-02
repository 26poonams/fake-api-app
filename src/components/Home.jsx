import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { useSelector,useDispatch } from "react-redux";
import {addToCartThunk} from "../redux/reducers/Product";

function Home() {

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const [alert,toggleAlert]=useState(false);
  const {isLoading,products}=useSelector((state)=>state.productReducer);

  

  if(isLoading)return(<div className="text-center">Loading....</div>)

  return (
    <div className="container" style={{marginTop:"50px"}}>
      <div className="row">
        {products.map((item,index) => (
          <div className="col-md-12" onClick={()=>navigate(`/details/${item.id}`)} key={item.id} style={{border:"0.1px solid black",marginBottom:"30px",padding:"30px"}}>
            <div className="row">
              <div className="col-md-4"><img src={item.image} style={{width:"80%",height:"60%"}}/></div>
              <div className="col-md-6">
                <div className="row"><div className="col-md-12"><strong>{item.title}</strong></div></div>
                <div className="row"><div className="col-md-12">{item.description}</div></div>
                <div className="row"><div className="col-md-12">{item?.rating?.rate}</div></div>
              </div>
              <div className="col-md-2">
                <div className="row"><div className="col-md-12">{item.category}</div></div>
                <div className="row"><div className="col-md-12">${item.price}</div></div>
                <div className="row"><div className="col-md-12"><button className="btn btn-info" onClick={(e)=>{e.stopPropagation();dispatch(addToCartThunk(item.id));toggleAlert(true);}}>Add to Cart</button></div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {alert&&<SweetAlert
        success
        title="Successful"
        onConfirm={()=>toggleAlert(false)}
      >
        Added to cart
      </SweetAlert>}
    </div>
  );
}

export default Home;

