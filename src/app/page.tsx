'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface Pokemon {
  name: string;
  url: string;
}

export default function Home() {

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const fetchPokemon = async (urlToFetch: string) => {
    const res = await fetch(urlToFetch);
    const data = await res.json();
    
    setPokemonList(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  };

  useEffect(() => {
    fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0');
  }, []);

  return (
    <main className="p-8">
      <h1>Pokémon Browser</h1>
      <h2>Search and find Pokémon</h2>
      {pokemonList.map((pokemon, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{pokemon.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      <footer>Thank you for using Pokémon Browser!</footer>
    </main>
  );
}



