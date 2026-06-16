'use client';

import { useState, useEffect } from 'react';

export default function Home() {

  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const testFetch = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    const res = await fetch(url);
    const data = await res.json();
    
    setPokemonList(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  };

  useEffect(() => {
    testFetch();
  }, []);

  return (
    <main className="p-8">
      <h1>Luke's Pokémon App</h1>
    </main>
  );
}

