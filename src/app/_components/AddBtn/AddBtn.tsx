"use client";
import addToCart from "@/cartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {

  const { numberOfCartItem, setnumberOfCartItem } = useContext(CartContext);

  async function checkAddProduct(id: string) {
    let res = await addToCart(id);
    console.log(res);
    if (res.status === "success") {
      toast.success("Product added to cart", {
        duration: 2000,
        position: "top-center",
      });
      setnumberOfCartItem(numberOfCartItem + 1);
    } else {
      toast.error(res.message, {
        duration: 2000,
        position: "top-center",
      });
    }
  }

  return (
    <>
      <Button
        onClick={() => checkAddProduct(id)}
        className='cursor-pointer w-full '
      >
        Add to Cart
      </Button>
    </>
  );
}
