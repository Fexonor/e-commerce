"use client";
import React from "react";
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
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema, loginSchemaform } from "@/schema/login.schema";
import { signIn } from "next-auth/react";

export default function Login() {
  let router = useRouter();

  const form = useForm<loginSchemaform>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: loginSchemaform) {
    let response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    console.log(response);

    if (response?.ok) {
      toast.success("YOU Loged in Successfully", {
        position: "top-center",
        duration: 3000,
      });
      window.location.href = "/";
    } else {
      toast.error(response?.error, {
        position: "top-center",
        duration: 3000,
      });
    }

    // try {
    //   let res = await axios.post(
    //     "https://ecommerce.routemisr.com/api/v1/auth/signin",
    //     values
    //   );
    //   if (res.data.message === "success") {
    //     toast.success("YOU Loged in Successfully", {
    //       position: "top-center",
    //       duration: 3000,
    //     });
    //     router.push("/");
    //   }
    // } catch (err) {
    //   toast.error(err.response.data.message, {
    //     position: "top-center",
    //     duration: 3000,
    //   });
    // }
  }

  return (
    <>
      <div className='w-1/2 mx-auto my-12 '>
        <h1 className='text-3xl text-center font-bold my-4'>Login Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-4 cursor-pointer w-full'>Login Now</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
