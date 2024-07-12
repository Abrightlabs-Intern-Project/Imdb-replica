import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingLogo from '../components/common/LoadingLogo';
import ActorCard from '../components/Actor/ActorCard';

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const actorsData = await axios.get("http://localhost:3000/actor");
        setActors(actorsData.data);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <LoadingLogo />
  return (
    <div className='bg-black flex flex-wrap gap-10 px-40 py-10 justify-around'>
        {actors.map((actor: any, index: number) => (
        <div key={index}>
          <ActorCard url={actor.imageUrl} name={actor.actorName} actorId={actor.actorId} page={true}/>
        </div>
      ))}
    </div>
  )
}

export default Actors