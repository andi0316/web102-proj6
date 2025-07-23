import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Detail.css'


const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.deno.dev/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error("Failed to fetch Pokémon:", error));
    }, [id]);

    if (!pokemon) {
        return <div>Loading Pokémon data...</div>;
    }

    const baseStats = pokemon.base || {};

    return (
        <div className='page'>
            <div className='name-container'>
                <h2>{pokemon.name}</h2>
            </div>
            <div className='img-container'>
                <img src={pokemon.imageUrl} alt={pokemon.name} className='img'/>
            </div>
            <div className='stat-box'>
                <ul>
                    <li>HP: {pokemon.stats?.HP}</li>
                    <li>Attack: {pokemon.stats?.Attack}</li>
                    <li>Defense: {pokemon.stats?.Defense}</li>
                    <li>Speed: {pokemon.stats?.Speed}</li>
                </ul>
            </div>
        </div>
    );
};

export default Detail;
