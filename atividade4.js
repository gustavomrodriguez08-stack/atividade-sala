// ===== Atividade 4 · async/await, fetch, cache e favoritos =====
async function carregarPokedex() {
  const salvo = localStorage.getItem("pokedex");
  if (salvo) return JSON.parse(salvo); // cache

  const resposta = await fetch("pokedex.json");
  if (!resposta.ok) throw new Error("Falha ao carregar");

  const dados = await resposta.json();
  localStorage.setItem("pokedex", JSON.stringify(dados));
  return dados;
}

function lerFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos") ?? "[]");
}

function alternarFavorito(id) {
  const favoritos = lerFavoritos();
  const novos = favoritos.includes(id)
    ? favoritos.filter((f) => f !== id)
    : [...favoritos, id];
  localStorage.setItem("favoritos", JSON.stringify(novos));
  return novos.includes(id);
}

{
  const statusEl = document.getElementById("a4-status");
  const lista = document.getElementById("a4-lista");
  const limparCache = document.getElementById("a4-limpar");

  function atualizarBotao(botao, favorito) {
    botao.textContent = favorito ? "★ Favorito" : "☆ Favoritar";
    botao.classList.toggle("ativo", favorito);
  }

  function renderizarLista(pokemons) {
    const favoritos = lerFavoritos();
    lista.replaceChildren(
      ...pokemons.map((p) => {
        const card = criarCard(p);
        const botao = document.createElement("button");
        botao.type = "button";
        atualizarBotao(botao, favoritos.includes(p.id));
        botao.addEventListener("click", () => {
          atualizarBotao(botao, alternarFavorito(p.id));
        });
        card.append(botao);
        return card;
      })
    );
  }

  async function iniciar() {
    try {
      mostrarCarregando();
      const dados = await carregarPokedex();
      renderizarLista(dados);
    } catch (erro) {
      statusEl.className = "status erro";
      statusEl.textContent = "Erro ao carregar";
      console.error(erro);
    } finally {
      esconderCarregando();
    }
  }

  limparCache.addEventListener("click", () => {
    localStorage.removeItem("pokedex");
    iniciar();
  });

  iniciar();
}
