const cardValues: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// shuffle cards
function shuffleCardsArray(cards: string[]): string[] {
  for(let i = cards.length - 1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function initializeGame() {
  const shuffledCards = shuffleCardsArray(cardValues);
  const gameBoard = document.getElementById('board-game') as HTMLDivElement;
  gameBoard.innerHTML = '';

  shuffledCards.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = `
      <div class="front">${value}</div>
      <div class="back"></div>
    `
    gameBoard.appendChild(card);
  })

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.addEventListener('click', flipcard));
}

// variables to keep track of flipped cards
let flippedCards: HTMLElement[] = [];
let isProcessing = false;

function flipcard(this: HTMLElement): void {
  // cases to not flip the card
  if(isProcessing || this.classList.contains('flipped') || flippedCards.length === 2) return;

  this.classList.add('flipped');
  flippedCards.push(this);

  if(flippedCards.length === 2) {
    isProcessing = true;
    setTimeout(checkForMatch, 1500);
  }
}

function checkForMatch(): void {
  const [card1, card2] = flippedCards;
  const value1 = card1.dataset.value;
  const value2 = card2.dataset.value;

  if(value1 === value2) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    updateScore();
  }
  else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
  isProcessing = false;
}

function updateScore(): void {
  const scoreElement = document.getElementById('score') as HTMLSpanElement;
  const currentScore = parseInt(scoreElement.innerText || '0', 10);
  scoreElement.innerText = (currentScore + 1).toString();
}

window.addEventListener('load', initializeGame);