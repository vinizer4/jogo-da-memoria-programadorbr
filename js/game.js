let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    
    // O array techs representa todos as imagens que estara nas cartas
    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,

    setCard: function(id){
        // Filtramos o array card para retornar o id da carta que nos clicamos
        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card);

        // Se a carta já foi virada vamos retornar false para comunicar com o front end
        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    // Verificamos se as cartas são iguais
    checkMatch: function (){

        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    // Funcção que ira desvirar as cartas caso não sejam iguais
    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;  
    },
    unflipCards(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false;
        this.clearCards();
    },

    // Funcão que ira verificar se todas as cartas estão viradas, finalizando o jogo
    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },

        // Função responsavel por criar as cartas
    createCardsFromTechs: function () {

         // Array vazio cards que ira armazenar as cartas
        this.cards = [];

         // vamos pegar cada tech das techs usando o metodo push para armazenala na variavel tech
        for(let tech of this.techs) {
        // Vamos dar um push na função createPairFromTech que sera responsavel por criar o par de techs
        this.cards.push(this.createPairFromTech(tech));}

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
        },

// Vamos criar a função responsavel por criar o par de cada tech
    createPairFromTech: function (tech) {

        // Para cada tech passada como parametro vamos retornar um array com 2 objetos
        return [{
            // No id vamos chamar a função createIdWithTech que vai me trazer um valor randomico
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        },
        {   
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    // Função responsavel por criar o id randomico para as cartas
    createIdWithTech: function (tech) {
        
        return tech + parseInt(Math.random() * 1000);
    },

    // Função responsavel por embaralhar as cartas
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        // while
        // A declaração while cria um laço que executa uma rotina especifica enquanto a condição de teste for avaliada como verdadeira. A condição é avaliada antes da execução da rotina.
        while (currentIndex !== 0) { 

            // Lógica de randomização das cartas 
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
}