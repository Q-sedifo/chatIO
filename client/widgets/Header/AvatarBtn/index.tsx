"use state"
import React, { useState } from "react";

// Components
import { UserAvatar } from "@/shared/ui/UserAvatar";

// Modals
import { ProfileModal } from "@/shared/ui/Modals/ProfileModal";

export const AvatarBtn = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false)
  
  const hanleAvatarClick = () => {
    setIsProfileModalOpen(true)
  }

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false)
  }

  return (<>
    <UserAvatar 
      onClick={hanleAvatarClick}
      withIndicator={true}
    />
    {isProfileModalOpen && (
      <ProfileModal onClose={handleCloseProfileModal}/>
    )}
  </>)
}