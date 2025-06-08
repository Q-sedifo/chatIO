import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/shared/api/serverApi";

export async function GET(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } }

  const url = new URL(req.url)
  const roomId = url.searchParams.get("roomId")

  // Getting google drive access token for all users
  const { data } = await serverApi.get(`/rooms/${roomId}/getToken`)
  const accessToken = data.accessToken

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

  console.log("test", googleRes)

  const resHeaders = new Headers()
  for (const [key, value] of googleRes.headers.entries()) {
    resHeaders.set(key, value)
  }

  return new NextResponse(googleRes.body, {
    status: googleRes.status,
    headers: resHeaders,
  })
}