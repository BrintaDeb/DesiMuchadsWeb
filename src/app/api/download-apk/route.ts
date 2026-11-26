import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "downloads",
      "desi-muchads-v2.4.apk"
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.redirect(
        new URL("/downloads/desi-muchads-v2.4.apk", req.url),
        { status: 307 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": 'attachment; filename="desi-muchads-v2.4.apk"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Error serving APK download:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function HEAD(req: NextRequest) {
  return GET(req);
}
