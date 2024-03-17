
const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"]
const cardPairs = [...cardValues, ...cardValues];
console.log(cardPairs);
const shuffelPairs = shuffledArray(cardPairs);
const gameboard = document.getElementById("game-board");
createGameBoard(shuffelPairs);

function shuffledArray(array){
    for (let i=array.length - 1; i>0; i--){
        const j=Math.floor(Math.random() * (i+1));
        [array[i], array[j]]=[array[j], array[i]];
    }
    return array;
}
// Function create the game board
function  createGameBoard(cards){
    cards.forEach((value,index) => {
         const card = document.createElement("div");
         card.classList.add("card", "hidden");
         card.dataset.index = index;
         card.innertext = value; 
         card.addEventListener("click", revealCard);
         gameboard.appendChild(card);
    });
}

let flippedCards = [];
let matchpairs = 0;

function revealCard(){
    const selectedCards = this;
    if (selectedCards.classList.contains("hidden") && flippedCards.length < 2){
        selectedCards.classList.remove("hidden");
        flippedCards.push(selectedCards);
        if (flippedCards.length == 2){
            setTimeout(checkMatch, 500);
        }
    } 
} 
function checkMatch() {
    const card1 = flippedCards[0]
    const card2 = flippedCards[1]
    if (card1.innerText === card2.innerText) {
        card1.removeEventListener("click");
        card2.removeEventListener("click");
        matchedPaired++;
    } else {
        card1.classList.add("hidden");
        card2.classList.add("hidden");
    }
}