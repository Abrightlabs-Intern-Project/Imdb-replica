import React, { useState } from 'react';
import axios from 'axios';
import { Movie, Actor, Director, Writer, Genre, Country } from '../context/WatchlistContext';

const AddMovie = () => {
  const [formState, setFormState] = useState<any>({
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
    const { name, value, type } = e.target;
    if (type === 'file') {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        setFormState({ ...formState, [name]: target.files[0] });
      }
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };
  

  const handleDynamicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    type: 'actors' | 'directors' | 'writers' | 'genres' | 'countries',
    field: string
  ) => {
    const updatedValues = [...formState[type] as any];
    if (field === 'image') {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0)
        updatedValues[index] = { ...updatedValues[index], image: target.files[0] };
    } else {
        updatedValues[index] = { ...updatedValues[index], [field]: e.target.value };
    }
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
    console.log(formState);
    e.preventDefault();

    try { 
      const actorIds = [];
      for(const actor of formState.actors) {
        const actorForm = new FormData()
        console.log(actor.image)
        actorForm.append("image", actor.image)
        actorForm.append("actorName", actor.actorName)
        const res = await axios.post('http://localhost:3000/actor', actorForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        actorIds.push(res.data);
      }
      const directorIds = [];
      for(const director of formState.directors) {
        const res = await axios.post('http://localhost:3000/director', director);
        directorIds.push(res.data);
      }
      const writerIds = [];
      for(const writer of formState.writers) {
        const res = await axios.post('http://localhost:3000/writer', writer);
        writerIds.push(res.data);
      }
      const countryIds = [];
      for(const country of formState.countries) {
        const res = await axios.post('http://localhost:3000/country', country);
        countryIds.push(res.data);
      }
      const genreIds = [];
      for(const genre of formState.genres) {
        const res = await axios.post('http://localhost:3000/genre', genre);
        genreIds.push(res.data);
      }


      const formData = new FormData();
      formData.append('poster', formState.poster);
      const uploadRes = await axios.post('http://localhost:3000/movies/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      const posterKey = uploadRes.data.posterKey;
      const movieData = {
        ...formState,
        poster: posterKey,
        actors: actorIds,
        directors: directorIds,
        writers: writerIds,
        countries: countryIds,
        genres: genreIds,
      };
      await axios.post('http://localhost:3000/movies', movieData);
      alert('Movie added successfully');
    } catch (err) {
      console.error(err);
      alert('Error adding movie');
    }
  };

  return (
    <form className='flex justify-center flex-col items-center py-10' onSubmit={handleSubmit}>
      <span className='text-2xl font-semibold'>Enter Movie Details</span>
      <div className=' flex py-6 flex-col md:flex-row'>
        <div className='flex flex-col px-2 py-2 gap-3'>
          <input className='px-4   py-1 border border-gray-500 rounded w-80' name="title" value={formState.title} onChange={handleChange} placeholder="Title" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="year" value={formState.year} onChange={handleChange} placeholder="Year" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="rated" value={formState.rated} onChange={handleChange} placeholder="Rated" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="released" value={formState.released} onChange={handleChange} placeholder="Released" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="runtime" value={formState.runtime} onChange={handleChange} placeholder="Runtime" required />
          <textarea className='px-4 py-1 border border-gray-500 rounded w-80 h-32' name="plot" value={formState.plot} onChange={handleChange} placeholder="Plot" required />

          {formState.actors.map((actor: Actor, index: number) => (
          <div key={index} className='flex flex-col gap-3'>
            <div className='flex items-center'>
              <input
                className='px-4 py-1 border border-gray-500 rounded-l w-72'
                value={actor.actorName}
                onChange={(e) => handleDynamicChange(e, index, 'actors', 'actorName')}
                placeholder="Actor Name"
                required
              />
              <button className='px-3 py-1 border border-gray-500 rounded-r text-gray-500 hover:bg-gray-100' type="button" onClick={() => removeDynamicField(index, 'actors')}>X</button>
            </div>
            <input
              className='px-4 py-1 border border-gray-500 rounded w-80'
              type='file'
              onChange={(e) => handleDynamicChange(e, index, 'actors', 'image')}
              placeholder="Actor URL"
              required
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
              required
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
              required
            />
            <button className='px-3 py-1 border border-gray-500 rounded-r text-gray-500 hover:bg-gray-100' type="button" onClick={() => removeDynamicField(index, 'writers')}>X</button>
          </div>
        ))}
        <button className='text-white inline-block bg-blue-500 py-1 rounded hover:bg-blue-400 w-80' type="button" onClick={() => addDynamicField('writers')}>Add Writer</button>
        </div>
        <div className='flex flex-col px-2 py-2 gap-3'>
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="language" value={formState.language} onChange={handleChange} placeholder="Language" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="awards" value={formState.awards} onChange={handleChange} placeholder="Awards" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="poster" type='file' onChange={handleChange} placeholder="Poster" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="trailer" value={formState.trailer} onChange={handleChange} placeholder="Trailer" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="metascore" value={formState.metascore} onChange={handleChange} placeholder="Metascore" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="rating" value={formState.rating} onChange={handleChange} placeholder="Rating" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="votes" value={formState.votes} onChange={handleChange} placeholder="Votes" required />
          <input className='px-4 py-1 border border-gray-500 rounded w-80' name="boxOffice" value={formState.boxOffice} onChange={handleChange} placeholder="Box Office" required />
          {formState.genres.map((genre: Genre, index: number) => (
          <div key={index} className='flex items-center'>
            <input
              className='px-4 py-1 border border-gray-500 rounded-l w-72'
              value={genre.genreName}
              onChange={(e) => handleDynamicChange(e, index, 'genres', 'genreName')}
              placeholder="Genre Name"
              required
            />
            <button className='px-3 py-1 border border-gray-500 rounded-r text-gray-500 hover:bg-gray-100' type="button" onClick={() => removeDynamicField(index, 'genres')}>X</button>
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
              required
            />
            <button className='px-3 py-1 border border-gray-500 rounded-r text-gray-500 hover:bg-gray-100' type="button" onClick={() => removeDynamicField(index, 'countries')}>X</button>
          </div>
        ))}
        <button className='text-white inline-block bg-blue-500 py-1 rounded hover:bg-blue-400 w-80' type="button" onClick={() => addDynamicField('countries')}>Add Country</button>

        <button className='text-white bg-green-500 py-1 hover:bg-green-400 w-80 rounded' type="submit">ADD</button>
        </div>
      </div>
    </form>
  );
};

export default AddMovie;
