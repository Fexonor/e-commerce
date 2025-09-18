"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { categoryType } from '@/types/category.type';

export default function CategorySwiper({ data }: { data: categoryType[]}) {
  return (
    <>
      <div className='w-[80%] mx-auto'>
        <h1 className='text-slate-600 font-semibold my-2'>
          Shop Popular Category
        </h1>
        <Swiper
          spaceBetween={0}
          slidesPerView={7}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          {data.map((category: categoryType) => (
            <SwiperSlide key={category._id}>
              <Image
                width={500}
                height={500}
                src={category.image}
                className='w-full h-[150px] object-cover'
                alt='test'
              />
              <p className='text-center font-bold'>{category.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
