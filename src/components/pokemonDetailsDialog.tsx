import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

interface PokemonDetailDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  selectedPokemon: PokemonDetails | null;
}

export default function PokemonDetailsDialog({ isDialogOpen, setIsDialogOpen, selectedPokemon }: PokemonDetailDialogProps) {
    return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {selectedPokemon && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPokemon.name}</DialogTitle>
              </DialogHeader>
              
              <div>
                <img 
                  src={selectedPokemon.sprites.front_default} 
                  alt={selectedPokemon.name} 
                />
                <p>Height: {selectedPokemon.height}</p>
                <p>Weight: {selectedPokemon.weight}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
}