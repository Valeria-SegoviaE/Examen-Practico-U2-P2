import { useActionState, useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext.ts';
import type { PokemonRole } from '../types/PokemonTypes.ts';

type RegistrationResult = {
  status: 'idle' | 'error' | 'success';
  messages: string[];
};

const initialResult: RegistrationResult = {
  status: 'idle',
  messages: [],
};

export default function PokemonForm() {
  const { selectedPokemon, dispatch } = useContext(PokemonContext);

  async function registerPokemon(
    _previousResult: RegistrationResult,
    formData: FormData,
  ): Promise<RegistrationResult> {
    const nickname = String(formData.get('nickname') ?? '').trim();
    const roleValue = String(formData.get('role') ?? '');
    const role: PokemonRole | null =
      roleValue === 'titular' || roleValue === 'reserva' ? roleValue : null;
    const errors: string[] = [];

    if (!selectedPokemon) {
      errors.push('Primero busca y carga un pokémon.');
    }

    if (nickname.length < 3) {
      errors.push('El apodo debe tener al menos 3 caracteres.');
    }

    if (!role) {
      errors.push('Selecciona un rol válido.');
    }

    if (!selectedPokemon || !role || nickname.length < 3) {
      return { status: 'error', messages: errors };
    }

    const pokemon = selectedPokemon;
    await new Promise((resolve) => window.setTimeout(resolve, 1000));

    dispatch({
      type: 'add',
      entry: {
        ...pokemon,
        entryId: crypto.randomUUID(),
        nickname,
        role,
      },
    });

    return { status: 'success', messages: ['Pokémon registrado correctamente.'] };
  }

  const [result, formAction, isPending] = useActionState(registerPokemon, initialResult);

  return (
    <section className="panel" aria-labelledby="form-title">
      <div className="section-heading">
        <span className="step">02</span>
        <div>
          <h2 id="form-title">Datos del pokémon</h2>
          <p>La búsqueda llena estos campos. Después simula el registro.</p>
        </div>
      </div>
      <form className="ticket-form" noValidate action={formAction}>
        <div className="preview">
          {selectedPokemon?.image && (
            <img src={selectedPokemon.image} alt="" width={72} height={72} />
          )}
          <div>
            <p className="ticket-id">
              {selectedPokemon ? `#${selectedPokemon.pokemonId}` : 'Sin selección'}
            </p>
            <strong>{selectedPokemon?.pokemonName ?? 'Ningún pokémon cargado'}</strong>
          </div>
        </div>
        <div className="field">
          <label htmlFor="pokemonId">Número</label>
          <input id="pokemonId" name="pokemonId" value={selectedPokemon?.pokemonId ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="pokemonName">Nombre</label>
          <input id="pokemonName" name="pokemonName" value={selectedPokemon?.pokemonName ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="type">Tipo</label>
          <input id="type" name="type" value={selectedPokemon?.type ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="nickname">Apodo</label>
          <input id="nickname" name="nickname" placeholder="Ej. Chispa" disabled={isPending} />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className="field">
          <label htmlFor="role">Rol</label>
          <select id="role" name="role" defaultValue="" disabled={isPending}>
            <option value="">Selecciona un rol</option>
            <option value="titular">Titular</option>
            <option value="reserva">Reserva</option>
          </select>
        </div>
        {result.messages.length > 0 && (
          <div
            className={`feedback ${result.status}`}
            aria-live="polite"
          >
            {result.messages.map((message) => <p key={message}>{message}</p>)}
          </div>
        )}
        <button
          className="button primary"
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Registrando…' : 'Registrar pokémon'}
        </button>
      </form>
    </section>
  );
}
