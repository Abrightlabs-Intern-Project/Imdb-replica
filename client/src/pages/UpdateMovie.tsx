import React, { useState } from 'react';
import axios from 'axios';
import { Movie, Actor, Director, Writer, Genre, Country } from '../context/WatchlistContext';

const UpdateMovie = () => {
  const [formState, setFormState] = useState<Movie>({
    movieId: '',
    title: '',
    year: '',
    rated: '',
    released: '',
    runtime: '',
    plot: '',
    language: '',
    awards: '',
    poster: '',
    trailer: '',
    metascore: '',
    rating: '',
    votes: '',
    boxOffice: '',
    actors: [],
    directors: [],
    writers: [],
    genres: [],
    countries: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleDynamicChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: 'actors' | 'directors' | 'writers' | 'genres' | 'countries',
    field: string
  ) => {
    const updatedValues = [...(formState[type] as any)];
    updatedValues[index] = { ...updatedValues[index], [field]: e.target.value };
    setFormState({ ...formState, [type]: updatedValues });
  };

  const addDynamicField = (type: 'directors'| 'actors' | 'countries' | 'writers' | 'genres') => {
    let newField;
    switch (type) {
      case 'actors':
        newField = { actorId: '', actorName: '', imageUrl: '' };
        break;
      case 'directors':
        newField = { directorId: '', directorName: '' };
        break;
      case 'writers':
        newField = { writerId: '', writerName: '' };
        break;
      case 'genres':
        newField = { genreId: '', genreName: '' };
        break;
      case 'countries':
        newField = { countryId: '', countryName: '' };
        break;
      default:
        newField = '';
    }
    setFormState({ ...formState, [type]: [...formState[type], newField] });
  };

  const removeDynamicField = (index: number, type: 'directors'| 'actors' | 'countries' | 'writers' | 'genres') => {
    const updatedValues = [...formState[type]];
    updatedValues.splice(index, 1);
    setFormState({ ...formState, [type]: updatedValues });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const {movieId, ...data} = formState;
    e.preventDefault();
    try {
      console.log(data, movieId)
      await axios.patch(`http://localhost:3000/movies/update/${movieId}`, data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className='flex justify-center flex-col items-center py-10' onSubmit={handleSubmit}>
      <span className='text-2xl font-semibold'>Update Movie Details</span>
      <div className=' flex py-6 flex-col md:flex-row'>
        <div className='flex flex-col px-2 py-2 gap-3'>
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="movieId" value={formState.movieId} onChange={handleChange} placeholder="Movie ID" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="title" value={formState.title} onChange={handleChange} placeholder="Title"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="year" value={formState.year} onChange={handleChange} placeholder="Year"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="rated" value={formState.rated} onChange={handleChange} placeholder="Rated"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="released" value={formState.released} onChange={handleChange} placeholder="Released"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="runtime" value={formState.runtime} onChange={handleChange} placeholder="Runtime" />
          <textarea className='px-4 py-1 border border-gray-500 rounded w-80 h-20' name="plot" value={formState.plot} onChange={handleChange} placeholder="Plot"  />

          {formState.actors.map((actor: Actor, index: number) => (
          <div key={index} className='flex flex-col gap-3'>
            <div className='flex items-center'>
              <input
                className='px-4 py-1 border border-gray-500 rounded-l w-72'
                value={actor.actorName}
                onChange={(e) => handleDynamicChange(e, index, 'actors', 'actorName')}
                placeholder="Actor Name"
              />
              <button className='px-3 py-1 border border-gray-500 rounded-r text-gray-500 hover:bg-gray-100' type="button" onClick={() => removeDynamicField(index, 'actors')}>X</button>
            </div>
            <input
              className='px-4 py-1 border border-gray-500 rounded w-80'
              value={actor.image}
              onChange={(e) => handleDynamicChange(e, index, 'actors', 'imageUrl')}
              placeholder="Actor URL"
            />
          </div>
          ))}
        <button className='text-white inline-block bg-blue-500 py-1 hover:bg-blue-400 w-80 rounded' type="button" onClick={() => addDynamicField('actors')}>Add Actor</button>

        {formState.directors.map((director: Director, index: number) => (
          <div key={index} className='flex items-center'>
            <input
              className='px-4 py-1 border border-gray-500 rounded-l w-72'
              value={director.directorName}
              onChange={(e) => handleDynamicChange(e, index, 'directors', 'directorName')}
              placeholder="Director Name"
            />
            <button className='px-3 py-1 border border-gray-500 rounded-r text-gray-500 hover:bg-gray-100' type="button" onClick={() => removeDynamicField(index, 'directors')}>X</button>
          </div>
        ))}
        <button className='text-white inline-block bg-blue-500 py-1 hover:bg-blue-400 w-80 rounded' type="button" onClick={() => addDynamicField('directors')}>Add Director</button>

        {formState.writers.map((writer: Writer, index: number) => (
          <div key={index} className='flex items-center'>
            <input
              className='px-4 py-1 border border-gray-500 rounded-l w-72'
              value={writer.writerName}
              onChange={(e) => handleDynamicChange(e, index, 'writers', 'writerName')}
              placeholder="Writer Name"
            />
            <button className='px-3 py-1 border border-gray-500 rounded-r text-gray-500 hover:bg-gray-100' type="button" onClick={() => removeDynamicField(index, 'writers')}>X</button>
          </div>
        ))}
        <button className='text-white inline-block bg-blue-500 py-1 rounded hover:bg-blue-400 w-80' type="button" onClick={() => addDynamicField('writers')}>Add Writer</button>
        </div>
        <div className='flex flex-col px-2 py-2 gap-3'>
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="language" value={formState.language} onChange={handleChange} placeholder="Language"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="awards" value={formState.awards} onChange={handleChange} placeholder="Awards"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="poster" value={formState.poster} onChange={handleChange} placeholder="Poster"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="trailer" value={formState.trailer} onChange={handleChange} placeholder="Trailer"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="metascore" value={formState.metascore} onChange={handleChange} placeholder="Metascore"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="rating" value={formState.rating} onChange={handleChange} placeholder="Rating"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="votes" value={formState.votes} onChange={handleChange} placeholder="Votes"  />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="boxOffice" value={formState.boxOffice} onChange={handleChange} placeholder="Box Office" />
          {formState.genres.map((genre: Genre, index: number) => (
          <div key={index} className='flex items-center'>
            <input
              className='px-4 py-1 border border-gray-500 rounded-l w-72'
              value={genre.genreName}
              onChange={(e) => handleDynamicChange(e, index, 'genres', 'genreName')}
              placeholder="Genre Name"
            />
            <button className='px-3 py-1 border border-gray-500 rounded-r text-gray-500 hover:bg-gray-100' type="button"  onClick={() => removeDynamicField(index, 'genres')}>X</button>
          </div>
        ))}
        <button className='text-white inline-block bg-blue-500 py-1 rounded hover:bg-blue-400 w-80' type="button" onClick={() => addDynamicField('genres')}>Add Genre</button>

        {formState.countries.map((country: Country, index: number) => (
          <div key={index} className='flex items-center'>
            <input
              className='px-4 py-1 border border-gray-500 rounded-l w-72'
              value={country.countryName}
              onChange={(e) => handleDynamicChange(e, index, 'countries', 'countryName')}
              placeholder="Country Name"
            />
            <button className='px-3 py-1 border border-gray-500 rounded-r text-gray-500 hover:bg-gray-100' type="button" onClick={() => removeDynamicField(index, 'countries')}>X</button>
          </div>
        ))}
        <button className='text-white inline-block bg-blue-500 py-1 rounded hover:bg-blue-400 w-80' type="button" onClick={() => addDynamicField('countries')}>Add Country</button>

        <button className='text-white bg-red-500 py-1 hover:bg-red-400 w-80' type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default UpdateMovie;
