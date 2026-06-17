import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const getPokemonIdFromUrl = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  const pokemonId = getPokemonIdFromUrl(pokemon.url);

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  
  return (
    <Card onClick={onClick}
    className="h-[391px] flex flex-col overflow-hidden cursor-pointer shadow-md hover:bg-slate-50 transition-colors">
      <div className="flex-1 bg-[#F4F4F5] flex items-center justify-center p-4">
        <img 
          src={imageUrl} 
          alt={pokemon.name} 
          className="max-h-[224px] max-w-full object-contain drop-shadow-md transition-transform hover:scale-110"
        />
      </div>
      <div className="p-6 bg-white flex flex-col gap-2">
        
        <CardTitle className="text capitalize text-[24px] font-semibold leading-[32px] text-[#09090B]">{pokemon.name}</CardTitle>
        <p className="text-sm text-[16px] font-semibold text-[#71717A]">
          #{pokemonId.padStart(4, '0')}
        </p>
      </div>
    </Card>
  );
}