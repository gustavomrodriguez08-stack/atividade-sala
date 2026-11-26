// ===== Atividade 2 · Iterators / Geradores =====
function* porTipo(lista, tipo) {
  for (const pokemon of lista) {
    if (pokemon.tipos.includes(tipo)) {
      yield pokemon;
    }
  }
}

{
  const seletor = document.getElementById("a2-seletor");
  const proximo = document.getElementById("a2-proximo");
  const statusEl = document.getElementById("a2-status");
  const resultado = document.getElementById("a2-resultado");

  // Preenche o select com os tipos da Pokédex (sem repetir)
  const tipos = [...new Set(pokedex.flatMap((p) => p.tipos))];
  for (const tipo of tipos) {
    const opcao = document.createElement("option");
    opcao.value = tipo;
    opcao.textContent = tipo;
    seletor.append(opcao);
  }

  let iterador;

  seletor.addEventListener("change", () => {
    iterador = porTipo(pokedex, seletor.value);
    proximo.disabled = false;
    statusEl.textContent = "";
    resultado.replaceChildren();
  });

  proximo.addEventListener("click", () => {
    const { value, done } = iterador.next();
    if (done) {
      proximo.disabled = true;
      statusEl.textContent = "Fim da lista";
      return;
    }
    resultado.replaceChildren(criarCard(value));
  });
}
