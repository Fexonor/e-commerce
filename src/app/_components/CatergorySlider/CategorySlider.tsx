import getAllCategories from '@/api/AllCatergories'
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper'

export default async function CategorySlider() {
  
  const data = await getAllCategories()



  return <>
    <CategorySwiper data = {data} />
  </>
}
