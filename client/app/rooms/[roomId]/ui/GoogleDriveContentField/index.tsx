"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRoom } from "../../context/RoomContext";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";

type TDriveFile = {
  id: string;
  name: string;
  mimeType: string;
}

export const GoogleDriveContentField = () => {
  const [videos, setVideos] = useState<TDriveFile[]>([])
  const [selectedVideo, setSelectedVideo] = useState<TDriveFile | null>(null)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const { room } = useRoom()

  const videoExtensions = [".mp4", ".mkv", ".avi", ".mov"]
  const isMeAHost = session?.user.id === room?.creator.id

  console.log("IS i admin", isMeAHost)

  useEffect(() => {
    if (!isMeAHost || selectedVideo) return

    const fetchVideos = async () => {
      if (!session?.accessToken) return
      setLoading(true)

      try {
        const query = encodeURIComponent(`mimeType contains 'video/' and trashed = false`)
        const fields = encodeURIComponent('files(id, name, mimeType)')
        const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}`

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })

        const data = await res.json()

        const filtered = (data.files || []).filter((file: TDriveFile) =>
          videoExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
        )

        setVideos(filtered)
      } catch (error) {
        console.error('Помилка при завантаженні відео з Google Drive:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {isMeAHost && (<>
        {loading ? (
          <p>Завантаження...</p>
        ) : videos.length === 0 ? (
          <p>Немає доступних відеофайлів</p>
        ) : !selectedVideo && (<>
          <h2 className="text-xl font-bold">🎥 Відеофайли з Google Drive</h2>
          <ul className="space-y-2 overflow-y-auto">
            {videos.map(file => (
              <li key={file.id} className="p-2 rounded shadow-sm flex justify-between items-center">
                <p>{file.name}</p>
                <BaseButton 
                  onClick={() => setSelectedVideo(file)} 
                  text="Переглянути"
                />
              </li>
            ))}
          </ul>
        </>)}
      </>)}
      {selectedVideo && (
        <div className="w-full h-[100%] flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-2">{selectedVideo.name}</h3>
          <video
            controls
            width="100%"
            height="480"
            className="rounded shadow-lg"
            src={`/api/drive/stream/${selectedVideo.id}`}
          />
        </div>
      )}
    </div>
  )
}