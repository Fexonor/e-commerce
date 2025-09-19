import { Button } from '@/components/ui/button';
import { productType } from '@/types/product.type';
import React from 'react'
import AddBtn from '../AddBtn/AddBtn';

export default function Details({data} : {data : productType}) {
  return (
    <>
      <div className='container w-full  lg:w-[60%] mx-auto p-4 flex'>
        <div className='w-1/4'>
          <div className='p-4'>
            <img src={data.imageCover} alt='' className='w-full' />
          </div>
        </div>
        <div className='w-3/4'>
          <div className='p-4'>
            <h1 className='text-2xl font-bold my-4'>{data.title}</h1>
            <p>{data.description}</p>
            <p className='text-emerald-500 my-2'>{data.category.name}</p>
            <div className='flex justify-between w-full'>
              <span>{data.price} EGP</span>
              <span>
                {data.ratingsAverage}{" "}
                <i className='fas fa-star text-yellow-500'></i>
              </span>
            </div>
            <AddBtn id={data.id} />
          </div>
        </div>
      </div>
    </>
  );
}
