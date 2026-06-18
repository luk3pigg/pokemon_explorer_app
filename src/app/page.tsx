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
  id: number;
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

  const fetchPokemon = async (url: string) => {
    const res = await fetch(url);
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
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <h1 className="text-[60px] font-semibold leading-[78px] text-[#181A1B] tracking-tight">
          Pokémon Browser
        </h1>
        <h2 className="text-[30px] font-semibold leading-[36px] tracking-[-0.025em] text-[#71717A]">
          Search and find Pokémon
        </h2>
      </div>

      <hr className="w-full border-t border-[#E4E4E7] my-8" />

      <div className="mb-6">
        <h3 className="text-[30px] font-semibold leading-[36px] tracking-[-0.025em] text-[#09090B]">
          Explore Pokémon
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard 
            key={index}
            pokemon={pokemon}
            onClick={() => fetchPokemonDetails(pokemon.url)}
          />
        ))}
      </div>
      
      <div className="flex justify-center items-center gap-4 mt-8 mb-16 w-full max-w-[1160px] mx-auto h-[36px]">
        <Button 
          onClick={() => prevUrl && fetchPokemon(prevUrl)}
          disabled={!prevUrl}
          className="text-[14px] font-medium leading-[20px]"
        >
          &larr; Back
        </Button>
        
        <Button 
          onClick={() => nextUrl && fetchPokemon(nextUrl)}
          disabled={!nextUrl}
          className="text-[14px] font-medium leading-[20px]"
        >
          Next &rarr;
        </Button>
      </div>

      <PokemonDetailsDialog 
        isDialogOpen={isDialogOpen} 
        setIsDialogOpen={setIsDialogOpen} 
        selectedPokemon={selectedPokemon} 
      />

      <hr className="w-full border-t border-[#E4E4E7] my-8" />

      <footer className="w-full text-center text-[18px] font-semibold leading-[28px] text-[#181A1B] py-8">
        Thank you for using Pokémon Browser!
      </footer>
    </main>
  );
}



