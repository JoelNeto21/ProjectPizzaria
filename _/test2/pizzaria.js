function exibirMensagem(texto, tipo) {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`; // Adiciona a classe de estilo (sucesso ou erro)
  mensagem.classList.remove("hidden");

  // Remove a mensagem após 3 segundos
  setTimeout(() => {
    mensagem.classList.add("hidden");
  }, 3000);
}

function validarLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  // Usuário e senha fixos para validação (você pode substituir por algo mais avançado)
  const usuarioCorreto = "admin";
  const senhaCorreta = "1234";

  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    exibirMensagem("Login realizado com sucesso!", "sucesso");
    setTimeout(() => {
      // Redireciona para a página principal
      window.location.href = "index.html";
    }, 1000); // Aguarda 1 segundo antes de redirecionar
  } else {
    exibirMensagem("Usuário ou senha incorretos.", "erro");
  }
}

let cardapio = [];
let pizzaParaAlterar = null;

function mostrarSecao(secao) {
  // Esconde todas as seções
  document.getElementById("cadastro").classList.add("hidden");
  document.getElementById("consulta").classList.add("hidden");
  document.getElementById("alterar").classList.add("hidden");
  document.getElementById("venda").classList.add("hidden");
  document.getElementById("relatorio-vendas").classList.add("hidden");

  // Mostra a seção selecionada
  document.getElementById(secao).classList.remove("hidden");
}

function adicionarPizza() {
  const nome = document.getElementById("nome").value;
  const ingredientes = document.getElementById("ingredientes").value;
  const preco = parseFloat(document.getElementById("preco").value);

  if (nome && ingredientes && preco) {
    cardapio.push({ nome, ingredientes, preco });
    document.getElementById("nome").value = "";
    document.getElementById("ingredientes").value = "";
    document.getElementById("preco").value = "";
    atualizarLista();
    exibirMensagem("Pizza adicionada com sucesso!", "sucesso");
  } else {
    exibirMensagem("Por favor, preencha todos os campos.", "erro");
  }
}

function buscarPizza() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const resultados = cardapio.filter((pizza) =>
    pizza.nome.toLowerCase().includes(busca)
  );
  atualizarLista(resultados);
}

function buscarPizzaParaAlterar() {
  const busca = document.getElementById("busca-alterar").value.toLowerCase();
  pizzaParaAlterar = cardapio.find((pizza) =>
    pizza.nome.toLowerCase().includes(busca)
  );

  if (pizzaParaAlterar) {
    document.getElementById("form-alterar").classList.remove("hidden");
    document.getElementById("novo-nome").value = pizzaParaAlterar.nome;
    document.getElementById("novos-ingredientes").value =
      pizzaParaAlterar.ingredientes;
    document.getElementById("novo-preco").value = pizzaParaAlterar.preco;
    exibirMensagem("Pizza encontrada! Você pode alterá-la agora.", "sucesso");
  } else {
    exibirMensagem("Pizza não encontrada.", "erro");
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
      exibirMensagem("Pizza alterada com sucesso!", "sucesso");
      document.getElementById("form-alterar").classList.add("hidden");
    } else {
      exibirMensagem("Por favor, preencha todos os campos.", "erro");
    }
  }
}

function atualizarLista(lista = cardapio) {
  const tabela = document.getElementById("lista-pizzas");
  tabela.innerHTML = "";

  lista.forEach((pizza) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
        <td>${pizza.nome}</td>
        <td>${pizza.ingredientes}</td>
        <td>R$ ${pizza.preco.toFixed(2)}</td>
      `;
    tabela.appendChild(linha);
  });
}

// --- Registro de Vendas ---
let vendas = [];

function registrarVenda() {
  const nome = document.getElementById("venda-nome").value;
  const quantidade = parseInt(
    document.getElementById("venda-quantidade").value
  );
  const comprador = document.getElementById("venda-comprador").value;

  if (nome && quantidade && comprador) {
    const pizza = cardapio.find(
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

      exibirMensagem("Venda registrada com sucesso!", "sucesso");
      document.getElementById("venda-nome").value = "";
      document.getElementById("venda-quantidade").value = "";
      document.getElementById("venda-comprador").value = "";
    } else {
      exibirMensagem("Pizza não encontrada no cardápio.", "erro");
    }
  } else {
    exibirMensagem("Por favor, preencha todos os campos.", "erro");
  }
}

// --- Relatório de Vendas ---
function gerarRelatorioVendas() {
  const tabelaRelatorio = document.getElementById("tabela-relatorio-vendas");
  tabelaRelatorio.innerHTML = "";

  if (vendas.length === 0) {
    exibirMensagem("Nenhuma venda registrada.", "erro");
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

  document.getElementById("relatorio-vendas").classList.remove("hidden");

 
}

