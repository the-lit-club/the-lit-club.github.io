let meaningDisplay;
let cardsWrapper = document.querySelectorAll('.cards');


function generate() {

    const quoteCard = {
        '”...love is a skill, not just an enthusiasm.“' : '― Alain de Botton, The Course of Love',
        
        '”The floor seemed wonderfully solid. It was comforting to know I had fallen and could fall no farther.“' : ' — Sylvia Plath, The Bell Jar',

        '”Many people suffer from the fear of finding oneself alone, and so they don’t find themselves at all.“' : '— Rollo May, Man’s Search for Himself',

        '”Never to suffer would never to have been blessed.“' : '― Edgar Allan Poe',

        "”You don't visit the wound because it hurts; you visit the wound because it's there.“" : '― Hanya Yanagihara, A Little Life',
    }

    const meanings = Object.keys(quoteCard);

    const cardDisplay = meanings[Math.floor(Math.random() * meanings.length)];

    meaningDisplay = quoteCard[cardDisplay];
    document.getElementById('meaning').innerHTML = meaningDisplay;

    document.getElementById('card').innerHTML = cardDisplay;

}