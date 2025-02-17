const gameBoard = document.querySelector('.game-board');
const scoreDisplay = document.getElementById('score');
let score = 0;
let lastMole;
let timeUp = false;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomMole(moles) {
    const idx = Math.floor(Math.random() * moles.length);
    const mole = moles[idx];
    if (mole === lastMole) {
        return randomMole(moles);
    }
    lastMole = mole;
    return mole;
}

function peep() {
    const moles = document.querySelectorAll('.mole');
    const time = randomTime(500, 2000);
    const mole = randomMole(moles);
    mole.classList.add('up');
    setTimeout(() => {
        mole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreDisplay.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
        timeUp = true;
        // Create a new div element for the "Game Over" message
        const gameOverMessage = document.createElement('div');
        gameOverMessage.textContent = 'Game Over';
        // Style the div to display at the top of the screen
        gameOverMessage.style.position = 'fixed';
        gameOverMessage.style.top = '0';
        gameOverMessage.style.left = '50%';
        gameOverMessage.style.transform = 'translateX(-50%)';
        gameOverMessage.style.fontSize = '2rem';
        gameOverMessage.style.color = 'red';
        gameOverMessage.style.backgroundColor = 'black';
        gameOverMessage.style.padding = '10px';
        gameOverMessage.style.zIndex = '1000'; // Ensure it's above other elements
        // Append the div to the body
        document.body.appendChild(gameOverMessage);
    }, 10000); // Game time 10 seconds
}

function whack(e) {
    // Ensure the event is trusted to prevent simulated clicks
    if (!e.isTrusted) return;

    // Check if the clicked element is a mole and it is "up"
    if (this.classList.contains('mole') && this.classList.contains('up')) {
        score++;
        this.classList.remove('up'); // Hide the mole immediately after it's whacked
        scoreDisplay.textContent = score;
    }
}

function createMoles() {
    for (let i = 0; i < 16; i++) { // Keep the original number of moles at 16
        const moleContainer = document.createElement('div');
        moleContainer.classList.add('mole-container');

        const mole = document.createElement('div');
        mole.classList.add('mole');
        mole.addEventListener('click', whack);

        moleContainer.appendChild(mole); // Append mole to mole-container
        gameBoard.appendChild(moleContainer); // Append mole-container to gameBoard
    }
}

createMoles();
startGame(); // Call this function to start the game
