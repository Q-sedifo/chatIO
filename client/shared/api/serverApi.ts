import axios from "axios";
import { getSession } from "next-auth/react";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
  headers: { 
    "Content-Type": "application/json", 
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  withCredentials: false,
})

// Send user data with each request
serverApi.interceptors.request.use(async (config) => {
  const session = await getSession()

  if (session) {
    config.headers["x-user"] = JSON.stringify(session.user)
  }

  return config
})

export { serverApi }