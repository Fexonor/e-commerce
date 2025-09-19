import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { productType } from "@/types/product.type";
import AddBtn from "../AddBtn/AddBtn";

export default function SingleProduct({ product } : {product : productType}) {
  return (
    <>
      <div className='w-full md:w-1/2 lg:w-1/4 xl:w-1/5'>
        <div className=' prod p-4'>
          <Card className='gap-2 p-2'>
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle>
                  <Image src={product.imageCover} alt='' width={500} height={500} />
                </CardTitle>
                <CardDescription className='text-emerald-500'>
                  {product.category.name}
                </CardDescription>
              </CardHeader>
              <CardContent className='font-bold'>
                <p className='line-clamp-1'>{product.title}</p>
              </CardContent>
              <CardFooter>
                <div className='flex justify-between w-full'>
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}{" "}
                    <i className='fas fa-star text-yellow-500'></i>
                  </span>
                </div>
              </CardFooter>
            </Link>
            <AddBtn id={product.id} />
          </Card>
        </div>
      </div>
    </>
  );
}
