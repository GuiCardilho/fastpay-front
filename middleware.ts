import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const user = req.cookies.get("user-store");

    // @ts-ignore
    const token = user?.state?.user?.token || "";
    const verifiedToken = token && token.length > 0;

    if (req.nextUrl.pathname === "/" && !verifiedToken) {
        req.cookies.delete("user-store");
        return;
    }

    if (!verifiedToken) {
        req.cookies.delete("user-store");
        return NextResponse.rewrite(new URL("/", req.url));
    }
}

export const config = {
    matcher: ["/*"],
};
