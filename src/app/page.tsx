import Image from "next/image";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from './_components/CatergorySlider/CategorySlider';
import Allproducts from "./_components/AllProducts/Allproducts";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <Allproducts />
    </>
  );
}
