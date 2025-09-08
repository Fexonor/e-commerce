import Link from "next/link";
import React from "react";

export default function Navbar() {
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
              <li>
                <Link href='/cart'>Cart</Link>
              </li>
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
              <li>
                <Link href='/login'>Signout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
