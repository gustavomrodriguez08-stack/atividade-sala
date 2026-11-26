// ===== Atividade 1 · Callbacks =====
{
  const campo = document.getElementById("a1-campo");
  const botao = document.getElementById("a1-botao");
  const statusEl = document.getElementById("a1-status");
  const resultado = document.getElementById("a1-resultado");

  botao.addEventListener("click", () => {
    const id = Number(campo.value);
    statusEl.className = "status";
    statusEl.textContent = "Carregando…";
    resultado.replaceChildren();

    buscarPokemonCB(id, (erro, pokemon) => {
      if (erro) {
        statusEl.className = "status erro";
        statusEl.textContent = erro.message;
        return;
      }
      statusEl.textContent = "";
      resultado.append(criarCard(pokemon));
    });
  });
}
