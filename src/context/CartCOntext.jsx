'use client'

import { getLoggedUserCart } from "@/cartActions/getUserCart.action";
import getMyToken from "@/utlities/getMytoken";
import { createContext, use, useEffect, useState } from "react";
import { set } from "zod";

export const CartContext = createContext()

export default  function CartContextProvider({ children }) {
  const [numberOfCartItem, setnumberOfCartItem] = useState(0)

  // const [token, settoken] = useState('')

  // async function  getTheToken(){
  //     const token = await getMyToken()
  //     settoken(token)
  // }


  // async function getUserCart(){

  //     let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
  //       method: "GET", 
  //       headers: {
  //         token,
  //         "Content-Type": "application/json"
  //       }
  //     });
  //     let payload = await res.json()
  //     console.log(payload)
  // }

  
  // useEffect(() => {
  //   getTheToken()
  // }, [])

  // useEffect(() => {
  //   if (!token) return;
  //   getUserCart();
  // }, [token]);

  async function getUserCart(){
    try {
      let res =  await getLoggedUserCart()
      console.log(res)
      if (res.status === "success") {
        console.log(res.data.products);
        let sum = 0
        res.data.products.forEach((product)=>{
          sum += product.count 
        })
        setnumberOfCartItem(sum)
      }
    } 
    catch(err){
      console.log('not log in')
    }
  }



  useEffect(() => {
    getUserCart()
  }, [])

  return (
    <CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem }}>
      {children}
    </CartContext.Provider>
  );
}

