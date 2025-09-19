'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {



let decodedToken = (await cookies()).get("next-auth.session-token")?.value;

let token = await decode({token: decodedToken, secret: process.env.NEXTAUTH_SECRET!})

return token?.token;

}