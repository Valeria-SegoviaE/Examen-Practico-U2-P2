import { useContext, useState, type FormEvent } from 'react';
import { PokemonContext } from '../context/PokemonContext.ts';
import type { PokemonDetails } from '../types/PokemonTypes.ts';

type PokemonApiResponse = {
  id: number;
  name: string;
  sprites?: {
    front_default: string | null;
  };
  types?: Array<{
    type: {
      name: string;
    };
  }>;
};

const usePokemonSearch = () => {
  const { setSelectedPokemon } = useContext(PokemonContext);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchPokemon = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = query.trim().toLowerCase();
    if (name.length < 3) {
      setIsError(true);
      setMessage('Escribe al menos 3 caracteres para buscar.');
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setMessage('');

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`,
      );

      if (response.status === 404) {
        setIsError(true);
        setMessage('Sin resultados para ese nombre.');
        return;
      }

      if (!response.ok) {
        throw new Error(`La consulta a PokéAPI respondió ${response.status}.`);
      }

      const data = (await response.json()) as PokemonApiResponse;
      const pokemon: PokemonDetails = {
        pokemonId: data.id,
        pokemonName: data.name,
        image: data.sprites?.front_default ?? '',
        type: data.types?.[0]?.type.name ?? '',
      };

      setSelectedPokemon(pokemon);
      setMessage('Pokémon cargado correctamente.');
    } catch (error) {
      console.error('No se pudo consultar PokéAPI:', error);
      setIsError(true);
      setMessage('No se pudo consultar PokéAPI. Revisa tu conexión e intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    query,
    setQuery,
    message,
    isLoading,
    isError,
    searchPokemon,
  };
};

export default usePokemonSearch;
