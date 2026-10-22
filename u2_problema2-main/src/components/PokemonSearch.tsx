export default function PokemonSearch() {
  return (
    <section className="panel" aria-labelledby="search-title">
      <div className="section-heading">
        <span className="step">01</span>
        <div>
          <h2 id="search-title">Buscar pokémon</h2>
          <p>Escribe el nombre exacto para cargarlo en el formulario.</p>
        </div>
      </div>
      <form className="ticket-form" noValidate>
        <div className="field">
          <label htmlFor="query">Nombre</label>
          <input id="query" name="query" placeholder="Ej. pikachu" autoComplete="off" />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className="feedback" aria-live="polite"></div>
        <button className="button primary" type="button">Buscar</button>
      </form>
    </section>
  );
}
