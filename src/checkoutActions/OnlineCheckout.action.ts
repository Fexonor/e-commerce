"use server";

import { checkoutSchemaType } from "@/schema/checkout.schema";
import getMyToken from "@/utlities/getMytoken";

export default async function onlinePayment(
  cartId: string,
  url: string,
  formValues: checkoutSchemaType
) {
  const token = await getMyToken();
  if (!token) throw new Error("login first");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );
  const payload = await res.json();
  return payload;
}
