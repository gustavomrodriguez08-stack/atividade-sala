// ===== Atividade 3 · Promises (Promise.all) =====
{
  const campos = [
    document.getElementById("a3-id1"),
    document.getElementById("a3-id2"),
    document.getElementById("a3-id3"),
  ];
  const botao = document.getElementById("a3-botao");
  const statusEl = document.getElementById("a3-status");
  const resultado = document.getElementById("a3-resultado");

  botao.addEventListener("click", () => {
    const ids = campos.map((c) => Number(c.value));
    statusEl.className = "status";
    statusEl.textContent = "";
    resultado.replaceChildren();
    mostrarCarregando();

    Promise.all(ids.map((id) => buscarPokemon(id)))
      .then((time) => {
        resultado.replaceChildren(...time.map(criarCard));
      })
      .catch((erro) => {
        statusEl.className = "status erro";
        statusEl.textContent = erro.message;
      })
      .finally(() => esconderCarregando());
  });
}
