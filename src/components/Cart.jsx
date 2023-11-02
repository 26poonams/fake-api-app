import React,{useState} from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useSelector,useDispatch } from "react-redux";
import {deleteFromCartThunk} from "../redux/reducers/Product";

function Cart() {
  const [alert,toggleAlert]=useState(false);

  const dispatch=useDispatch();
  const {isLoading,cart}=useSelector((state)=>state.productReducer);

  if(isLoading)return(<div className="text-center">Loading....</div>)
  return (
    <div className="container" style={{marginTop:"50px"}}>
      <div className="row">
        {cart.map((item,index) => (
          <div className="col-md-12" key={item.id} style={{border:"0.1px solid black",marginBottom:"30px",padding:"30px"}}>
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
                <div className="row"><div className="col-md-12">Count:{item.count}</div></div>
                <div className="row"><div className="col-md-12"><button className="btn btn-danger" onClick={()=>{dispatch(deleteFromCartThunk(item.id));toggleAlert(true)}}>Remove from Cart</button></div></div>
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
        Removed from cart
      </SweetAlert>}
    </div>
  );
}

export default Cart;