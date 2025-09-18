import getAllCategories from '@/api/AllCatergories'
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper'

export default async function CategorySlider() {
  
  let data = await getAllCategories()



  return <>
    <CategorySwiper data = {data} />
  </>
}
