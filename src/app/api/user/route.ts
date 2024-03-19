import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import * as z from 'zod';

//define schema for input validation
const userSchema = z
  .object({
    name: z.string().min(1, 'name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })
  
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password } = userSchema.parse(body);

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email}
        });
        if(existingUserByEmail){
            return NextResponse.json({user: null, message: "User with this email already exists"}, {status: 409})
        }

        // const existingUserByName = await db.user.findUnique({
        //     where: { name: name}
        // });

        // if(existingUserByName){
        //     return NextResponse.json({user: null, message: "User with this name already exists"}, {status: 409})
        // }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        const { password: newUserPassword, ...rest} = newUser;

        return NextResponse.json({user: newUser, message: "User created successfully"},{status: 201});
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong!"},{status: 500});
    }

}