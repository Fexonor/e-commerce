"use server"
import getMyToken from "@/utlities/getMytoken";
import { get } from "http";


export async function getLoggedUserCart(){


  const token = await getMyToken()

  if(!token) {
    throw new Error('PLease login first')
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    }
  });

  const payload = await res.json();
  return payload;
}