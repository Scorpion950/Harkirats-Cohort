import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({
        user: "yash",
        email: "yash@gmail.com"
    })
}

export function POST(){
    return NextResponse.json({
        user: "yash",
        email: "yash@gmail.com"
    })
}

export function PUT(){
    return NextResponse.json({
        user: "yash",
        email: "yash@gmail.com"
    })
}

