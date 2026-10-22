import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext.ts';
import type { RegistryEntry } from '../types/PokemonTypes.ts';

type RegistryItemProps = {
  entry: RegistryEntry;
};

export default function RegistryItem({ entry }: RegistryItemProps) {
  const { dispatch } = useContext(PokemonContext);

  return (
    <article className="ticket">
      <div className="ticket-top">
        <span className="ticket-id">Registro #{entry.pokemonId}</span>
        <div className="badges">
          {entry.type && <span className="badge type-electric">{entry.type}</span>}
          <span className={`badge role-${entry.role}`}>
            {entry.role === 'titular' ? 'Titular' : 'Reserva'}
          </span>
        </div>
      </div>
      <div className="preview">
        {entry.image && <img src={entry.image} alt="" width={72} height={72} />}
        <div>
          <h3>{entry.nickname}</h3>
          <p className="requester">#{entry.pokemonId} {entry.pokemonName}</p>
        </div>
      </div>
      <div className="ticket-actions">
        <button
          className="button danger"
          type="button"
          onClick={() => dispatch({ type: 'remove', entryId: entry.entryId })}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
