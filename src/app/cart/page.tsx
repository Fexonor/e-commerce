"use client";
import { authoptions } from "@/auth";
import clearCart from "@/cartActions/clearCartItem.action";
import { getLoggedUserCart } from "@/cartActions/getUserCart.action";
import { RemoveItemFromCart } from "@/cartActions/removCartItem.action";
import updateCartQuantity from "@/cartActions/update CartQuantity.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { CartProductype } from "@/types/cart,type";
import getMyToken from "@/utlities/getMytoken";
import { get } from "http";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";





export default function Cart() {
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [updateDesiable, setupdateDesiable] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [currentId, setcurrentId] = useState('');
  const [removeDisabled, setremoveDisabled] = useState(false);
  const { numberOfCartItem, setnumberOfCartItem } = useContext(CartContext);
  const [total, settotal] = useState(0)

  async function getUserCart() {
    try {
      let res = await getLoggedUserCart();
      if (res.status === "success") {
        setproducts(res.data.products);
        setisLoading(false);
        settotal(res.data.totalCartPrice)
      }
    } catch (err) {
      setisLoading(false);
    }
  }

  async function deleteProduct(id : string){
        setremoveDisabled(true);
        setupdateDesiable(true);
  let res = await RemoveItemFromCart(id);
  console.log(res);
  if(res.status === 'success'){
    setproducts(res.data.products)
    toast.success('Product removed from cart', {duration: 2000, position: 'top-center'} )
    let sum = 0;
    res.data.products.forEach((product: CartProductype) => {
      sum += product.count;
    });
    setnumberOfCartItem(sum);
    setremoveDisabled(false);
    setupdateDesiable(false);
    getUserCart()
  } else {
    toast.error('Failed to remove product', {duration: 2000, position: 'top-center'} )
    setremoveDisabled(false);
    setupdateDesiable(false);
  }
  }

  async function updateProduct(id : string,count : string,sign: string){
    setremoveDisabled(true);
    setcurrentId(id);
    setloadingUpdate(true);
    setupdateDesiable(true);
    let res = await updateCartQuantity(id,count);
    console.log(res);
    if(res.status === 'success'){
      setproducts(res.data.products);
      toast.success('Quantity updated successfully', {duration: 2000, position: 'top-center'});
      if(sign === '+'){
        setnumberOfCartItem(numberOfCartItem + 1);
      }else if(sign === '-'){
        setnumberOfCartItem(numberOfCartItem - 1);
      }
       getUserCart();
      setupdateDesiable(false);
      setloadingUpdate(false);
      setremoveDisabled(false);
    }
    else {
      toast.error('Failed to update quantity', {duration: 2000, position: 'top-center'});
      setupdateDesiable(false);
      setloadingUpdate(false);
      setremoveDisabled(false);
    }
  }


  async function clear (){
    let res = await clearCart();
    console.log(res);
    if (res.message === "success") {
      setproducts([]);
      setnumberOfCartItem(0);
    }
  }



  useEffect(() => {
    getUserCart();
  }, []);


  if(isLoading){
    return <h1 className='text-center text-3xl my-12 text-slate-900 font-bold'>
      Loading...
    </h1>;
  }

  return (
    <>
      {products?.length > 0 ? (
        <div className='w-2/3 mx-auto my-12'>
          <div className='flex justify-end'>
            <Button
              onClick={() => clear()}
              className='cursor-pointer my-4 bg-red-500 hover:bg-red-700'
            >
              Clear Cart Items
            </Button>
          </div>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <h1 className="text-center text-3xl font-bold text-emerald-600 my-4 ">Total Cart Price : {total}</h1>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-16 py-3'>
                    Image
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Product
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Qty
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: CartProductype) => (
                  <tr
                    key={product._id}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                  >
                    <td className='p-4'>
                      <img
                        src={product.product.imageCover}
                        className='w-16 md:w-32 max-w-full max-h-full'
                        alt='Apple Watch'
                      />
                    </td>
                    <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                      {product.product.title}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center'>
                        <button
                          disabled={updateDesiable}
                          onClick={() =>
                            updateProduct(
                              product.product.id,
                              `${product.count - 1}`,
                              "-"
                            )
                          }
                          className='inline-flex disabled:bg-slate-300  items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                          type='button'
                        >
                          <span className='sr-only'>Quantity button</span>
                          <svg
                            className='w-3 h-3'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 18 2'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M1 1h16'
                            />
                          </svg>
                        </button>
                        {product.product.id === currentId ? (
                          loadingUpdate ? (
                            <i className='fas fa-spinner fa-spin'></i>
                          ) : (
                            <span>{product.count}</span>
                          )
                        ) : (
                          <span>{product.count}</span>
                        )}
                        <button
                          disabled={updateDesiable}
                          onClick={() =>
                            updateProduct(
                              product.product.id,
                              `${product.count + 1}`,
                              "+"
                            )
                          }
                          className='inline-flex disabled:bg-slate-300 items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                          type='button'
                        >
                          <span className='sr-only'>Quantity button</span>
                          <svg
                            className='w-3 h-3'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 18 18'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 1v16M1 9h16'
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                      {product.price * product.count} EGP
                    </td>
                    <td className='px-6 py-4'>
                      <button
                        disabled={removeDisabled}
                        onClick={() => deleteProduct(product.product.id)}
                        className='text-red-500 font-semibold cursor-pointer disabled:text-white disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl'
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1 className='text-center text-3xl my-12 text-red-500 font-bold'>
          NO Prodcuts yet
        </h1>
      )}
    </>
  );
}





