import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { PokemonDetails, RegistryEntry, RegistryAction } from '../types/PokemonTypes.ts';

export type PokemonContextType = {
  entries: RegistryEntry[];
  dispatch: Dispatch<RegistryAction>;
  selectedPokemon: PokemonDetails | null;
  setSelectedPokemon: Dispatch<SetStateAction<PokemonDetails | null>>;
};

export const PokemonContext = createContext<PokemonContextType>({
  entries: [],
  dispatch: () => undefined,
  selectedPokemon: null,
  setSelectedPokemon: () => undefined,
});
