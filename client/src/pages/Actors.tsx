import axios from 'axios';
import { FC, useEffect, useState } from 'react'
import LoadingLogo from '../components/common/LoadingLogo';
import ActorCard from '../components/Actor/ActorCard';
import { Actor, api_url } from '../context/WatchlistContext';

const Actors: FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const actorsData = await axios.get(`${api_url}/actor`);
        setActors(actorsData.data); 
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <LoadingLogo />
  return (
    <div className='bg-black flex flex-wrap gap-10 px-10 md:px-40 py-10 justify-around '>
        {actors.map((actor: Actor, index: number) => (
        <div key={index}>
          <ActorCard url={actor.imageUrl} name={actor.actorName} actorId={actor.actorId} page={true}/>
        </div>
      ))}
    </div>
  )
}

export default Actors