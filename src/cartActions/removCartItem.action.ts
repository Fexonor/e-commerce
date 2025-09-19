'use server'
import getMyToken from "@/utlities/getMytoken";

export async function RemoveItemFromCart(id : string){
  const token = await getMyToken()

  if(!token){
    throw new Error('please login first')
  }

  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: 'DELETE',
    headers: {
      token,
      "Content-Type": "application/json",
    }
  });
  let payload = await res.json();
  return payload;
}