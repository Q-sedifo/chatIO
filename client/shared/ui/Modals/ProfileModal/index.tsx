import React from "react";
import { useSession } from "next-auth/react";

// Components
import { Modal } from "@/shared/ui/Modals/index";
import { UserAvatar } from "../../UserAvatar";
import Box from "@/shared/ui/Box";

interface IProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<IProfileModalProps> = ({ onClose }) => {
  const { data } = useSession()

  return (
    <Modal onClose={onClose}>
      <Box className="w-fit">
        <Box.Title>Profile</Box.Title>
        <Box.Content className="flex items-center gap-5">
          <UserAvatar/>
          <div className="flex flex-col">
            {data?.user?.name}
            <span className="text-gray-500">
              {data?.user?.email}
            </span>
          </div>
        </Box.Content>
      </Box>
    </Modal>
  )
}