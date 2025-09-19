"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartCOntext";

export default function Navbar() {
  const {numberOfCartItem}= useContext(CartContext);
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  function logout(){
    signOut({callbackUrl: '/login'});
  }

  return (
    <>
      <nav className='bg-emerald-600 text-white'>
        <div className='conatiner w-full lg:w-[80%]  mx-auto p-4 flex flex-col gap-4 lg:flex-row justify-between items-center'>
          <div className='left'>
            <ul className='flex gap-2 lg:gap-6 items-center'>
              <li className='text-2xl flex'>
                <Link href='/'>
                  <i className='fa-solid fa-cart-shopping'></i>Freshcart
                </Link>
              </li>
              <li>
                <Link href='/'>Home</Link>
              </li>
              {session && (
                <li>
                  <Link className="relative" href='/cart'>Cart{numberOfCartItem > 0 && <span className="absolute -top-2 -right-2 bg-white text-emerald-600 text-xs rounded-full px-1 font-semibold">{numberOfCartItem}</span>}</Link>
                </li>
              )}
              <li>
                <Link href='/products'>Products</Link>
              </li>
              <li>
                <Link href='/categories'>Categories</Link>
              </li>
              <li>
                <Link href='/brands'>Brands</Link>
              </li>
            </ul>
          </div>
          <div className='right'>
            <ul className='flex gap-4'>
              {!session ? (
                <>
                  <li>
                    <i className='fab fa-facebook'></i>
                  </li>
                  <li>
                    <i className='fab fa-twitter'></i>
                  </li>
                  <li>
                    <i className='fab fa-instagram'></i>
                  </li>
                  <li>
                    <i className='fab fa-tiktok'></i>
                  </li>
                  <li>
                    <i className='fab fa-linkedin'></i>
                  </li>
                  <li>
                    <Link href='/register'>Register</Link>
                  </li>
                  <li>
                    <Link href='/login'>Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span className="cursor-pointer" onClick={logout}>Signout</span>
                  </li>

                  {session && <li>HI {session?.user?.name}</li>}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
