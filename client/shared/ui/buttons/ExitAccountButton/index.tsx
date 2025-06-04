import React from "react";
import { signOut } from 'next-auth/react';

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";

export const ExitAccountButton = () => {

  const handleButtonClick = () => {
    signOut()
  }

  return (
    <BaseButton 
      className="bg-red-500"
      text="Exit"
      onClick={handleButtonClick}
    />
  )
}