"use client"
import { useQuery } from "@tanstack/react-query";

// Components
import { SearchRoom } from "./(ui)/SearchRoom";
import { Header } from "@/widgets/Header";
import { Rooms } from "./(ui)/Rooms";

// Requests
import { getRooms } from "@/entities/Room/api";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms()
  })

  return (
    <>
      <Header/>
      <div className="flex flex-col gap-5 p-5">
        <SearchRoom />
        <Rooms 
          rooms={data} 
          isLoading={isLoading}
        />
      </div>
    </>
  )
}
