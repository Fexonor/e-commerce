"use server"
import getMyToken from "@/utlities/getMytoken";

export default async function addToCart(id : string) {

  const token = await getMyToken();

  if(!token){
    throw new Error("You must be logged in to add to cart")
  }

  let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
    method : "POST",
    headers:{
      token,
      "content-type" : "application/json"
    },
    body : JSON.stringify({productId : id})
  }
  );

  let payload = await res.json();

  return payload;

}