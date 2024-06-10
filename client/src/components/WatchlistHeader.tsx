import { FC } from "react"

export const WatchlistHeader:FC = () => {
  return (
    <div className=' bg-[#333333] flex flex-col gap-3 py-4 md:py-10 px-2'>
        <span className=' text-white text-4xl sm:px-32 md:px-28 lg:px-40'>Your Watchlist</span>
        <span className=' text-white text-sm sm:px-32 md:px-28 lg:px-40'>Your Watchlist is the place to track the titles you want to watch. You can sort your Watchlist by the IMDb rating, popularity score and arrange your titles in the order you want to see them.</span>
    </div>
  )
}