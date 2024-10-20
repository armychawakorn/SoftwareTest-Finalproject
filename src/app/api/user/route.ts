import { CreateConnection } from "@/libs/mongoose";
import { user } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(){
    await CreateConnection();

    const users = await user.find();

    return NextResponse.json(users);
}