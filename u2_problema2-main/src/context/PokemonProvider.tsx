import { useReducer, useState, type ReactNode } from 'react';
import { PokemonContext } from './PokemonContext.ts';
import type { PokemonDetails, RegistryAction, RegistryEntry } from '../types/PokemonTypes.ts';

function registryReducer(entries: RegistryEntry[], action: RegistryAction): RegistryEntry[] {
  switch (action.type) {
    case 'add':
      return [...entries, action.entry];
    case 'remove':
      return entries.filter((entry) => entry.entryId !== action.entryId);
    default:
      return entries;
  }
}

export default function PokemonProvider({ children }: { children: ReactNode }) {
  const [entries, dispatch] = useReducer(registryReducer, []);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

  return (
    <PokemonContext.Provider
      value={{ entries, dispatch, selectedPokemon, setSelectedPokemon }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
