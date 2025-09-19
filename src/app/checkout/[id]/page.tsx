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
import { useParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { checkoutSchema, checkoutSchemaType } from "@/schema/checkout.schema";
import onlinePayment from "@/checkoutActions/OnlineCheckout.action";

export default function Checkout() {
  const { id }: { id: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

      console.log("Base URL:", baseUrl);
      console.log("Cart ID:", id);
      console.log("Form values:", values);

      const res = await onlinePayment(id, baseUrl, values);

      console.log("Payment response:", res);

      if (res.status === "success" && res.session?.url) {
        console.log("Redirecting to:", res.session.url);
        window.location.href = res.session.url;
      } else {
        console.error("Payment failed:", res);
        toast.error(res.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='w-1/2 mx-auto my-12 '>
        <h1 className='text-3xl text-center font-bold my-4'>Checkout Now</h1>

        {/* Debug info - remove this in production */}
        {process.env.NODE_ENV === "development" && (
          <div className='mb-4 p-4 bg-gray-100 rounded text-sm'>
            <p>
              <strong>Debug Info:</strong>
            </p>
            <p>Base URL: {process.env.NEXT_PUBLIC_BASE_URL || "Not set"}</p>
            <p>Cart ID: {id}</p>
            <p>
              Current Origin:{" "}
              {typeof window !== "undefined" ? window.location.origin : "N/A"}
            </p>
          </div>
        )}
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
