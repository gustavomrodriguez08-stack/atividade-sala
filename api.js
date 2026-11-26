// ===== API simulada (slides 4, 6 e 14) =====
const pokedex = [
  { id: 1, nome: "Bulbasaur", tipos: ["grama", "veneno"], hp: 45 },
  { id: 4, nome: "Charmander", tipos: ["fogo"], hp: 39 },
  { id: 7, nome: "Squirtle", tipos: ["água"], hp: 44 },
  { id: 25, nome: "Pikachu", tipos: ["elétrico"], hp: 35 },
];

// Versão com CALLBACK (erro primeiro)
function buscarPokemonCB(id, callback) {
  setTimeout(() => {
    const pokemon = pokedex.find((p) => p.id === id);
    if (!pokemon) {
      callback(new Error(`Pokémon ${id} não existe`));
      return;
    }
    callback(null, pokemon);
  }, 1000); // simula 1 s de rede
}

// Versão com PROMISE
function buscarPokemon(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pokemon = pokedex.find((p) => p.id === id);
      if (pokemon) resolve(pokemon);
      else reject(new Error(`Pokémon ${id} não existe`));
    }, 1000);
  });
}

// ===== Funções de apoio para a interface =====
function criarCard(pokemon) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = pokemon.id;

  const titulo = document.createElement("h3");
  titulo.textContent = `#${pokemon.id} ${pokemon.nome}`;

  const tipos = document.createElement("p");
  tipos.textContent = `Tipos: ${pokemon.tipos.join(", ")}`;

  const hp = document.createElement("p");
  hp.textContent = `HP: ${pokemon.hp}`;

  card.append(titulo, tipos, hp);
  return card;
}

function mostrarCarregando() {
  document.getElementById("carregando").hidden = false;
}
function esconderCarregando() {
  document.getElementById("carregando").hidden = true;
}
