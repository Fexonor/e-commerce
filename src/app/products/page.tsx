import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getProducts from "@/api/products.api";
import SingleProduct from "../_components/SingleProduct/SingleProduct";

export default async function Products() {
 let data = await getProducts();

  return (
    <>
      <div className='container w-[80%] mx-auto my-12'>
        <div className='flex flex-wrap'>
          {data.map((currentProduct) => (
            <SingleProduct key={currentProduct.id} product={currentProduct} />
          ))}
        </div>
      </div>
    </>
  );
}
