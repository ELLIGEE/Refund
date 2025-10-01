// seleciona os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")

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

function expenseAdd(newExpense) {
  try {
    //Cria o elemento para adicionar o tiem (li) na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //Cria o ícone da categoria.
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //Cria a info da dispesa.
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    //Cria o nome da despesa.
    const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

    //Cria a categoria da despesa.
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    //Adiciona name e category em expense info.
    expenseInfo.append(expenseName, expenseCategory)
    

    //Adiciona as informações do item.
    expenseItem.append(expenseIcon, expenseInfo)

    //Adiciona o item na lista.
    expenseList.append(expenseItem)

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}
