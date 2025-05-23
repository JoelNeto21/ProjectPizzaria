function exibirMensagem(texto, tipo){
  const mensagem = document.getElementById('mensagem')
  mensagem.textContent = texto 

  // Adiciona a classe de estilo (sucesso ou erro)
  mensagem.className = `mensagem ${tipo}`
  mensagem.classList.remove('hidden')

  // Remove a mensagem após 3 segundos
  setTimeout(() => {
    mensagem.classList.add('hidden')
  }, 3000)
}

function validarLogin(){
  const usuario = document.getElementById('usuario').value
  const senha = document.getElementById('senha').value

  // Usuário e senha  fixos para validação
  // (você pode substituir por algo mais avançado)
  const usuarioCorreto = 'admin'
  const senhaCorreta = '1234'

  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    exibirMensagem('Login realizado com sucesso!', 'sucesso')
    setTimeout(() => {
      // Redireciona para a página principal
      window.location.href = 'pizzaria.html'
    }, 1000)
  } else{
    exibirMensagem('Usuário ou senha incorretos', 'erro')
  }
}

// ------------------------------------------------------------

let pizzaria = [];
const msg = document.getElementById("msg");

function mostrarSecao(secao) {
  document.getElementById("cadastro").classList.add("hidden");
  document.getElementById("consulta").classList.add("hidden");

  document.getElementById(secao).classList.remove("hidden");
}

function adicionarPizza() {
  const nome = document.getElementById("nome").value;
  const ingredientes = document.getElementById("ingredientes").value;
  const preco = parseFloat(document.getElementById("preco").value).toFixed(2);
  const erroNome = document.getElementById("erro-nome");

  const sameNome = pizzaria.filter((pizza) =>
    pizza.nome.toLowerCase().includes(nome.toLowerCase())
  );

  // Esconde mensagem específica antes de validar
  erroNome.classList.add("hidden");
  erroNome.textContent = "";

  if (nome && ingredientes && preco) {
    if (sameNome.length === 0) {
      pizzaria.push({ nome, ingredientes, preco });
      document.getElementById("nome").value = "";
      document.getElementById("ingredientes").value = "";
      document.getElementById("preco").value = "";
      atualizarLista();

      msg.classList.remove('hidden');
      msg.style.backgroundColor = "rgba(68, 203, 68, 0.838)";
      msg.textContent = " ✓  Pizza adicionada com sucesso!";

      setTimeout(() => {
        msg.classList.add("hidden");
      }, 5000);

    } else {
      // Mostra mensagem de erro específica abaixo do input
      erroNome.textContent = "✕ Pizza já cadastrada...";
      erroNome.classList.remove("hidden");
      setTimeout(() => {
        erroNome.classList.add("hidden");
      }, 5000);
    }
  } else {
    msg.classList.remove('hidden');
    msg.style.backgroundColor = "rgba(245, 65, 65, 0.84)";
    msg.textContent = " ✕  Por favor, preencha todos os campos...";

    setTimeout(() => {
      msg.classList.add("hidden");
    }, 5000);
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
