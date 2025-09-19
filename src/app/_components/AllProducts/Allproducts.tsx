import getProducts from '@/api/products.api'
import React from 'react'
import SingleProduct from '../SingleProduct/SingleProduct';
import { productType } from '@/types/product.type';

export default async function Allproducts() {

  const data = await getProducts()
  return (
    <>
      <div className='container w-[80%] mx-auto my-12'>
        <div className='flex flex-wrap'>
          {data.map((currentProduct: productType) => (
            <SingleProduct key={currentProduct.id} product={currentProduct} />
          ))}
        </div>
      </div>
    </>
  );
}
