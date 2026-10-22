const exampleSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';

export default function RegistryItem() {
  return (
    <article className="ticket">
      <div className="ticket-top">
        <span className="ticket-id">Registro de ejemplo</span>
        <div className="badges">
          <span className="badge type-electric">electric</span>
          <span className="badge role-titular">Titular</span>
        </div>
      </div>
      <div className="preview">
        <img src={exampleSprite} alt="" width={72} height={72} />
        <div>
          <h3>Chispa</h3>
          <p className="requester">#25 pikachu</p>
        </div>
      </div>
      <div className="ticket-actions">
        <button className="button danger" type="button">Eliminar</button>
      </div>
    </article>
  );
}
