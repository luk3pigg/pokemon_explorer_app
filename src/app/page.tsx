'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

export default function Home() {

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

  const fetchPokemon = async (urlToFetch: string) => {
    const res = await fetch(urlToFetch);
    const data = await res.json();
    
    setPokemonList(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  };

  const fetchPokemonDetails = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    
    setSelectedPokemon(data); // 1. Save the fetched data to our bucket
    setIsDialogOpen(true);    // 2. Open the modal ONLY after the data is ready
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
      <Button 
          onClick={() => prevUrl && fetchPokemon(prevUrl)}
          disabled={!prevUrl}
        >
          Back
        </Button>
        
        <Button 
          onClick={() => nextUrl && fetchPokemon(nextUrl)}
          disabled={!nextUrl}
        >
          Next
        </Button>


      <footer>Thank you for using Pokémon Browser!</footer>
    </main>
  );
}



