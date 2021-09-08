import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Header from "../Header";
export default function PokemonListPage() {
  // const [page, setPage] = useState(0)
  // const [pokemons, setPokemons] = useState([])
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const pokemonsPerPage = 9;
  const [page, setPage] = useState(1);

  const indexOfLastPokemon = page * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  useEffect(() => {
    // fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&${offset}/`)
    fetch(`https://pokeapi.co/api/v2/pokemon`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return Promise.all(
          data.results.map((pokemon) => {
            return fetch(pokemon.url).then((response) => {
              return response.json();
            });
          })
        );
      })
      .then((pokemons) => {
        console.log(pokemons);
        setPokemons(pokemons);
      });
    // });
  }, [offset]);

  // const previousPage = () => {
  //   const newOffset = offset + 10
  //   setOffset(newOffset)
  // }

  // const nextPage = () => {
  //   const newOffset = offset + 10
  //   setOffset(newOffset)
  // }

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setPage(pageNumber);
  };

  const pokemonMaping = currentPokemons.map((pokemon) => {
    return (
      <div className="pokemon-on-list" key={pokemon.id}>
        <img
          className="pokemon-on-list-img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <div className="pokemons-parametrs">
          <p>
            {" "}
            Name:{" "}
            <Link to={`/pokemons/${pokemon.id}`}>
              {" "}
              <span>{pokemon.name}</span>{" "}
            </Link>
          </p>

          <p>Height: {pokemon.height}</p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header />
      <div className="list">{pokemonMaping}</div>
      <div>
        <Pagination
        className='pagination'
          activePage={page}
          itemsCountPerPage={9}
          totalItemsCount={pokemons.length}
          pageRangeDisplayed={9}
          onChange={handlePageChange}
        />
      </div>
      {/* <button onClick={previousPage}>previous</button>
      <button onClick={nextPage}>next</button> */}
    </div>
  );

  //   useEffect(() => {
  //     fetch("https://pokeapi.co/api/v2/pokemon/3/")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         setPokemons(data);
  //       });
  //   }, []);

  //   return (
  //     <>
  //       {pokemons && (
  //         <div>
  //           <p>{pokemons.name}</p>
  //           <img src={pokemons.sprites.front_default} alt={pokemons.name} />
  //         </div>
  //       )}
  //     </>
  // );
}
