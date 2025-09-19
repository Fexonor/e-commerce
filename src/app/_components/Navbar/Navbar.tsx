"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const context = useContext(CartContext);

  if (!context) throw new Error("Not Exist");
  const { numberOfCartItem } = context;
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className='bg-emerald-600 text-white sticky top-0 z-50'>
        <div className='container w-full lg:w-[80%] mx-auto px-4 py-3'>
          {/* Desktop and Mobile Header */}
          <div className='flex justify-between items-center'>
            {/* Left Section - Logo and Navigation */}
            <div className='flex items-center gap-6'>
              {/* Logo */}
              <Link
                href='/'
                className='text-2xl font-bold flex items-center gap-2'
              >
                <i className='fa-solid fa-cart-shopping'></i>
                <span className='hidden sm:inline'>Freshcart</span>
              </Link>

              {/* Desktop Navigation */}
              <div className='hidden lg:flex items-center gap-6'>
                <Link
                  href='/'
                  className='hover:text-emerald-200 transition-colors'
                >
                  Home
                </Link>
                {session && (
                  <Link
                    className='relative hover:text-emerald-200 transition-colors'
                    href='/cart'
                  >
                    Cart
                    {numberOfCartItem > 0 && (
                      <span className='absolute -top-2 -right-2 bg-white text-emerald-600 text-xs rounded-full px-1 font-semibold'>
                        {numberOfCartItem}
                      </span>
                    )}
                  </Link>
                )}
                <Link
                  href='/products'
                  className='hover:text-emerald-200 transition-colors'
                >
                  Products
                </Link>
                <Link
                  href='/categories'
                  className='hover:text-emerald-200 transition-colors'
                >
                  Categories
                </Link>
                <Link
                  href='/brands'
                  className='hover:text-emerald-200 transition-colors'
                >
                  Brands
                </Link>
              </div>
            </div>

            {/* Right Section - Auth and Social */}
            <div className='hidden lg:flex items-center gap-4'>
              {!session ? (
                <>
                  <div className='flex items-center gap-3 text-lg'>
                    <i className='fab fa-facebook hover:text-emerald-200 cursor-pointer transition-colors'></i>
                    <i className='fab fa-twitter hover:text-emerald-200 cursor-pointer transition-colors'></i>
                    <i className='fab fa-instagram hover:text-emerald-200 cursor-pointer transition-colors'></i>
                    <i className='fab fa-tiktok hover:text-emerald-200 cursor-pointer transition-colors'></i>
                    <i className='fab fa-linkedin hover:text-emerald-200 cursor-pointer transition-colors'></i>
                  </div>
                  <div className='flex items-center gap-3 ml-4'>
                    <Link
                      href='/register'
                      className='hover:text-emerald-200 transition-colors'
                    >
                      Register
                    </Link>
                    <Link
                      href='/login'
                      className='hover:text-emerald-200 transition-colors'
                    >
                      Login
                    </Link>
                  </div>
                </>
              ) : (
                <div className='flex items-center gap-4'>
                  <span className='text-sm'>Hi {session?.user?.name}</span>
                  <button
                    onClick={logout}
                    className='hover:text-emerald-200 transition-colors cursor-pointer'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className='lg:hidden text-2xl focus:outline-none'
              aria-label='Toggle mobile menu'
            >
              <i
                className={`fa-solid ${
                  isMobileMenuOpen ? "fa-times" : "fa-bars"
                }`}
              ></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className='lg:hidden mt-4 pb-4 border-t border-emerald-500 pt-4'>
              <div className='flex flex-col space-y-4'>
                {/* Mobile Navigation Links */}
                <div className='flex flex-col space-y-3'>
                  <Link
                    href='/'
                    className='hover:text-emerald-200 transition-colors py-2'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  {session && (
                    <Link
                      className='relative hover:text-emerald-200 transition-colors py-2'
                      href='/cart'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Cart
                      {numberOfCartItem > 0 && (
                        <span className='ml-2 bg-white text-emerald-600 text-xs rounded-full px-2 py-1 font-semibold'>
                          {numberOfCartItem}
                        </span>
                      )}
                    </Link>
                  )}
                  <Link
                    href='/products'
                    className='hover:text-emerald-200 transition-colors py-2'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    href='/categories'
                    className='hover:text-emerald-200 transition-colors py-2'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Categories
                  </Link>
                  <Link
                    href='/brands'
                    className='hover:text-emerald-200 transition-colors py-2'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Brands
                  </Link>
                </div>

                {/* Mobile Social Icons */}
                <div className='flex items-center gap-4 text-lg py-2'>
                  <i className='fab fa-facebook hover:text-emerald-200 cursor-pointer transition-colors'></i>
                  <i className='fab fa-twitter hover:text-emerald-200 cursor-pointer transition-colors'></i>
                  <i className='fab fa-instagram hover:text-emerald-200 cursor-pointer transition-colors'></i>
                  <i className='fab fa-tiktok hover:text-emerald-200 cursor-pointer transition-colors'></i>
                  <i className='fab fa-linkedin hover:text-emerald-200 cursor-pointer transition-colors'></i>
                </div>

                {/* Mobile Auth Section */}
                <div className='border-t border-emerald-500 pt-4'>
                  {!session ? (
                    <div className='flex flex-col space-y-3'>
                      <Link
                        href='/register'
                        className='hover:text-emerald-200 transition-colors py-2'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                      <Link
                        href='/login'
                        className='hover:text-emerald-200 transition-colors py-2'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </div>
                  ) : (
                    <div className='flex flex-col space-y-3'>
                      <span className='text-sm py-2'>
                        Hi {session?.user?.name}
                      </span>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className='hover:text-emerald-200 transition-colors cursor-pointer text-left py-2'
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
