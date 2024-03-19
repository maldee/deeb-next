import NextAuth from "next-auth"

declare module "next-auth" {
 
  interface User{
    name: string
    subscription: string
  }  
  interface Session {
    user: User & {
        name: string
        subscription: string
    }
    token: {
        name: string
        subscription:string
    }
  }
}