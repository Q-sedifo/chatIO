import { useSession } from "next-auth/react";
import { useRoom } from "../../context/RoomContext";

// Socket
import { getSocket } from "@/shared/libs/socket";

// Components
import { VideosList } from "./ui/VideosList";
import { useEffect } from "react";

export const GoogleDriveContentField = () => {
  const { data: session } = useSession()
  const { room, setRoom } = useRoom()
  const socket = getSocket(session?.user)

  const isMeAHost = session?.user.id === room?.creator.id
  const selectedVideo = room?.video

  useEffect(() => {
    socket.on("selectedVideo", (room) => {
      setRoom(room)
    })

    return () => {
      socket.off("selectedVideo")
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 overflow-hidden">
      {(isMeAHost && !selectedVideo) && <VideosList/>}
      {selectedVideo && (
        <div className="relative w-full h-[100%] flex flex-col justify-between">
          <h3 className="absolute left-4 top-4 text-lg font-semibold mb-2">{selectedVideo.name}</h3>
          <video
            controls
            width="100%"
            height="100%"
            className="rounded shadow-lg"
            src={`/api/drive/stream/${selectedVideo.id}?roomId=${room.id}`}
          />
        </div>
      )}
    </div>
  )
}