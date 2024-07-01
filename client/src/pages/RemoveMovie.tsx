import axios from "axios";
import { useState } from "react"

const RemoveMovie = () => {
  const [movieId, setMovieId] = useState<string>('');
  const [title, setTitle] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await axios.delete(`http://localhost:3000/movies/delete/${movieId}/${title}`)
      alert("Movie Deleted Successfully")
    } catch (err) {
      console.log(err);
    } 
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className=" flex flex-col items-center py-24 gap-6">
          <span className="text-xl">Enter Required Fields</span>
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="title" value={movieId} onChange={(e) => setMovieId(e.target.value)} placeholder="Movie Id" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
          <button className=" bg-red-500 text-white px-4 py-1 rounded">Delete Movie</button>
      </div>
    </form>
  )
}

export default RemoveMovie