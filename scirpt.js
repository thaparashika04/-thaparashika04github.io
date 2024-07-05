
//Array of pairs for the card values
const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];

//Duplicate the values to create matching pairs
const cardPairs = [...cardValues, ...cardValues];  //spread operators

console.log(cardPairs);
//shuffle the array to randomize card positions
const shuffledPairs = shuffledArray(cardPairs);

//create the game board
const gameBoard = document.getElementById("game-board");
createGameBoard(shuffledPairs);

//Function to shuffle an array using fisher-yates algorithm
function shuffledArray(array){
  for (let i = array.length - 1; i>0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]]=[array[j], array[i]];
  }
  return array;
}

//Function create the game board
function createGameBoard(cards){
  cards.forEach((card_value,index) => {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    card.dataset.index = index;
    card.innerText = card_value;
    card.addEventListener("click",revealCard)
    gameBoard.appendChild(card);
  });
}

let flippedCards = [];
let matchedPairs = 0;

//function to handle card click
function revealCard(){
  const selectedCard = this;
  
  if (selectedCard.classList.contains("hidden") && flippedCards.length < 2){
    selectedCard.classList.remove("hidden");
    flippedCards.push(selectedCard);
    if (flippedCards.length === 2){
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const value1 = card1.innerText;
  const value2 = card2.innerText;

  if (value1 === value2) {
      // Match found
      card1.removeEventListener("click", revealCard);
      card2.removeEventListener("click", revealCard);
      matchedPairs++;
      if (matchedPairs === cardValues.length) {
          // All pairs matched, game over
          setTimeout(() => {
              alert("Congratulations! You've matched all pairs!");
          }, 500);
      }
  } else {
      // No match, flip cards back
      setTimeout(() => {
          card1.classList.add("hidden");
          card2.classList.add("hidden");
      }, 500);
  }

  // Clear flipped cards array
  flippedCards = [];
}


//prevent clicking on already matched or flipped cards
