const gameContainer = document.querySelector('#gameContainer');
const playButton = document.querySelector('#play');
const resetButton = document.querySelector('#reset');

// Initialize player and computer scores at 0
let playerScore = 0;
let computerScore = 0;

// Set initial Round to 1
let gameRound = 1;

// Initialize last scored indexing variable
let lastScored = '';

function createUserInput() {

    // Check if userInput div is present
    const userInputCheck = document.querySelector('#userInput');

    // If userInput div is not present, render it and child components
    if (!userInputCheck) {

        // Create a div with id set to userInput, append it to gameContainer
        const userInputDiv = document.createElement('div');
        userInputDiv.id = 'userInput';
        userInputDiv.classList.add('user-input', 'flex', 'full-width');
        gameContainer.appendChild(userInputDiv);

        // Create a p element with instruction content and append it to userInputDiv
        const userInputPara = document.createElement('p');
        userInputPara.classList.add('user-input-para');
        userInputPara.textContent = 'Make your choice:';
        userInputDiv.appendChild(userInputPara);

        // Create a div element with id set to choices and append it to userInputDiv
        const userChoicesDiv = document.createElement('div');
        userChoicesDiv.id = 'choices';
        userChoicesDiv.classList.add('choices', 'flex', 'full-width');
        userInputDiv.appendChild(userChoicesDiv);

        // Set an array of possible user choices
        const userChoices = ['Rock','Paper','Scissors'];

        // Loop through user choices, create links/images with options
        userChoices.forEach((choice) => {

            // Create an anchor element with an id equal to the choice, a class of userChoice
            // and an onclick of handleUserInput(). Append it to userChoicesDiv
            const choiceLink = document.createElement('a');
            choiceLink.id = choice;
            choiceLink.classList.add('userChoice');
            userChoicesDiv.appendChild(choiceLink);

            // Create an img element with a src set to the choice and add .jfif, append it to choiceLink
            const choiceImage = document.createElement('img');
            choiceImage.src = `${choice}.jfif`;
            choiceImage.classList.add('img');
            choiceLink.appendChild(choiceImage);
            
            // Add event listener to choiceLink to execute handleUserInput
            choiceLink.addEventListener('click',() => {
                handleUserInput(choice,gameRound);
            });

        });

        // Create stats div and append to userInputDiv
        const gameStats = document.createElement('div');
        gameStats.id = 'stats';
        gameStats.classList.add('stats-container','flex','full-width');
        userInputDiv.appendChild(gameStats);

        // Create playerStats div and append to stats
        const playerStats = document.createElement('div');
        playerStats.id = 'playerStats';
        playerStats.classList.add('stats','flex');
        gameStats.appendChild(playerStats);

        // Create playerScoreLabel and append to playerStats
        const playerScoreLabel = document.createElement('div');
        playerScoreLabel.id = 'playerScoreLabel';
        playerScoreLabel.classList.add('score-label');
        playerScoreLabel.innerText = 'Player';
        playerStats.appendChild(playerScoreLabel);

        // Create playerScore and append to playerStats
        const playerScoreElement = document.createElement('div');
        playerScoreElement.id = 'playerScore';
        playerScoreElement.classList.add('score');
        playerScoreElement.innerText = playerScore;
        playerStats.appendChild(playerScoreElement);

        // Create computerStats div and append to stats
        const computerStats = document.createElement('div');
        computerStats.id = 'computerStats';
        computerStats.classList.add('stats','flex');
        gameStats.appendChild(computerStats);
        
        // Create computerScoreLable and append to computerStats
        const computerScoreLabel = document.createElement('div');
        computerScoreLabel.id = 'computerScoreLabel';
        computerScoreLabel.classList.add('score-label');
        computerScoreLabel.innerText = 'Computer';
        computerStats.appendChild(computerScoreLabel);

        // Create computerScore and append to computerStats
        const computerScoreElement = document.createElement('div');
        computerScoreElement.id = 'computerScore';
        computerScoreElement.classList.add('score');
        computerScoreElement.innerText = computerScore;
        computerStats.appendChild(computerScoreElement);

        // Check lastScore Element and add class accordingly
        if (lastScored === 'player') {
            playerStats.classList.add('latest-scored');
        } else if (lastScored === 'computer') {
            computerStats.classList.add('latest-scored');
        };

    };
};

function createResultPanel(roundNum,results,winningChoice,losingChoice) {

    // Create a div with id set to results. Append it to gameContainer.
    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'results';
    gameContainer.appendChild(resultsDiv);
    
    // Create a div with an id set to 'round(roundNumber)' and append it to resultsDiv
    const roundDiv = document.createElement('div');
    roundDiv.id = `round${roundNum}`;
    resultsDiv.appendChild(roundDiv);

    // Create an hr element and append it to roundDiv
    const resultSeparator = document.createElement('hr');
    roundDiv.appendChild(resultSeparator);

    // Create an h2 element with inner text indicating the round number and results
    // Append it to roundDiv
    const roundTitle = document.createElement('h2');
    roundTitle.innerText = `Round ${roundNum} Results:`;
    roundDiv.appendChild(roundTitle);

    // Check for the word tie in result.
    if (results.includes('tie')) {

        // If present, create img element with the img and img-winning classes
        const resultImg = document.createElement('img');
        resultImg.src = `${winningChoice}.jfif`;
        resultImg.classList.add('img');
        resultImg.classList.add('img-winning');

        // Append the image to roundDiv
        roundDiv.appendChild(resultImg);

    } else {

        // If not a tie, create winning and losing image and append to roundDiv
        const winningImg = document.createElement('img');
        winningImg.classList.add('img');
        winningImg.classList.add('img-winning');
        winningImg.src = `${winningChoice}.jfif`;

        const losingImg = document.createElement('img');
        losingImg.classList.add('img');
        losingImg.classList.add('img-losing');
        losingImg.src = `${losingChoice}.jfif`;

        roundDiv.appendChild(winningImg);
        roundDiv.appendChild(losingImg);
        
    }

    // Create a p element with id roundResult and inner text set to results parameter
    // Append it to roundDiv
    const roundPara = document.createElement('p');
    roundPara.id = 'roundResult';
    roundPara.innerText = results;
    roundDiv.appendChild(roundPara);

    // Append another resultSepartor to roundDiv
    roundDiv.appendChild(resultSeparator);
};

function createGameOutcomePanel() {

    // Check playerScore against Computer score
    const gameOutcome = () => {
        if (playerScore > computerScore) {
            return `Player wins ${playerScore}:${computerScore}`;
        } else if (computerScore > playerScore) {
            return `Computer wins ${computerScore}:${playerScore}`;
        } else if (playerScore === computerScore) {
            return `The game was tied ${playerScore}:${computerScore}`;
        };
    };

    // Create Game Outcome Panel and append it to gameContainer
    const gameOutcomeDiv = document.createElement('div');
    gameOutcomeDiv.id = 'gameOutcome';
    gameContainer.appendChild(gameOutcomeDiv);

    // Create an h2 element with the game outcome in it. Append to gameOutcomeDive
    const gameOutComeTitle = document.createElement('h2');
    gameOutComeTitle.textContent = `${gameOutcome()}`;
    gameOutcomeDiv.appendChild(gameOutComeTitle);

};

function removeUserInput() {

    // Check for an element with the userInput id
    userInputCheck = document.querySelector('#userInput');

    // If there is an element with the userInput id, remove it from it's parent node
    if(userInputCheck) {
        userInputCheck.parentNode.removeChild(userInputCheck);
    }
};

function removeResultsPanels() {

    // Check for all elements with an id of results
    const resultsPanelsCheck = document.querySelectorAll('#results');

    // Check for an element with an id of gameOutcome
    const outcomePanel = document.querySelector('#gameOutcome');
    
    //If there are results panels and an outcome panel, remove all results panels and the game outcome panel
    if (resultsPanelsCheck && outcomePanel) {

        outcomePanel.parentNode.removeChild(outcomePanel);
        
        resultsPanelsCheck.forEach((panel) => {
            panel.parentNode.removeChild(panel);
        });
    // If there are just results panels, remove them
    } else if (resultsPanelsCheck) {

        resultsPanelsCheck.forEach((panel) => {
            panel.parentNode.removeChild(panel);
        });
    };
};

function getComputerChoice() {

    // Generate a random number between 1 and 3 inclusive
    const computerChoice = Math.floor(Math.random() * (4 - 1) + 1);

    // Return rock, paper, or scissors based on number value of computerChoice
    switch(computerChoice) {
        case 1:
            return 'Rock';
            break;
        case 2:
            return 'Paper';
            break;
        case 3:
            return 'Scissors';
            break;
    };
};

function getResults(computerChoice, playerChoice) {
    
    if(playerChoice === 'Rock' && computerChoice === 'Scissors' || 
        playerChoice === 'Paper' && computerChoice === 'Rock' || 
        playerChoice === 'Scissors' && computerChoice === 'Paper') {
        // If player choice beats computer choice, return a string declaring player the winner
        incrementPlayerScore();
        return {
            winningChoice: playerChoice,
            losingChoice: computerChoice,
            result: `Player wins! ${playerChoice} beats ${computerChoice}!`
        };
    } else if(playerChoice === computerChoice) {
        // If player choice and computer choice are the same, return a string delcaring a tie
        lastScored = '';
        return {
            winningChoice: playerChoice,
            losingChoice: computerChoice,
            result: `It's a tie! Both chose ${playerChoice}.`
        };
    } else {
        // Otherwise, return string declaring computer the winner
        incrementComputerScore();
        return {
            winningChoice: computerChoice,
            losingChoice: playerChoice,
            result: `Computer wins! ${computerChoice} beats ${playerChoice}!`
        };
    };
};

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
        createResultPanel(roundNum,roundResult.result,roundResult.winningChoice,roundResult.losingChoice);

        // Insert a user input panel
        createUserInput();

    } else {
        // Insert a result panel
        createResultPanel(roundNum,roundResult.result,roundResult.winningChoice,roundResult.losingChoice);

        // Insert a game outcome panel
        createGameOutcomePanel();

        playButton.disabled = true;

    };

    // Set focus to end of page
    window.scrollTo(0,document.body.scrollHeight);

};

function resetGame() {

    // Initialize player and computer scores at 0
    playerScore = 0;
    computerScore = 0;

    // Set initial Round to 1
    gameRound = 1;

    // Reset lastScored
    lastScored = '';

    // Remove any user input pane
    removeUserInput();

    // Remove results panels
    removeResultsPanels();

    // Enable play button
    playButton.disabled = false;
};

function incrementPlayerScore() {
    
    // Increment player score up by one
    playerScore += 1;

    // Set lastScored to player
    lastScored = 'player';

};

function incrementComputerScore() {

    // Increment computer score by one
    computerScore += 1;

    // Set lastScored to computer
    lastScored = 'computer';
};

playButton.addEventListener('click', () => {
    createUserInput();    
});

resetButton.addEventListener('click',() => {
    resetGame();
});