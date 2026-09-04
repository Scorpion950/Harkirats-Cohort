import jwt from "jsonwebtoken";
import {NextRequest,NextResponse}from "next/server";

export async function POST(req:NextRequest){

    const body = await req.json();

    const username = body.username;
    const paswword = body.password;
    //CHECK IN THE DB

    const userId = 1;
    const token = jwt.sign({
        userId,
    }, 'SECRET');

    return NextResponse.json({
        token
    })

}