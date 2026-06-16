'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import PokemonCard from '@/components/pokemonCard';
import PokemonDetailsDialog from '@/components/pokemonDetailsDialog';

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
    setSelectedPokemon(data);
    setIsDialogOpen(true);
};

  useEffect(() => {
    fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0');
  }, []);

  return (
    <main className="p-8">
      <h1>Pokémon Browser</h1>
      <h2>Search and find Pokémon</h2>
      
      <div> {pokemonList.map((pokemon, index) => (
          <PokemonCard 
            key={index}
            pokemon={pokemon}
            onClick={() => fetchPokemonDetails(pokemon.url)}
          />
        ))}
        </div>
          
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

      <PokemonDetailsDialog 
        isDialogOpen={isDialogOpen} 
        setIsDialogOpen={setIsDialogOpen} 
        selectedPokemon={selectedPokemon} 
      />


      <footer>Thank you for using Pokémon Browser!</footer>
    </main>
  );
}



