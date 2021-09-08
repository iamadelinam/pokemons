import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OnePokemon() {
  const [pokemon, setpokemon] = useState();
  const params = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setpokemon(data);
      });
  }, [params.id]);

  return (
    <>
      {pokemon && (
        <div>
          <p>{pokemon.name}</p>
          <img src={pokemon.sprites.front_default} alt={params.name} />
        </div>
      )}
    </>
  );
}
