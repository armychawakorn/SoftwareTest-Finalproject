import { NextRequest, NextResponse } from "next/server";
import IResponse from "../IResponse";
import * as bcrypt from 'bcrypt';
import { user } from "@/models/user";
import { CreateConnection } from "@/libs/mongoose";

export async function POST(req: NextRequest){
    const body = await req.json();
    const { email, password } = body;
    
    if(!email || !password){
        return NextResponse.json<IResponse>({
            status: 400,
            message: 'Email and password are required',
        })
    }

    await CreateConnection();

    const userExist = await user.findOne({ email: email });

    if(userExist){
        return NextResponse.json<IResponse>({
            status: 400,
            message: 'User already exist',
        })
    }

    const random_salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, random_salt);

    const newUser = new user({
        email,
        password: hashed_password
    });

    await newUser.save();

    return NextResponse.json<IResponse>({
        status: 200,
        message: 'Signup successful',
    })
}