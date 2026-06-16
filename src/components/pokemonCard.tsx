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
  return (
    <Card onClick={onClick}>
      <CardHeader>
        <CardTitle>{pokemon.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}