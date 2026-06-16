'use client';

import { useState } from 'react';

export default function Home() {

  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const testFetch = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  };

  return (
    <main className="p-8">
      <h1>Luke's Pokémon App</h1>
    </main>
  );
}

