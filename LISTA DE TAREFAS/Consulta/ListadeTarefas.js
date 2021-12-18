let txtTarefas = document.getElementById("txttarefas");
let adicionar = document.getElementById("adc");
let removerTodos = document.getElementById("rmv");
let tarefas = document.getElementById("listaTarefas");



txtTarefas.addEventListener("keypress", function(e){ //função p/ adicionar a tarefa qnd press enter.
    
    let qtdLetras = document.getElementById("txttarefas").value;

    if (e.key == "Enter"){

        if(txtTarefas.value =="" || qtdLetras.length > 110){
            alert("Digite uma nova tarefa com no maximo 110 caracteres!");
        }
        else {
            criaTarefa(txtTarefas.value);
            txtTarefas.value = "";
            txtTarefas.focus();
        }
    }
});

adicionar.addEventListener("click", function () { //função para adiciona tarefa qnd clikar btn adc.

    let qtdLetras = document.getElementById("txttarefas").value;

    if(txtTarefas.value == "" || qtdLetras.length > 110){
        alert("Digite uma nova tarefa com no maximo 110 caracteres!")
    }
    else{
        criaTarefa(txtTarefas.value);
        txtTarefas.value = "";
        txtTarefas.focus();
    }
});

document.addEventListener("click", function(e){

    let elemento = e.target;
    if(elemento.classList.contains("apagar")){
        elemento.parentElement.remove();
        salvarTarefa()
    }
});

removerTodos.addEventListener("click",function(){

    localStorage.clear();
    tarefas.innerHTML = "";
});

function criaTarefa(txt){ //função que realmente cria a nova tarefa e o li com o texto.

    let li = document.createElement("li");
    li.innerText = txt;
    tarefas.appendChild(li);
    botaoApagar(li);
    salvarTarefa();
}

function botaoApagar(li){

    let botao = document.createElement("button");
    botao.innerText = "Apagar";
    botao.classList.add("apagar");
    botao.setAttribute("title","Apagar esta Tarefa.");
    li.appendChild(botao);
    
}

function salvarTarefa(){

    let liTarefas = tarefas.querySelectorAll("li");
    let arrayTarefas = [];

    for (let i of liTarefas){
        let tarefatexto = i.innerText;
        tarefatexto = tarefatexto.slice(0, -6);
        arrayTarefas.push(tarefatexto);
    }
        let tarefasJSON = JSON.stringify(arrayTarefas);
        localStorage.setItem("tarefas",tarefasJSON);
}

function lerTarefas(){

    let tarefaSalva = localStorage.getItem("tarefas");
    let listaTarefas = JSON.parse(tarefaSalva);
    
    for(let i of listaTarefas){
        criaTarefa(i);
    }
}
lerTarefas();
