'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
      <h1>Pokémon Browser</h1>
      {pokemonList.map((pokemon, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{pokemon.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
    </main>
  );
}



