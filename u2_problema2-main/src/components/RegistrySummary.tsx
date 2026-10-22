import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext.ts';

export default function RegistrySummary() {
  const { entries } = useContext(PokemonContext);
  const titulares = entries.filter((entry) => entry.role === 'titular').length;
  const reservas = entries.filter((entry) => entry.role === 'reserva').length;

  return (
    <section className="summary" aria-label="Resumen de registros">
      <article className="stat"><span>Total</span><strong>{entries.length}</strong></article>
      <article className="stat"><span>Titulares</span><strong className="text-amber">{titulares}</strong></article>
      <article className="stat"><span>Reservas</span><strong className="text-green">{reservas}</strong></article>
    </section>
  );
}
