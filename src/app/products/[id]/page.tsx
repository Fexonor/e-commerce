import selectedProduct from '@/api/SelectedProduct';
import Details from '@/app/_components/Details/Details';
import { Button } from '@/components/ui/button';
import React from 'react'

export default async function productDetails({params} : {params : Promise<{id : string}>}) {

  const { id } = await params;

 
  const data = await selectedProduct(id);
  


  return <>
    <Details data={data} />
  </>
}