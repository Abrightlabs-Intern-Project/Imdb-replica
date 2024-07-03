import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    year: "",
    rated: "",
    released: "",
    runtime: "",
    plot: "",
    language: "",
    awards: "",
    poster: "",
    trailer: "",
    metascore: "",
    rating: "",
    votes: "",
    boxOffice: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/movies/${id}`).then((response) => {
      setFormState(response.data);
    });
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "poster" && files.length > 0) {
      setFormState({ ...formState, poster: files[0] });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formState)
    await axios.put(`http://localhost:3000/movies/${id}`, formState);
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Movie</h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="year"
            value={formState.year}
            onChange={handleChange}
            placeholder="Year"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="rated"
            value={formState.rated}
            onChange={handleChange}
            placeholder="Rated"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="released"
            value={formState.released}
            onChange={handleChange}
            placeholder="Released"
            className="border p-2 rounded w-full"
            required
          />
          
          <input
            type="text"
            name="runtime"
            value={formState.runtime}
            onChange={handleChange}
            placeholder="Runtime"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="language"
            value={formState.language}
            onChange={handleChange}
            placeholder="Language"
            className="border p-2 rounded w-full"
            required
          />
          <textarea
            name="plot"
            value={formState.plot}
            onChange={handleChange}
            placeholder="Plot"
            className="border p-2 rounded w-full"
            required
          />
          <div className=" grid grid-col-1 gap-4">
            <input
              type="text"
              name="awards"
              value={formState.awards}
              onChange={handleChange}
              placeholder="Awards"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="file"
              name="poster"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <input
            type="text"
            name="trailer"
            value={formState.trailer}
            onChange={handleChange}
            placeholder="Trailer URL"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="metascore"
            value={formState.metascore}
            onChange={handleChange}
            placeholder="Metascore"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="rating"
            value={formState.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="votes"
            value={formState.votes}
            onChange={handleChange}
            placeholder="Votes"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="boxOffice"
            value={formState.boxOffice}
            onChange={handleChange}
            placeholder="Box Office"
            className="border p-2 rounded w-full"
            required
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full">
            Update Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
