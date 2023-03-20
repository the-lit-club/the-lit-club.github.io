let meaningDisplay;
let cardsWrapper = document.querySelectorAll('.cards');


function generate() {

    const quoteCard = {
        '”...love is a skill, not just an enthusiasm.“' : '― Alain de Botton, The Course of Love',
        
        '”The floor seemed wonderfully solid. It was comforting to know I had fallen and could fall no farther.“' : ' — Sylvia Plath, The Bell Jar',

        'quote3' : 'author3',

        'quote4' : 'author4',

        'quote5' : 'author5'
    }

    const meanings = Object.keys(quoteCard);

    const cardDisplay = meanings[Math.floor(Math.random() * meanings.length)];

    meaningDisplay = quoteCard[cardDisplay];
    document.getElementById('meaning').innerHTML = meaningDisplay;

    document.getElementById('card').innerHTML = cardDisplay;

}