export type PokemonDetails = {
  pokemonId: number;
  pokemonName: string;
  image: string;
  type: string;
};

export type PokemonRole = 'titular' | 'reserva';

export type RegistryEntry = PokemonDetails & {
  entryId: string;
  nickname: string;
  role: PokemonRole;
};

export type RegistryAction =
  | { type: 'add'; entry: RegistryEntry }
  | { type: 'remove'; entryId: string };
