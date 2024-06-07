const gameContainer = document.querySelector('#gameContainer');
const playButton = document.querySelector('#play');
const resetButton = document.querySelector('#reset');

const playerScoreElement = document.querySelector('#playerScore');
const computerScoreElement = document.querySelector('#computerScore');

// Initialize player and computer scores at 0
let playerScore = 0;
let computerScore = 0;

// Set initial Round to 1
let gameRound = 1;


function createUserInput() {

    // Create userInput Div and append it to gameContainer
    const userInput = `
        <div id = "userInput">
            <p>Make your choice:</p>
            <div id="choices">
                <a href="#" id="rock" class="userChoice">
                    <img src="rock.jfif">'
                </a>
                <a href="#" id="paper" class="userChoice">
                    <img src="paper.jfif">
                </a>
                <a href="#" id="scissors" class="userChoice">
                    <img src="scissors.jfif">
                </a>
            </div>
        </div>
    `;

    const userInputCheck = document.querySelector('#userInput')

    if(!userInputCheck) {
        gameContainer.innerHTML += userInput;

        // After links are created, loop through and add click event listeners calling handleUserInput
        const userChoices = document.querySelectorAll('.userChoice');

        userChoices.forEach((choice) => {
            choice.addEventListener('click', () => {
                handleUserInput(choice.id,gameRound);
            })
        })
    }

}

function createResultPanel(roundNum,results) {

    // Create resultPane and append it gameContainer
    const resultPane = `
        <div id="results">
            <div id="round${roundNum}">
                <hr>
                <h2>Round ${roundNum} Results:</h2>
                <p id="roundResult">${results}</p>
                <hr>
            </div>
        </div>
    `

    gameContainer.innerHTML += resultPane;
}

function createGameOutcomePanel() {

    // Check playerScore against Computer score
    const gameOutcome = () => {
        if (playerScore > computerScore) {
            return `Player wins ${playerScore}:${computerScore}`;
        } else if (computerScore > playerScore) {
            return `Computer wins ${computerScore}:${playerScore}`;
        } else if (playerScore === computerScore) {
            return `The game was tied ${playerScore}:${computerScore}`;
        }
    }
    // Create Game Outcome Panel and append it to gameContainer
    const gameOutcomePane = `
        <div id="gameoutcome">
            <h2>${gameOutcome()}</h2>
        </div>
    `;

    gameContainer.innerHTML += gameOutcomePane;
}

function getComputerChoice() {

    // Generate a random number between 1 and 3 inclusive
    const computerChoice = Math.floor(Math.random() * (4 - 1) + 1)

    // Return rock, paper, or scissors based on number value of computerChoice
    switch(computerChoice) {
        case 1:
            return 'rock';
            break;
        case 2:
            return 'paper';
            break;
        case 3:
            return 'scissors';
            break;
    }
}

function getResults(computerChoice, playerChoice) {
    
    if(playerChoice === 'rock' && computerChoice === 'scissors' || 
        playerChoice === 'paper' && computerChoice === 'rock' || 
        playerChoice === 'scissors' && computerChoice === 'paper') {
        // If player choice beats computer choice, return a string declaring player the winner
        incrementPlayerScore();
        console.log(playerScore);
        return `Player wins! ${playerChoice} beats ${computerChoice}!`;
    } else if(playerChoice === computerChoice) {
        // If player choice and computer choice are the same, return a string delcaring a tie
        return `It's a tie! Both chose ${playerChoice}.`;
    } else {
        // Otherwise, return string declaring computer the winner
        incrementComputerScore();
        console.log(computerScore);
        return `Computer wins! ${computerChoice} beats ${playerChoice}!`;
    };
}

function removeUserInput() {
    
    const userInput = document.querySelector('#userInput');
    
    gameContainer.removeChild(userInput);
}

function removeResultsPanels() {

    const resultPanels = document.querySelectorAll('#results');
    const outcomePanel = document.querySelector('#gameoutcome');

    if(resultPanels && outcomePanel) {

        resultPanels.forEach((result) => {
            gameContainer.removeChild(result);
        })

        gameContainer.removeChild(outcomePanel);
    } else if(resultPanels) {
        resultPanels.forEach((result) => {
            gameContainer.removeChild(result);
        })
    }
}

function handleUserInput(selection, roundNum) {

    // Increment the round count
    gameRound++;

    // Generate a random computer choice
    const generatedComputerChoice = getComputerChoice();

    // Get the round results
    const roundResult = getResults(generatedComputerChoice,selection);

    // Remove the user input panel
    removeUserInput();

    // Create another user input if not on 5th round, otherwise generate a game outcome panel
    if(roundNum !== 5) {
        // Insert a result panel
        createResultPanel(roundNum,roundResult);

        // Insert a user input panel
        createUserInput();
    } else {
        createGameOutcomePanel();
    }

}

function resetGame() {

    // Initialize player and computer scores at 0
    playerScore = 0;
    computerScore = 0;

    // Render initial scores
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;

    // Set initial Round to 1
    gameRound = 1;

    // Remove any user input pane
    removeUserInput();

    // Remove results panels
    removeResultsPanels();
}

function incrementPlayerScore() {
    playerScore += 1;
    playerScoreElement.textContent = playerScore;
}

function incrementComputerScore() {
    computerScore += 1;
    computerScoreElement.textContent = computerScore;
}

function fuckWithScores() {
    x = 5;

    if(x == 5) {
        playerScore += 1;
        playerScoreElement.textContent = playerScore;
        return 'Something';
    }
}


playButton.addEventListener('click', () => {
    createUserInput();
})

resetButton.addEventListener('click',() => {
    resetGame();
})