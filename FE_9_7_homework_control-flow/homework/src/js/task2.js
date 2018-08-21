const MAX = 5;
const AWARD = 10;

let gameContinued = false;
let gameCount = 0;
let prize, award, max;
let answer = confirm(`Do you want to play a game?`);

do {
    if (!answer) {
        alert(`You did not become a millionaire, but can.`);
    } else {
        startGame();
    }
} while (gameContinued);

function startGame() {
    const ATTEMPT = 3;
    let counter = 0;

    if (gameCount) {
        award *= 3;
        max *= 2;
    } else {
        prize = 0;
        award = AWARD;
        max = MAX;
    }

    let currentAward = award;
    let includeMax = max;
    includeMax++;
    let randomNumber = Math.floor(Math.random() * includeMax);

    while (counter < ATTEMPT) {
        let userNumber = prompt(`
        Enter a number from 0 to ${max}\n
        Attempts left: ${ATTEMPT - counter}\n
        Total prize: ${prize}$\n
        Possible prize of current attempt: ${currentAward}`, `number`);
        counter++;

        if (userNumber === null) {
            gameCount = 0;
            gameContinued = confirm(`Do you want to play again?`);
            break;
        } else {
            userNumber = Number(userNumber);
            if (counter === ATTEMPT) {
                alert(`Thank you for a game. Your prize is: ${prize}`);
                gameContinued = confirm(`Do you want to play again?`);
            } else if (userNumber === randomNumber) {
                prize += currentAward;
                gameCount++;
                alert(`Congratulation! Your prize is: ${prize}`);
                gameContinued = confirm(`Do you want to continued?`);
                break;
            }
        }
        currentAward = Math.floor(currentAward / 2);
    }
}


