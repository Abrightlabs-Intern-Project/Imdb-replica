import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Movie } from "../../context/WatchlistContext";
import EntitySection from "./EntitySection";

const Admin = () => {
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
  const [alert, setAlert] = useState(null);

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
      await axios.delete(`http://localhost:3000/${type}/${id}`).then((res) => {
        setAlert(res.data.message);
      });
      if (type === "movies") fetchMovies();
      else if (type === "actor") fetchActors();
      else if (type === "director") fetchDirectors();
      else if (type === "writer") fetchWriters();
      else if (type === "genre") fetchGenres();
      else if (type === "country") fetchCountries();
    } catch (error: any) {
      setAlert(error.response.data.message);
    }
  };

  const handleAdd = async (field: string, value: string) => {
    await axios.post(`http://localhost:3000/${field}`, {
      [`${field}Name`]: value,
    });
  };

  const handleEdit = async (field: string, id: string, value: string) => {
    await axios.patch(`http://localhost:3000/${field}/${id}`, {
      [`${field}Name`]: value,
    });
  }

  const filterItems = (items: any[], key: string, searchTerm: string) => {
    return items.filter((item) => item[key].toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5);
  };

  return (
    <div>
      {alert && (
        <div className="flex justify-between  bg-blue-500 pr-5">
          <div className="flex items-center justify-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
            <p>{alert}</p>
          </div>
          <button className="text-white text-xl " onClick={() => setAlert(null)}>
            &#x2715;
          </button>
        </div>
      )}
      <div className="flex justify-between p-3 ">
        <span className="text-2xl font-semibold">Admin Dashboard</span>
        {/* <button className="bg-gray-900 text-white text-lg px-3 py-1 rounded hover:bg-gray-800" onClick={() => logout()}>
          Logout
        </button> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-3 mb-10">
        <div className="p-3 border border-gray-300 rounded">
          <h2 className="text-xl mb-3 font-semibold">Movies</h2>
          <input type="text" placeholder="Search Movies..." value={movieSearchTerm} onChange={(e) => setMovieSearchTerm(e.target.value)} className="w-full p-2 border rounded mb-3 outline-none"
          />
          {filterItems(movies, "title", movieSearchTerm).map((movie: any) => (
            <div key={movie.movieId} className="flex justify-between items-center p-2 border-b">
              <span>{movie.title}</span>
              <div>
                <Link to={{ pathname: `edit/${movie.movieId}` }}>
                  <button className="bg-[#1E90FF] text-white px-3 py-1 rounded hover:bg-[#2a76c3] mr-2">Edit</button>
                </Link>
                <button onClick={() => handleDelete(movie.movieId, "movies")} className="bg-[#1E90FF] text-white px-3 py-1 rounded hover:bg-[#2a76c3]"> Delete </button>
              </div>
            </div>
          ))}
          <Link to="add">
            <button className="bg-[#1E90FF] text-white px-3 py-1 rounded mt-3 w-full hover:bg-[#2a76c3]">ADD</button>
          </Link>
        </div>

        <EntitySection entity="actor" entityNameKey="actorName" fetchEntities={fetchActors} handleAdd={handleAdd}
        handleDelete={handleDelete} handleEdit={handleEdit} filterItems={filterItems} entitySearchTerm={actorSearchTerm} setEntitySearchTerm={setActorSearchTerm} additionalFields={actors}
        />
        <EntitySection entity="director" entityNameKey="directorName" fetchEntities={fetchDirectors} handleAdd={handleAdd}handleDelete={handleDelete} handleEdit={handleEdit} filterItems={filterItems} entitySearchTerm={directorSearchTerm} setEntitySearchTerm={setDirectorSearchTerm} additionalFields={directors}
        />
        <EntitySection entity="writer" entityNameKey="writerName" fetchEntities={fetchWriters} handleAdd={handleAdd} handleDelete={handleDelete} handleEdit={handleEdit} filterItems={filterItems} entitySearchTerm={writerSearchTerm} setEntitySearchTerm={setWriterSearchTerm} additionalFields={writers}
        />
        <EntitySection entity="genre" entityNameKey="genreName" fetchEntities={fetchGenres} handleAdd={handleAdd} handleDelete={handleDelete} handleEdit={handleEdit} filterItems={filterItems} entitySearchTerm={genreSearchTerm} setEntitySearchTerm={setGenreSearchTerm} additionalFields={genres}
        />
        <EntitySection entity="country" entityNameKey="countryName" fetchEntities={fetchCountries} handleAdd={handleAdd} handleDelete={handleDelete} handleEdit={handleEdit} filterItems={filterItems} entitySearchTerm={countrySearchTerm} setEntitySearchTerm={setCountrySearchTerm} additionalFields={countries}
        />
      </div>
    </div>
  );
};

export default Admin;
