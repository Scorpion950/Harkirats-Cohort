import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma/db";

export async function POST(req: NextRequest) {
    const data = await req.json();

    await db.orm.public.User.create({
        username: data.username,
        password: data.password
    });

    return NextResponse.json({
        message: "You have been signed up"
    });
}