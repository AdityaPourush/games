console.log("hello");

// element imports to be used in javascript
const userScoreElement = document.getElementById("userScore") as HTMLSpanElement;
const computerScoreElement = document.getElementById("computerScore") as HTMLSpanElement;
const userChoiceElement = document.getElementById("userChoice") as HTMLDivElement;
const computerChoiceElement = document.getElementById("computerChoice") as HTMLDivElement;
const resultElement = document.getElementById("result") as HTMLDivElement;
const choiceButtons = document.querySelectorAll('.choice-btn') as NodeListOf<HTMLButtonElement>;
const resetButton = document.getElementById("resetBtn") as HTMLButtonElement;

// tracking scores
let userScore = 0;
let computerScore = 0;

type Choice = 'rock' | 'paper' | 'scissors' ;
type Result = 'win' | 'lose' | 'tie' ;

const getComputerChoice = (): Choice => {
    const choices: Choice[] = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
} 

function determineWinner(userChoice: Choice, computerChoice: Choice): Result {
    if(userChoice === computerChoice){
        return 'tie';
    }
    else if(
        (userChoice == 'rock' && computerChoice === 'scissors') ||
        (userChoice == 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ){
        return 'win';
    }
    else {
        return 'lose';
    }
}

function updateScore(result : Result): void{
    if(result === 'win'){
        userScore++;
        userScoreElement.textContent = userScore.toString(); // as .textContent property of HTML elements expects a string value
    }
    else if(result === 'lose'){
        computerScore++;
        computerScoreElement.textContent = computerScore.toString();
    }
}

function displayResult(result: Result): void {
    resultElement.textContent = result.toUpperCase();
    resultElement.classList.add(result);
    setTimeout(() => {
        resultElement.classList.remove(result);
    }, 500)
}

function displayChoices(userChoice: Choice, computerChoice: Choice): void{
    userChoiceElement.textContent = getEmoji(userChoice);
    computerChoiceElement.textContent = '';
    setTimeout(() => {
        computerChoiceElement.textContent = getEmoji(computerChoice);
    }, 2000);
}

function getEmoji(choice: Choice): string{
    switch(choice){
        case('rock'):
            return '✊';
        case('paper'):
            return '✋';
        case('scissors'):
            return '✌️';
        default:
            return '';
    }
}

const handleChoice = (event: Event): void => {
    const target = event.target as HTMLButtonElement;
    const userChoice = target.dataset.choice as Choice;
    if(!userChoice) return;

    choiceButtons.forEach(btn => btn.classList.remove('selected'));
    target.classList.add('selected');

    const computerChoice = getComputerChoice();
    displayChoices(userChoice, computerChoice);

    setTimeout(()=> {
        const result = determineWinner(userChoice, computerChoice);
        displayResult(result);
        updateScore(result);
    }, 2000)
}

function resetGame(): void{
    userScore = 0;
    computerScore = 0;
    userScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    userChoiceElement.textContent = '';
    computerChoiceElement.textContent = '';
    resultElement.textContent = '';
    choiceButtons.forEach(btn => btn.classList.remove('selected'));
}

choiceButtons.forEach((button) => {
    button.addEventListener('click', handleChoice);
})

resetButton.addEventListener('click', resetGame);