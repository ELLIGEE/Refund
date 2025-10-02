// seleciona os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");
const expenseTotal = document.querySelector("aside header h2");
const expenseQuantityList = document.querySelector("aside header p span");

// captura o evento de input para formatar o valor.
amount.oninput = () => {
  //obtém o valor atual do input e remove letras.
  let value = amount.value.replace(/\D/g, "");

  //Adicionado o formato de centavos ao input.
  value = Number(value) / 100;

  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  //formata o valor no padrão BRL.
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

//captura o evento de sbumit do fomulário para obter os valores.
form.onsubmit = (event) => {
  //previne o comportamento de recarregar a página.
  event.preventDefault();

  //cria um objeto com detalhes na despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  //chamando a função que irá adicionar o item na lista.
  expenseAdd(newExpense);
};

// Adiciona um novo item na lista.
function expenseAdd(newExpense) {
  try {
    //Cria o elemento para adicionar o tiem (li) na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //Cria o ícone da categoria.
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //Cria a info da dispesa.
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    //Cria o nome da despesa.
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    //Cria a categoria da despesa.
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    //Adiciona name e category em expense info.
    expenseInfo.append(expenseName, expenseCategory);

    //Cria o valor da despesa.
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    //Cria o ícone de remover.
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    //Adiciona as informações do item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    //Adiciona o item na lista.
    expenseList.append(expenseItem);

    // Limpa o formulário para adicionar novos itens.
    formClear()

    //Atualiza os totais.
    updateTotals();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}

// Atualiza os totais
function updateTotals() {
  try {
    // recupera todos os itens li da lista.
    const items = expenseList.children;

    //atuliza a quantidade de itens da lista.
    expenseQuantityList.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    //variavel para icrementar o total.
    let total = 0;

    //Percorre cada item da li da lista.
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      // Remove caracteres não numéricos e substitui a vírgula pelo ponto
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      // Converte o valor para float.
      value = parseFloat(value);

      //Verifica se é um número válido.
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não conrresponde com um número"
        );
      }

      // Icrementa o valor total.
      total += Number(value);
    }

    //Cria a span para adicionar o R$ formatado.
    const symbolBRL = document.createElement("smal");
    symbolBRL.textContent = "R$";

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    //Limpa o conteúdo do elemento.
    expenseTotal.innerHTML = "";

    expenseTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert("Não foi possível atulizar os totais");
  }
}

// Evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", function (event) {

  // Verifica se o elemento clicado é o ícone de remover.
  if (event.target.classList.contains("remove-icon")) {
    const item = event.target.closest(".expense");

    item.remove();
  }

  updateTotals();
});

function formClear () {
  expense.value = "";
  category.value = "";
  amount.value = "";

  expense.focus()
}
