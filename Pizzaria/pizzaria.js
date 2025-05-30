function exibirMensagem(texto, tipo, idMsg = "msg") {
  const msg = document.getElementById(idMsg);
  if (!msg) return;
  msg.textContent = texto;
  msg.className = `mensagem ${tipo}`;
  msg.classList.remove("hidden");

  setTimeout(() => {
    msg.classList.add("hidden");
  }, 3000);
}

function validarLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  // Usuário e senha fixos para validação
  const usuarioCorreto = "admin";
  const senhaCorreta = "1234";

  if (usuario && senha) {
    if (usuario === usuarioCorreto && senha === senhaCorreta) {
      exibirMensagem("Login realizado com sucesso!", "sucesso");
      setTimeout(() => {
        window.location.href = "pizzaria.html";
      }, 1000);
    } else {
      exibirMensagem("Usuário ou senha incorretos", "erro");
    }
  } else {
    exibirMensagem("Por favor, preencha todos os campos", "erro");
  }
}

// ---------------------------------------------------------------------------

let pizzaria = [];
let pizzaParaAlterar = null;
let proximoCodigo = 1; // Controle de código

function mostrarSecao(secao) {
  document.getElementById("cadastro").classList.add("hidden");
  document.getElementById("consulta").classList.add("hidden");
  document.getElementById("alterar").classList.add("hidden");
  document.getElementById("venda").classList.add("hidden");
  document.getElementById("relatorio-vendas").classList.add("hidden");

  document.getElementById(secao).classList.remove("hidden");
  if (secao === "consulta") atualizarLista();
}

function adicionarPizza() {
  const nome = document.getElementById("nome").value.trim();
  const ingredientes = document.getElementById("ingredientes").value.trim();
  const preco = parseFloat(document.getElementById("preco").value);

  const erroNome = document.getElementById("erro-nome");
  erroNome.classList.add("hidden");
  erroNome.textContent = "";

  const sameNome = pizzaria.filter(
    (pizza) => pizza.nome.toLowerCase() === nome.toLowerCase()
  );

  if (nome && ingredientes && !isNaN(preco) && preco > 0) {
    if (sameNome.length === 0) {
      const codigo = proximoCodigo.toString().padStart(3, "0"); // Novo: gera código tipo 001
      pizzaria.push({ codigo, nome, ingredientes, preco });
      proximoCodigo++; // Incrementa para o próximo cadastro
      document.getElementById("nome").value = "";
      document.getElementById("ingredientes").value = "";
      document.getElementById("preco").value = "";
      atualizarLista();
      exibirMensagem("Pizza adicionada com sucesso!", "sucesso", "msg-cadastro");
    } else {
      erroNome.textContent = "✕ Pizza já cadastrada...";
      erroNome.classList.remove("hidden");
      setTimeout(() => {
        erroNome.classList.add("hidden");
      }, 5000);
    }
  } else {
    exibirMensagem("Por favor, preencha todos os campos corretamente", "erro", "msg-cadastro");
  }
}

function buscarPizza() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const resultados = pizzaria.filter((pizza) =>
    pizza.nome.toLowerCase().includes(busca)
  );
  atualizarLista(resultados);

  if (resultados.length === 0) {
    exibirMensagem("Nenhuma pizza encontrada", "erro", "msg-consulta");
  } else {
    document.getElementById("msg-consulta").classList.add("hidden");
  }
}

function buscarPizzaParaAlterar() {
  const busca = document.getElementById("busca-alterar").value.trim();
  pizzaParaAlterar = pizzaria.find(
    (pizza) => pizza.codigo === busca.padStart(3, "0")
  );

  if (pizzaParaAlterar) {
    document.getElementById("form-alterar").classList.remove("hidden");
    document.getElementById("novo-nome").value = pizzaParaAlterar.nome;
    document.getElementById("novos-ingredientes").value =
      pizzaParaAlterar.ingredientes;
    document.getElementById("novo-preco").value = pizzaParaAlterar.preco;
    exibirMensagem("Pizza encontrada! Você pode alterá-la agora", "sucesso", "msg-alterar");
  } else {
    exibirMensagem("Pizza não encontrada", "erro", "msg-alterar");
  }
}

function alterarPizza() {
  if (pizzaParaAlterar) {
    const novoNome = document.getElementById("novo-nome").value;
    const novosIngredientes =
      document.getElementById("novos-ingredientes").value;
    const novoPreco = parseFloat(document.getElementById("novo-preco").value);

    if (novoNome && novosIngredientes && novoPreco) {
      pizzaParaAlterar.nome = novoNome;
      pizzaParaAlterar.ingredientes = novosIngredientes;
      pizzaParaAlterar.preco = novoPreco;

      atualizarLista();
      exibirMensagem("Pizza alterada com sucesso!", "sucesso", "msg-alterar");
      document.getElementById("form-alterar").classList.add("hidden");
    } else {
      exibirMensagem("Por favor, preencha todos os campos", "erro", "msg-alterar");
    }
  }
}

function atualizarLista(lista = pizzaria) {
  const table = document.getElementById("lista-pizzas");
  table.innerHTML = "";

  lista.forEach((pizza) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pizza.codigo}</td>
      <td>${pizza.nome}</td>
      <td>${pizza.ingredientes}</td>
      <td>R$ ${parseFloat(pizza.preco).toFixed(2)}</td>
    `;
    table.appendChild(row);
  });
}

// --- Registro de Vendas ---
let vendas = [];

function registrarVenda() {
  const nome = document.getElementById("venda-nome").value.trim();
  const quantidade = parseInt(
    document.getElementById("venda-quantidade").value
  );
  const comprador = document.getElementById("venda-comprador").value.trim();

  if (nome && !isNaN(quantidade) && quantidade > 0 && comprador) {
    const pizza = pizzaria.find(
      (pizza) => pizza.nome.toLowerCase() === nome.toLowerCase()
    );

    if (pizza) {
      const total = pizza.preco * quantidade;
      vendas.push({ nome: pizza.nome, quantidade, comprador, total });

      const listaVendas = document.getElementById("lista-vendas");
      const item = document.createElement("li");
      item.textContent = `Pizza: ${
        pizza.nome
      }, Quantidade: ${quantidade}, Comprador: ${comprador}, Total: R$ ${total.toFixed(
        2
      )}`;
      listaVendas.appendChild(item);

      exibirMensagem("Venda registrada com sucesso!", "sucesso", "msg-venda");
      document.getElementById("venda-nome").value = "";
      document.getElementById("venda-quantidade").value = "";
      document.getElementById("venda-comprador").value = "";
    } else {
      exibirMensagem("Pizza não encontrada no cardápio", "erro", "msg-venda");
    }
  } else {
    exibirMensagem("Por favor, preencha todos os campos", "erro", "msg-venda");
  }
}

// --- Relatório de Vendas ---
function gerarRelatorioVendas() {
  const tabelaRelatorio = document.getElementById("tabela-relatorio-vendas");
  tabelaRelatorio.innerHTML = "";

  // Mostra a seção do relatório antes de exibir a mensagem
  document.getElementById("relatorio-vendas").classList.remove("hidden");

  if (vendas.length === 0) {
    exibirMensagem("Nenhuma venda registrada", "erro", "msg-relatorio");
    return;
  }

  let totalVendas = 0;

  vendas.forEach((venda) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
        <td>${venda.nome}</td>
        <td>${venda.quantidade}</td>
        <td>${venda.comprador}</td>
        <td>R$ ${venda.total.toFixed(2)}</td>
      `;
    tabelaRelatorio.appendChild(linha);

    totalVendas += venda.total;
  });

  const linhaTotal = document.createElement("tr");
  linhaTotal.innerHTML = `
      <td><strong>Total</strong></td>
      <td></td>
      <td></td>
      <td><strong>R$ ${totalVendas.toFixed(2)}</strong></td>
    `;
  tabelaRelatorio.appendChild(linhaTotal);
}

// --------------------------------------------

function toggleMenu() {
  const menu = document.querySelector('.menu');
  const container = document.querySelector('.container');
  menu.classList.toggle('menu-escondido');
  container.classList.toggle('menu-escondido');
}
