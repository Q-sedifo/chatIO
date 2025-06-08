// Types
import { IGoogleDriveVideo } from "../model/type";

// Getting all videos from user google drive
export const fetchVideos = async (accessToken: string | undefined) => {
  if (!accessToken) return

  const videoExtensions = [".mp4", ".mkv", ".avi", ".mov"]

  try {
    const query = encodeURIComponent(`mimeType contains 'video/' and trashed = false`)
    const fields = encodeURIComponent('files(id, name, mimeType)')
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await res.json()

    const filtered = (data.files || []).filter((file: IGoogleDriveVideo) =>
      videoExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    )

    return filtered
  } catch (error) {
    console.error('Помилка при завантаженні відео з Google Drive:', error)
  }
}