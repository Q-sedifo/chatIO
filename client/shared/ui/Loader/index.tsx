"use client"
import React, { useEffect } from "react";

export const Loader = () => {

  useEffect(() => {
    const body = document.body
    body.style.overflowY = "hidden"

    return () => {
      body.style.overflowY = "auto"
    }
  }, [])
  
  return (
    <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-50">
      <h1>Loading...</h1>
    </div>
  )
}