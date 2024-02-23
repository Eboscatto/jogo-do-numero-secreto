//Jogo do número secreto
//Autor: Everaldo Boscatto

//Variável que armazena os números já sorteados.
let listaDeNumerosSorteados = [];

//Variável que controla a quantidade de números a serem sorteados.
let numeroLimite = 10; 

//Variável que recebe o número secreto.
let numeroSecreto = gerarNumeroAleatorio();

//Variável que controla o número de tentativas.
let tentativas = 1; 

//Função para alterar conteúdo na <tag texto> no arquivo HTML.
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}
//Função que exibe as mensagens na tela inicial do jogo.
function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
} 
exibirMensagemInicial();
//Função que verifica se acertou o chute ou não.
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");  
        let palavaraTentativa = tentativas > 1 ? "tentativas" : "Tentativa";
        let mensagemTentativas =`você descobriu o número secreto com ${tentativas} ${palavaraTentativa}!` ;
        exibirTextoNaTela("p", mensagemTentativas);

        //Habilita o botão novo jogo quando acertar o número secreto.
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor!");
        } else {
            exibirTextoNaTela("p", "O número secreto é maior!");
        }
        tentativas ++;
        limparCampo();
    }
}
//Função que gera o número aleatório.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}
//Função para limpar o campo "chute".
function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

//Função para iniciar um novo jogo após acertar o "chute".
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMensagemInicial();
    tentativas = 1;
    //Desabilita o botão novo jogo enquanto não acertar o número secreto.
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
