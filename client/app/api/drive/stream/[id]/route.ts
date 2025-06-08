import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/shared/configs/auth";

type SessionWithToken = {
  accessToken?: string
}

export async function GET(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } }

  const session = await getServerSession(authConfig) as SessionWithToken
  const accessToken = session?.accessToken

  if (!accessToken) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const fileId = params.id
  const range = req.headers.get("range")

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
  }

  if (range) {
    headers.Range = range
  }

  const googleRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      method: "GET",
      headers,
    }
  )

  const resHeaders = new Headers()
  for (const [key, value] of googleRes.headers.entries()) {
    resHeaders.set(key, value)
  }

  return new NextResponse(googleRes.body, {
    status: googleRes.status,
    headers: resHeaders,
  })
}