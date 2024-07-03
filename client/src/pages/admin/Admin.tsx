import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Movie } from "../../context/WatchlistContext";
import { Alert } from "@aws-amplify/ui-react";

const Admin = ({ logout }: any) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);

  const [movieSearchTerm, setMovieSearchTerm] = useState("");
  const [actorSearchTerm, setActorSearchTerm] = useState("");
  const [directorSearchTerm, setDirectorSearchTerm] = useState("");
  const [writerSearchTerm, setWriterSearchTerm] = useState("");
  const [genreSearchTerm, setGenreSearchTerm] = useState("");
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    fetchMovies();
    fetchActors();
    fetchDirectors();
    fetchWriters();
    fetchGenres();
    fetchCountries();
  }, []);

  const fetchMovies = async () => {
    const response = await axios.get("http://localhost:3000/movies");
    setMovies(response.data);
  };

  const fetchActors = async () => {
    const response = await axios.get("http://localhost:3000/actor");
    setActors(response.data);
  };

  const fetchDirectors = async () => {
    const response = await axios.get("http://localhost:3000/director");
    setDirectors(response.data);
  };

  const fetchWriters = async () => {
    const response = await axios.get("http://localhost:3000/writer");
    setWriters(response.data);
  };

  const fetchGenres = async () => {
    const response = await axios.get("http://localhost:3000/genre");
    setGenres(response.data);
  };

  const fetchCountries = async () => {
    const response = await axios.get("http://localhost:3000/country");
    setCountries(response.data);
  };

  const handleDelete = async (id: any, type: string) => {
    try {
      await axios.delete(`http://localhost:3000/${type}/${id}`)
      .then((res) => { setAlert(res.data.message) });
      if (type === "movies") fetchMovies();
      else if (type === "actors") fetchActors();
      else if (type === "directors") fetchDirectors();
      else if (type === "writers") fetchWriters();
      else if (type === "genres") fetchGenres();
      else if (type === "countries") fetchCountries();
    } catch (error: any) {
      setAlert(error.response.data.message)
    }
  };

  const filterItems = (items: any[], key: string, searchTerm: string) => {
    return items.filter(item => item[key].toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 2);
  };

  return (
    <div>
      {alert && 
      <div className="flex justify-between bg-black pr-5">
        <Alert backgroundColor={"black"} color={"white"}>
          {alert}
        </Alert>
        <button className="text-white text-xl " onClick={()=>setAlert(null)}>&#x2715;</button>
      </div>
      }
      <div className="flex justify-between p-3 ">
        <span className="text-2xl font-semibold">Admin Dashboard</span>
        <button
          className="bg-gray-900 text-white text-lg px-3 py-1 rounded hover:bg-gray-800"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-3  ">
        <div className="p-3 border border-gray-300 rounded">
          <h2 className="text-xl mb-3">Movies</h2>
          <input
            type="text"
            placeholder="Search Movies..."
            value={movieSearchTerm}
            onChange={e => setMovieSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-3 outline-none"
          />
          {filterItems(movies, "title", movieSearchTerm).map((movie: any) => (
            <div key={movie.movieId} className="flex justify-between items-center p-2 border-b">
              <span>{movie.title}</span>
              <div>
                <Link to={{ pathname: `/edit/${movie.movieId}` }}>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 mr-2">
                    Edit
                  </button>
                </Link>
                <button onClick={() => handleDelete(movie.movieId, "movies")} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">
                  Delete
                </button>
              </div>
            </div>
          ))}
          <Link to="/add">
            <button className="bg-green-500 text-white px-3 py-1 rounded mt-3  w-full">
              ADD
            </button>
          </Link>
        </div>

        <div className="p-3 border border-gray-300 rounded">
          <h2 className="text-xl mb-3">Actors</h2>
          <input
            type="text"
            placeholder="Search Actors..."
            value={actorSearchTerm}
            onChange={e => setActorSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-3 outline-none"
          />
          {filterItems(actors, "actorName", actorSearchTerm).map((actor: any) => (
            <div key={actor.actorId} className="flex justify-between items-center p-2 border-b">
              <span>{actor.actorName}</span>
              <button onClick={() => handleDelete(actor.actorId, "actor")} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">
                Delete
              </button>
            </div>
          ))}
          <div className="flex mt-3 gap-3 p-1">
            <input
              type="text"
              placeholder="Enter Actor Name..."
              className="w-full px-3 py-1 border outline-none rounded-md"
            />
            <button className="bg-green-500 text-white px-5 rounded">
              ADD
            </button>
          </div>
          <input className="m-1 px-2 py-1 border rounded outline-none" type="file" />
        </div>

        <div className="p-3 border border-gray-300 rounded">
          <h2 className="text-xl mb-3">Directors</h2>
          <input
            type="text"
            placeholder="Search Directors..."
            value={directorSearchTerm}
            onChange={e => setDirectorSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-3 outline-none"
          />
          {filterItems(directors, "directorName", directorSearchTerm).map((director: any) => (
            <div key={director.directorId} className="flex justify-between items-center p-2 border-b">
              <span>{director.directorName}</span>
              <button onClick={() => handleDelete(director.directorId, "director")} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">
                Delete
              </button>
            </div>
          ))}
          <div className="flex mt-3 gap-3 p-1">
            <input
              type="text"
              placeholder="Enter Director Name..."
              className="w-full px-3 py-1 border outline-none rounded-md"
            />
            <button className="bg-green-500 text-white px-5 rounded">
              ADD
            </button>
          </div>
        </div>

        <div className="p-3 border border-gray-300 rounded">
          <h2 className="text-xl mb-3">Writers</h2>
          <input
            type="text"
            placeholder="Search Writers..."
            value={writerSearchTerm}
            onChange={e => setWriterSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-3 outline-none"
          />
          {filterItems(writers, "writerName", writerSearchTerm).map((writer: any) => (
            <div key={writer.writerId} className="flex justify-between items-center p-2 border-b">
              <span>{writer.writerName}</span>
              <button onClick={() => handleDelete(writer.writerId, "writer")} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">
                Delete
              </button>
            </div>
          ))}
          <div className="flex mt-3 gap-3 p-1">
            <input
              type="text"
              placeholder="Enter Witer Name..."
              className="w-full px-3 py-1 border outline-none rounded-md"
            />
            <button className="bg-green-500 text-white px-5 rounded">
              ADD
            </button>
          </div>
        </div>

        <div className="p-3 border border-gray-300 rounded">
          <h2 className="text-xl mb-3">Genres</h2>
          <input
            type="text"
            placeholder="Search Genres..."
            value={genreSearchTerm}
            onChange={e => setGenreSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-3 outline-none"
          />
          {filterItems(genres, "genreName", genreSearchTerm).map((genre: any) => (
            <div key={genre.genreId} className="flex justify-between items-center p-2 border-b">
              <span>{genre.genreName}</span>
              <button onClick={() => handleDelete(genre.genreId, "genre")} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">
                Delete
              </button>
            </div>
          ))}
          <div className="flex mt-3 gap-3 p-1">
            <input
              type="text"
              placeholder="Enter Genre Name..."
              className="w-full px-3 py-1 border outline-none rounded-md"
            />
            <button className="bg-green-500 text-white px-5 rounded">
              ADD
            </button>
          </div>
        </div>
          <div className="p-3 border border-gray-300 rounded">
            <h2 className="text-xl mb-3">Country</h2>
            <input
              type="text"
              placeholder="Search Country..."
              value={countrySearchTerm}
              onChange={e => setCountrySearchTerm(e.target.value)}
              className="w-full p-2 border rounded mb-3 outline-none"
            />
            {filterItems(countries, "countryName", countrySearchTerm).map((country: any) => (
              <div key={country.countryId} className="flex justify-between items-center p-2 border-b">
                <span>{country.countryName}</span>
                <button onClick={() => handleDelete(country.countryId, "country")} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">
                  Delete
                </button>
              </div>
            ))}
            <div className="flex mt-3 gap-3 p-1">
              <input
                type="text"
                placeholder="Enter Country Name..."
                className="w-full px-3 py-1 border outline-none rounded-md"
              />
              <button className="bg-green-500 text-white px-5 rounded">
                ADD
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Admin;

