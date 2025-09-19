'use server'

import getMyToken from "@/utlities/getMytoken"

export default async function updateCartQuantity(id : string,count : string){

  const token = await getMyToken();
  if(!token){
    throw new Error('please login first')
  }

  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: 'PUT',
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count })
  });
  let payload = await res.json();
  return payload;
}