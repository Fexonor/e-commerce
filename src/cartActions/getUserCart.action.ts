"use server"
import getMyToken from "@/utlities/getMytoken";
import { get } from "http";


export async function getLoggedUserCart(){


  let token = await getMyToken()

  if(!token) {
    throw new Error('PLease login first')
  }

  let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    }
  });

  let payload = await res.json();
  return payload;
}