"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRoom } from "@/app/rooms/[roomId]/context/RoomContext";

// Socket
import { getSocket } from "@/shared/libs/socket";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";

// Types
import { IGoogleDriveVideo } from "@/entities/Video/model/type";

// Api
import { fetchVideos } from "@/entities/Video/api";

export const VideosList = () => {
  const [videos, setVideos] = useState<IGoogleDriveVideo[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  const { room } = useRoom()
  const socket = getSocket(session?.user)

  useEffect(() => {
    const loadVideos = async () => {
      const videos = await fetchVideos(session?.accessToken)
      setLoading(false)
      setVideos(videos)
    }

    loadVideos()
  }, [])

  const handleSelectVideo = (file: IGoogleDriveVideo) => {
    socket.emit("setVideoForRoom", { 
      roomId: room?.id, 
      video: file,
      accessToken: session?.accessToken
    })
  }

  return loading ? (
    <p>Завантаження...</p>
  ) : videos.length === 0 ? (
    <p>Немає доступних відеофайлів</p>
  ) : (
    <>
      <h2 className="text-xl font-bold">🎥 Відеофайли з Google Drive</h2>
      <ul className="space-y-2 overflow-y-auto">
        {videos.map(file => (
          <li key={file.id} className="p-2 rounded shadow-sm flex justify-between items-center">
            <p>{file.name}</p>
            <BaseButton 
              onClick={() => handleSelectVideo(file)} 
              text="Переглянути"
            />
          </li>
        ))}
      </ul>
    </>
  )
}