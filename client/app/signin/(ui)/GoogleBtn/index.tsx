"use client"
import React from "react";
import { useSearchParams } from "next/navigation";

// Next Auth
import { signIn } from "next-auth/react";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";

export const GoogleBtn = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const handleSignInClick = () => {
    signIn("google", { callbackUrl })
  }

  return (
    <BaseButton 
      text="Sign in with Google"
      onClick={handleSignInClick}
    />
  )
}