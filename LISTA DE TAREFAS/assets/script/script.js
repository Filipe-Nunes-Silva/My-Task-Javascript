//------------------------------------VARIAVEIS GLOBAIS-----------------------------------------------------------
const inputTarefa = document.querySelector("#input_tarefa");        // INPUT TEXTO
const addTarefa = document.querySelector(".add_tarefa");            // BOTÃO ADD TAREFA
const removeAllTarefas = document.querySelector(".remove_tarefas"); // BOTÃO REMOVER TAREFAS
const espacoTarefas = document.querySelector(".tarefas_space");     // ESPAÇO DAS TAREFAS
let tarefasArray = [];                                              // ARRAY COM AS TAREFAS

//-----------------------------------------EVENTOS----------------------------------------------------------------
window.addEventListener("keypress",(e)=>{ //(Press Enter)Pega valor do input e chama função que cria nova tarefa
    let codigoTecla = e.code;
    if(codigoTecla === "Enter"){
        const valueInputTarefa = inputTarefa.value;
        salvaTarefasLocalStorage(valueInputTarefa);
        criaTarefa(valueInputTarefa);
        inputTarefa.focus();
    };
});

addTarefa.addEventListener("click",()=>{ //(Press buttom)Pega valor do input e chama função que cria nova tarefa
    const valueInputTarefa = inputTarefa.value;

    salvaTarefasLocalStorage(valueInputTarefa);
    criaTarefa(valueInputTarefa);
    inputTarefa.focus();
});

removeAllTarefas.addEventListener("click",()=>{ //Remove tarefas marcadas / Remove todas as tarefas
    const tarefasMarcadas = document.querySelectorAll(".tarefa_marcar");
    let inputVazios = true;

    for(let i in tarefasMarcadas){

        if(tarefasMarcadas[i].checked){
            const elementPai = tarefasMarcadas[i].parentElement;
            elementPai.parentElement.remove();
            const textoElementoSpan = elementPai.querySelector(".tarefa_texto").innerText;
            excluiTarefasSelecionada(textoElementoSpan);
            inputVazios = false;
        };
    };

    if(inputVazios === true){
        espacoTarefas.innerHTML = "";
        tarefasArray = [];
        localStorage.clear();
    };
});

espacoTarefas.addEventListener("click",(e)=>{ // Marca tarefa concluida / Remove tarefa unica
    const click = e.target;
    if(click.classList.contains("tarefa_marcar")){
        const elementPai = click.parentElement;
        const span = elementPai.querySelector("span");
        span.classList.toggle("tarefa_feita");
    };
    if(click.classList.contains("tarefa_remover")){
        const elementPai = click.parentElement;
        const elementAvo = elementPai.parentElement;
        elementAvo.parentElement.remove();

        let textoTarefa = elementAvo.querySelector("span").innerText;
        excluiTarefasSelecionada(textoTarefa);
    };
});
//------------------------------------------FUNÇÕES---------------------------------------------------------------

function criaTarefa(textoInput){//Cria toda estrutura de uma nova tarefa

    if(validaTarefa(textoInput)){

        const li = document.createElement("li");
        const div = document.createElement("div");
            div.classList.add("tarefas");
        const input = document.createElement("input");
            input.setAttribute("type","checkbox");
            input.classList.add("tarefa_marcar");
            input.setAttribute("title","Marcar como concluida");
        const span = document.createElement("span");
            span.classList.add("tarefa_texto");
            span.innerText = textoInput;
        const div2 = document.createElement("div");
            div2.classList.add("div_remover");
            div2.setAttribute("title","Excluir somente essa tarefa");
        const img = document.createElement("img");
            img.setAttribute("src","./assets/images/remove_one.png");
            img.classList.add("tarefa_remover");

        insereTarefa(li,div,input,span,div2,img);
        inputTarefa.value = "";
    };
};

function validaTarefa(tarefa){ //Valida conteudo da tarefa a ser inserida 
    if(tarefa === ""){
        alert("Digite uma Tarefa!");
        return false;
    };
    if(tarefa.length < 5){
        alert("Minimo de 5 letras!");
        return false;
    };
    return true;
};

function insereTarefa(li,div,input,span,div2,img){ //Insere a nova tarefa

    div2.appendChild(img);
    div.appendChild(input);
    div.appendChild(span);
    div.appendChild(div2);
    li.appendChild(div);
    espacoTarefas.appendChild(li);
};

function excluiTarefasSelecionada(texto){ // Exclui as tarefas selecionada ou clicadas no botão

    tarefasArray.find( (valor,index)=>{
        if(valor === texto){
            delete tarefasArray[index];
        };
    });
    let novoArray =  tarefasArray.filter((valor)=>{
        return valor;
    })
    
    tarefasArray = [];
    tarefasArray = [...novoArray];

    localStorage.clear();
    for(let i = 0; i < tarefasArray.length; i++){
        localStorage.setItem(i,JSON.stringify(tarefasArray[i]));
    };
};

function salvaTarefasLocalStorage(valorInput){ //Salva texto tarefa no localStorage

    if(validaTarefa(valorInput)){

        tarefasArray.push(valorInput);
        const transformaJson = JSON.stringify(tarefasArray[(tarefasArray.length -1)]);
        localStorage.setItem((tarefasArray.length -1),transformaJson);
    };
};

onload = function(){//Carrega todas as tarefas assim que a pagina é carregada

    for(let i = 0; i <= (localStorage.length -1); i++){
        
        const removeJson = JSON.parse(localStorage.getItem(i));
        tarefasArray.push(removeJson);
        criaTarefa(removeJson);
    };
    inputTarefa.focus();
};


