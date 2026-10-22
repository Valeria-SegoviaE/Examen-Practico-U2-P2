import EmptyState from './EmptyState.tsx';

export default function RegistryList() {
  return (
    <section className="panel list-panel" aria-labelledby="list-title">
      <div className="section-heading">
        <span className="step">03</span>
        <div>
          <h2 id="list-title">Registros</h2>
          <p>Cada envío simulado agrega una tarjeta al final.</p>
        </div>
      </div>
      <div className="ticket-list">
        <EmptyState />
      </div>
    </section>
  );
}
