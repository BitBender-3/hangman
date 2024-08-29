/* eslint-disable no-unused-vars */
//List of words to game
import wordList from "./word-list.js";

let choseWord;
let showPhrase;
let numberErrors;
let attemptsRestants;

// function to start the game
function startGame() {
    choseWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(choseWord);

    showPhrase = Array(choseWord.word.length).fill('_');
    console.log(showPhrase);

    numberErrors = 0;
    attemptsRestants = 7;

    updateGame();
}

const updateGame = () => {
    document.getElementById("img-game").src = `../img/hangman${numberErrors}.svg`;

    const wordContainer = document.querySelector(".show_words");
    let hint = document.querySelector(".hint");
    hint.textContent = choseWord.hint;
    let attempteds = document.querySelector(".color-hint");
    attempteds.textContent = `/${numberErrors}`;
    wordContainer.textContent = showPhrase.join(' ');
    
    gameActions();
    winGame();
    endGame();
}

const gameActions = () => {
    const columnClasses = [".column-1 td", ".column-2 td", ".column-3 td"];

    columnClasses.forEach(className => {
        const values = document.querySelectorAll(className);

        values.forEach(vl => {
            vl.removeEventListener("click", handleClick);
            vl.addEventListener("click", handleClick);
        });
    })
}

function handleClick(e) {
    const letter = e.currentTarget.textContent.toLowerCase();

    if (choseWord.word.includes(letter)) {
        for (let i = 0; i < choseWord.word.length; i++) {
            if (choseWord.word[i] === letter) {
                showPhrase[i] = letter;
            }
        }

    } else {
        numberErrors++;
        attemptsRestants--;
    }

    updateGame();
}

function winGame() {
    const word = document.querySelector(".show_words").textContent.replace(/\s+/g, '');

    if(choseWord.word === word) {
            document.body.style.backgroundColor = `#214028`;

            const winDialog = document.getElementById("dialog-overshow");
            winDialog.style.display = "flex";

            const correctWord = document.getElementById("correct-word");
            correctWord.textContent = choseWord.word;

            const restartButton2 = document.querySelector(".restart-button-2");
            restartButton2.addEventListener("click", () => {

               winDialog.style.display = "none";

               document.body.style.backgroundColor = '';

               startGame();
        });
    }
}

function endGame() {
    if(numberErrors >= 6) {
        document.body.style.backgroundColor = `#214028`;

        const gameOverDialog = document.getElementById("game-over-dialog");
        gameOverDialog.style.display = "flex";

        const correctWordElement = document.getElementById("correct-word-2");
        correctWordElement.textContent = choseWord.word;

        const restartButton = document.getElementById("restart-button");
        restartButton.addEventListener("click", () => {
            gameOverDialog.style.display = "none";

            document.body.style.backgroundColor = '';

            startGame();
        });
    }
}

startGame();
