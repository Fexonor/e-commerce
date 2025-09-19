"use client";
import addToCart from "@/cartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {
  async function checkAddProduct(id: string) {
    let res = await addToCart(id);
    console.log(res);
    if (res.status === "success") {
      toast.success("Product added to cart", {
        duration: 2000,
        position: "top-center",
      });
    } else {
      toast.error("cant add this product", {
        duration: 2000,
        position: "top-center",
      });
    }
  }

  return (
    <>
      <Button
        onClick={() => checkAddProduct(id)}
        className='cursor-pointer m-4 w-full'
      >
        Add to Cart
      </Button>
    </>
  );
}
