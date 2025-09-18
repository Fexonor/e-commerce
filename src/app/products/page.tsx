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
import Allproducts from "../_components/AllProducts/Allproducts";

export default async function Products() {


  return (
    <>
      <Allproducts />
    </>
  );
}
