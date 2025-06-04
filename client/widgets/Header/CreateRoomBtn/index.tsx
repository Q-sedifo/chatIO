import React from "react";
import { useRouter } from "next/navigation";

// Components 
import { BaseButton } from "@/shared/ui/buttons/BaseButton";

// Requests
import { createRoom } from "@/entities/Room/api";

// Icons
import { IoAdd } from "react-icons/io5";

export const CreateRoomBtn = () => {
  const router = useRouter()

  const handleCreateRoom = async () => {
    const { success, newRoom } = await createRoom()
    
    if (!success) return
    router.push(`/rooms/${newRoom.id}`)
  }

  return (
    <BaseButton 
      onClick={handleCreateRoom} 
      text="Створити кімнату"
      icon={<IoAdd/>}
    />
  )
}