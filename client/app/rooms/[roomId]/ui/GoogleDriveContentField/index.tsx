"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

// Components
import { BaseButton } from '@/shared/ui/buttons/BaseButton'

type DriveFile = {
  id: string
  name: string
  mimeType: string
}

export const GoogleDriveContentField = () => {
  const { data: session } = useSession()
  const [videos, setVideos] = useState<DriveFile[]>([])
  const [selectedVideo, setSelectedVideo] = useState<DriveFile | null>(null)
  const [loading, setLoading] = useState(false)

  const videoExtensions = [".mp4", ".mkv", ".avi", ".mov"]

  useEffect(() => {
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

        const filtered = (data.files || []).filter((file: DriveFile) =>
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
  }, [session])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">🎥 Відеофайли з Google Drive</h2>

      {loading ? (
        <p>Завантаження...</p>
      ) : videos.length === 0 ? (
        <p>Немає доступних відеофайлів</p>
      ) : (
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
      )}

      {selectedVideo && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">{selectedVideo.name}</h3>
          <iframe
            src={`https://drive.google.com/file/d/${selectedVideo.id}/preview`}
            width="100%"
            height="480"
            allow="autoplay"
            className="rounded shadow-lg"
            allowFullScreen
          />
        </div>
      )}
    </div>
  )
}