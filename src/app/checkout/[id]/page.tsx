"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { checkoutSchema, checkoutSchemaType } from "@/schema/checkout.schema";
import onlinePayment from "@/checkoutActions/OnlineCheckout.action";

export default function Checkout() {
  const { id }: { id: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleCheckout(values: checkoutSchemaType) {
    setIsLoading(true);
    try {
      // Get base URL with fallback for production
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        (typeof window !== "undefined"
          ? window.location.origin
          : "https://your-vercel-app.vercel.app");

      const res = await onlinePayment(id, baseUrl, values);

      if (res.status === "success" && res.session?.url) {
        window.location.href = res.session.url;
      } else {
        toast.error(res.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='w-1/2 mx-auto my-12 '>
        <h1 className='text-3xl text-center font-bold my-4'>Checkout Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCheckout)}>
            <FormField
              control={form.control}
              name='details'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details:</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input type='tel' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City:</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={isLoading}
              className='mt-4 cursor-pointer w-full'
            >
              {isLoading ? "Processing..." : "Pay Now"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
