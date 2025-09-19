"use client";

import { getLoggedUserCart } from "@/cartActions/getUserCart.action";
import { createContext, ReactNode, useEffect, useState } from "react";


type CartContextType = {
  numberOfCartItem: number;
  setnumberOfCartItem: React.Dispatch<React.SetStateAction<number>>;
};


type CartContextProviderProps = {
  children: ReactNode;
};


export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numberOfCartItem, setnumberOfCartItem] = useState<number>(0);

  async function getUserCart() {
    try {
      let res = await getLoggedUserCart();
      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setnumberOfCartItem(sum);
      }
    } catch {
      console.log("not log in");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem }}>
      {children}
    </CartContext.Provider>
  );
}