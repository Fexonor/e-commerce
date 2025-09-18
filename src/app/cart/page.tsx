import { authoptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Cart() {


  // let session = await getServerSession(authoptions);

  // if(!session) {
  //   redirect('/login');
  // }


  return <div>Cart</div>;
}
