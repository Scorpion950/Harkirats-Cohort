import { NextResponse, NextRequest } from "next/server";


export function GET(req: NextRequest) {

    // const headers = req.headers;
    // const authorization = headers["authorization"];
    // const decoded = jwt.decode(authorizationHeader, "SECRET");
    // const userId = decoded.userId;

    return NextResponse.json({
        avatarUrl: "http://images.google.com/cat.png"
    });
}
