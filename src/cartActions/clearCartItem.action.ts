'use server'

import getMyToken from "@/utlities/getMytoken"

export default async function clearCart(){
  const token = await getMyToken()
  if(!token){
    throw new Error('please login first')
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: 'DELETE',
    headers: {
      token,
      "Content-Type": "application/json",
    }
  })
  const payload = await res.json()
  return payload
}