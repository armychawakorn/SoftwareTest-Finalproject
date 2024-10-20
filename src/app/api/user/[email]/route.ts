import { CreateConnection } from "@/libs/mongoose";
import { user } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { email: string }}){
    await CreateConnection();
    
    const users = await user.findOne({
        email: params.email
    });

    return NextResponse.json(users);
}