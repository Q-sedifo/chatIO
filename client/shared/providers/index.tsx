"use client"

import React from "react";

// React query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// NextAuth
import { SessionProvider, useSession } from "next-auth/react";

// Components
import { Loader } from "@/shared/ui/Loader";

const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { status } = useSession()

  if (status === "loading") {
    return <Loader />
  }

  return <>{children}</>
}

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<IProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthGate>
          { children }
        </AuthGate>
      </QueryClientProvider>
    </SessionProvider>
  )
}