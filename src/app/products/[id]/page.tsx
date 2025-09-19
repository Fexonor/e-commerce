import selectedProduct from "@/api/SelectedProduct";
import Details from "@/app/_components/Details/Details";
import SingleProduct from "@/app/_components/SingleProduct/SingleProduct";
import { Button } from "@/components/ui/button";
import getRelatedProducts from "@/productCategoryActions/relatedProducts";
import { productType } from "@/types/product.type";
import React from "react";

export default async function productDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await selectedProduct(id);

  if (!data) return <h1>No Products Here</h1>;

  let RelatedProducts = await getRelatedProducts(data.category._id);

  console.log(RelatedProducts);

  return (
    <>
      <Details data={data} />
      <div className='container w-[80%] mx-auto my-12'>
        <div className='flex flex-wrap '>
          {RelatedProducts.data.map((currentProduct: productType) => (
            <SingleProduct key={currentProduct.id} product={currentProduct} />
          ))}
        </div>
      </div>
    </>
  );
}
