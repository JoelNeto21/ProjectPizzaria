let pizzaria = [];

function mostrarSecao(secao) {
  document.getElementById("cadastro").classList.add("hidden");
  document.getElementById("consulta").classList.add("hidden");

  document.getElementById(secao).classList.remove("hidden");
}

function adicionarPizza() {
  const nome = document.getElementById("nome").value;
  const ingredientes = document.getElementById("ingredientes").value;
  const preco = parseFloat(document.getElementById("preco").value).toFixed(2);

  const sameNome = pizzaria.filter((pizza) =>
    pizza.nome.toLowerCase().includes(nome.toLowerCase())
  );
//   const sameIngr = pizzaria.filter((pizza) =>
//     pizza.ingredientes.toLowerCase().includes(ingredientes.toLowerCase())
//   );

  if (nome && ingredientes && preco) {
    // if (sameNome == 0 && sameIngr == 0) {
    if (sameNome == 0) {
      pizzaria.push({ nome, ingredientes, preco });
      document.getElementById("nome").value = "";
      document.getElementById("ingredientes").value = "";
      document.getElementById("preco").value = "";
      atualizarLista();
      alert(" ✓  Pizza adicionada com sucesso!");
    } else {
      alert(` ✕  ${nome.toUpperCase()} \nPizza já cadastrada...`);
    }
  } else {
    alert(" ✕  Por favor, preencha todos os campos...");
  }
}

function buscarPizza() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const resultados = pizzaria.filter((pizza) =>
    pizza.nome.toLowerCase().includes(busca)
  );
  atualizarLista(resultados);
}

function atualizarLista(lista = pizzaria) {
  const table = document.getElementById("lista-pizzas");
  table.innerHTML = "";

  lista.forEach((pizza) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${pizza.nome}</td>
        <td>${pizza.ingredientes}</td>
        <td>R$${pizza.preco}</td>`;
    table.appendChild(row);
  });
}
