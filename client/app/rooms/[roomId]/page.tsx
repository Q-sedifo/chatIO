import React from "react";
import { redirect } from "next/navigation";

// Components
import { RoomProvider } from "./ui/RoomProvider";
import { Room } from "./ui/Room";

interface IParamsProps {
  roomId: string;
}

const RoomPage = async ({ params }: { params: Promise<IParamsProps> }) => {
  const pageParams = await params

  if (!pageParams) redirect("/")

  return (
    <RoomProvider>
      <Room/>
    </RoomProvider>
  )
}

export default RoomPage;