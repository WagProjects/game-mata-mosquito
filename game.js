var altura = 0
var largura = 0
var vidas = 3
var tempo = 10

//Recebendo dificuldade de index e processando
var dificuldade = window.location.search.replace('?','')//metodo replace para localizar e retirar a string '?'

//AJUSTANDO O GAME CONFORME DIFICULDADE
if(dificuldade === 'facil'){
    var criaMosquitoTempo = 2000
}else if (dificuldade === 'normal'){
    var criaMosquitoTempo = 1000
}else if (dificuldade === 'dificil'){
    var criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth
    //console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()


//CRONOMETRO com base na dificuldade
var cronometro = setInterval(function(){
        tempo -= 1
        document.getElementById('cronometro').innerHTML = tempo
        if(tempo === 0){
            clearInterval(cronometro)
            clearInterval(criaMosquito)
            window.location.href = 'vitoria.html'
        } 
    }, 1000)

//EXIBIR MOSQUITOS EM LOCAIS RANDOMICOS
function posicaoRandomica(){

    //remover mosquito anterior(caso exita)
    if(document.getElementById('mosquito')){//Se elemento com id = mosquito existir, remova-o. Caso não exista, retorna null e não faz nada
        document.getElementById('mosquito').remove()

        if(vidas === 0){
            window.location.href = 'fim_de_jogo.html'
        }else{
            document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'
            vidas--
        }
    }

    //Subtraido 90 para que a imagem não fique de fora da janela pela direita ou em baixo.
    var posicaoX = Math.floor(Math.random() * largura) - 90 
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //Se posicao for < 0, ela passa a valer 0, para que não fique fora de janela de exibição
    posicaoX = posicaoX < 0 ? 0 : posicaoX 
    posicaoY = posicaoY < 50 ? 50 : posicaoY // Para a mosca nao sobrepor os botoes
    //console.log(posicaoX, posicaoY)
    
    //criar o elemento html (mosquito na tela)
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()//Para que as classes sejam inseridas no elemento html elas devem ser concatenadas com espaço entre elas
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onmousedown = function(){
        //mosquito.remove()
        cliqueAcerto()
        this.remove()//'this' seleciona o proprio elemento html que chama a funcao, no caso, mosquito
    }

    document.body.appendChild(mosquito)
}

//TAMANHO DOS MOSQUISTOS
function tamanhoAleatorio(){ 
    var classe = Math.floor(Math.random() * 3)// Valores randomicos de 0-2

    switch(classe){
        case 0:
            return 'mosquito0'
        case 1:
            return 'mosquito1'
        case 2:
            return 'mosquito2'
    }
}

function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2) // Valores randomicos de 0-1
    switch(classe){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

//criar o elemento html: audio
function sound(src){
    this.sound = document.createElement("audio")
    this.sound.src = src
    this.sound.setAttribute("preload", "auto")
    this.sound.setAttribute("controls", "none")
    this.sound.style.display = 'none'
    document.body.appendChild(this.sound)
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }

}


var cliqueHit;
var clique;

function cliqueAcerto(){
    cliqueHit = new sound("efeitos/acerto.mp3")
    cliqueHit.play();
}

function cliqueGame(){
    clique = new sound ('efeitos/clique.mp3')
    clique.play();
}

