import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../utils/axios';
import * as URL from '../config/url';

export const fetchAllProductsThunk = createAsyncThunk('PRODUCT/GET/PRODUCTS', async (thunkAPI) => {
    const response = await axios.get(URL.PRODUCTS, thunkAPI);
    return response.data;
});
export const addProductThunk = createAsyncThunk('PRODUCT/POST/PRODUCTS', async (data,thunkAPI) => {
    const response = await axios.post(URL.PRODUCTS, data, thunkAPI);
    let arr=JSON.parse(localStorage.getItem("products"))||[];
    arr.unshift(response.data);
    localStorage.setItem("products",JSON.stringify(arr));
    return response.data;
});
export const addToCartThunk = createAsyncThunk('PRODUCT/ADD/CART', async (id,thunkAPI) => {
    return id;
});
export const deleteFromCartThunk = createAsyncThunk('PRODUCT/DELETE/CART', async (id,thunkAPI) => {
    return id;
});

/* addToCart and deleteFromCart are utilities function */
// const addToCart=(id,products,cart)=>{
//     for(let i=0;i<cart.length;i++){
//         if(cart[i].id===id){
//             let arr=[...cart];
//             arr[i].count+=1;
//             localStorage.setItem("cart",JSON.stringify(arr));
//             return arr;
//         }
//     }
//     let obj=null;
//     for(let i=0;i<products.length;i++){
//         if(products[i].id===id)obj={...products[i]};
//     }
//     let x= [...cart,{...obj,count:1}];
//     localStorage.setItem("cart",JSON.stringify(x));
//     return x;
// }
const addToCart=(id, products, cart) => {
    const index=cart.findIndex(item => item.id===id);
    if (index!==-1) {
        const arr=cart.map((item,i) => {
            if (index===i) {
                return { ...item, count: item.count + 1 };
            }
            return item;
        });
        localStorage.setItem("cart", JSON.stringify(arr));
        return arr;
    }
    const obj=products.find(product => product.id===id);
    if (obj) {
        const arr=[...cart, { ...obj, count: 1 }];
        localStorage.setItem("cart", JSON.stringify(arr));
        return arr;
    }
    return cart;
};

// const deleteFromCart=(id,cart)=>{
//     let index=-1;
//     for(let i=0;i<cart.length;i++){
//         if(cart[i].id===id){
//             index=i;
//         }
//     }
//     let arr=[...cart];
//     arr.splice(index,1);
//     localStorage.setItem("cart",JSON.stringify(arr));
//     return arr;
// }
const deleteFromCart=(id, cart) => {
    const arr=cart.filter(item => item.id!==id);
    localStorage.setItem("cart", JSON.stringify(arr));
    return arr;
}

const initialState = {
  isLoading: false,
  products:JSON.parse(localStorage.getItem("products"))||[],
  cart:JSON.parse(localStorage.getItem("cart"))||[]
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllProductsThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllProductsThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products=[...state.products,...action.payload];
    },
    [fetchAllProductsThunk.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action?.payload?.message);
    },
    [addProductThunk.pending]: (state) => {
        state.isLoading = true;
    },
    [addProductThunk.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.products=[action.payload,...state.products]
    },
    [addProductThunk.rejected]: (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload?.message);
    },
    [addToCartThunk.pending]: (state) => {
        state.isLoading = true;
    },
    [addToCartThunk.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.cart=addToCart(action.payload,state.products,state.cart);
    },
    [addToCartThunk.rejected]: (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload?.message);
    },
    [deleteFromCartThunk.pending]: (state) => {
        state.isLoading = true;
    },
    [deleteFromCartThunk.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.cart=deleteFromCart(action.payload,state.cart);
    },
    [deleteFromCartThunk.rejected]: (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload?.message);
    },
  },
});

export default productSlice.reducer;