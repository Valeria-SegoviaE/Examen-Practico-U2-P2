import usePokemonSearch from '../hooks/usePokemonSearch.ts';

export default function PokemonSearch() {
  const { query, setQuery, message, isLoading, isError, searchPokemon } = usePokemonSearch();

  return (
    <section className="panel" aria-labelledby="search-title">
      <div className="section-heading">
        <span className="step">01</span>
        <div>
          <h2 id="search-title">Buscar pokémon</h2>
          <p>Escribe el nombre exacto para cargarlo en el formulario.</p>
        </div>
      </div>
      <form className="ticket-form" noValidate onSubmit={searchPokemon}>
        <div className="field">
          <label htmlFor="query">Nombre</label>
          <input
            id="query"
            name="query"
            placeholder="Ej. pikachu"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            disabled={isLoading}
          />
          <small>Mínimo 3 caracteres.</small>
        </div>
        {message && (
          <div className={`feedback ${isError ? 'error' : 'success'}`} aria-live="polite">
            {message}
          </div>
        )}
        <button className="button primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Buscando…' : 'Buscar'}
        </button>
      </form>
    </section>
  );
}
