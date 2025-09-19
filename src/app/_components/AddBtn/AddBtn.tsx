"use client";
import addToCart from "@/cartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {
  const context = useContext(CartContext);

  if (!context) throw new Error("Not Exist");
  const { numberOfCartItem, setnumberOfCartItem } = context;

  async function checkAddProduct(id: string) {
    try {
      const res = await addToCart(id);
      console.log(res);

      if (res && res.status === "success") {
        toast.success("Product added to cart", {
          duration: 2000,
          position: "top-center",
        });
        setnumberOfCartItem(numberOfCartItem + 1);
      } else {
        // Handle error response
        const errorMessage = res?.message || "Failed to add product to cart";
        toast.error(errorMessage, {
          duration: 3000,
          position: "top-center",
        });
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Add to cart error:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        duration: 3000,
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
