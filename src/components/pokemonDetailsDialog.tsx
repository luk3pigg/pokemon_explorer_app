import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

interface PokemonDetails {
  name: string;
  id: number;
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
  const imageUrl = selectedPokemon ? selectedPokemon.sprites.front_default : '';  
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedPokemon && (
            <div className="flex flex-col w-full">
              
              <div className="flex items-center justify-center w-full h-[224px] bg-[#F4F4F5] p-4 mb-4">
                <img
                  src={imageUrl}
                  alt={selectedPokemon.name}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />
              </div>
              
              <DialogHeader className="flex flex-row items-baseline gap-4 mb-6">
                <DialogTitle className="text capitalize text-[24px] font-semibold leading-[32px] text-[#09090B]">
                  {selectedPokemon.name}
                </DialogTitle>
                <span className="text-[16px] font-semibold text-[#71717A]">
                  #{selectedPokemon.id.toString().padStart(4, '0')}
                </span>
              </DialogHeader>

              <div className="flex flex-col gap-3 w-full bg-slate-50 p-6 rounded-xl border border-[#E4E4E7]">
                <div className="flex items-baseline gap-4">
                  <span className="text-base font-bold text-[#181A1B] w-20">Height:</span>
                  <span className="text-lg text-[#181A1B]">{selectedPokemon.height / 10} m
                  </span>
                </div>
  
                <div className="flex items-baseline gap-4">
                  <span className="text-base font-bold text-[#181A1B] w-20">Weight:</span>
                  <span className="text-lg text-[#181A1B]">{selectedPokemon.weight / 10} kg 
                  </span>
                </div>
              </div>  
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
}