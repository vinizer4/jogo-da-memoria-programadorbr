// Criamos as const que representam a classe das cartas

const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

startGame();

// Função responsavel por iniciar o jogo
function startGame() {

    // Aqui armazenamos as cartas criadas com o função createCardsFromTechs na variavel let cards que foi decladara no escopo global do código

    initializeCards(game.createCardsFromTechs());

}

function initializeCards(cards) {
    // Utilizamos o DOM para capturar a nossa gameBoard
    let gameBoard = document.getElementById('gameBoard');

    gameBoard.innerHTM = "";
    
    // Passamos as nossas cartas que foram armazenadas na let cards que foi decladara no escopo global como parametro
    // Usamos o forEach para executar uma função em cada carta
    // O método forEach() executa uma dada função em cada elemento de um array.
    game.cards.forEach(card => {
        // Para cada card passada vamos criar um elemento div com o metodo document.createElement
        let cardElement = document.createElement('div');
        // Cada elemento div criado tera o mesmo id do elemento pai card
        cardElement.id = card.id;
        // Adicionaremos a classe card para cada elemento criado com o metodo classList.add
        cardElement.classList.add(CARD);
        //
        cardElement.dataset.icon = card.icon;
        // Adionaremos um addEventListener que ficara ouvindo o evento de click passado como parametro, quando o click acontecer ele executada a função flipCard que é responsavel por virar a carta
        cardElement.addEventListener('click', flipCard)

        // Chamamos a função createCardContent que ira criar os elementos dentro da carta front e back
        createCardContent(card, cardElement);

        //Aqui vamos usar o metodo appendChild para adicionarmos as cartas que foram manipuladas no código acima em nosso  como filho do tabuleiro gameBoard.

        //.appendChild

        // Adiciona um nó ao final da lista de filhos de um nó pai especificado. Se o nó já existir no documento, ele é removido de seu nó pai atual antes de ser adicionado ao novo pai.
        gameBoard.appendChild(cardElement);


    })

}

function createCardContent(card, cardElement) {

    // Executamos a função createCardFace responsavel por criar a face da carta
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

// Função responsavel por criar o conteudo da face da carta
function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/imagens/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = '&lt&gt';
    }
    element.appendChild(cardElementFace);
}

// Função responsavel por virar as cartas
function flipCard() {

    if(game.setCard(this.id)) {

    this.classList.add('flip')
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById('gameOver');
                    gameOverLayer.style.display = 'flex';
                }
            }else{
                setTimeout(() => {
                let firstCardView = document.getElementById(game.firstCard.id)
                let secondCardView = document.getElementById(game.secondCard.id)
    
                firstCardView.classList.remove('flip')
                secondCardView.classList.remove('flip')
                game.unflipCards();
                }, 1000);
            }
        }
        
    }
}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById('gameOver');
                    gameOverLayer.style.display = 'nonee';
}