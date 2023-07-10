document.addEventListener('DOMContentLoaded', function() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;

    const submit = document.querySelector('#sub');
    const userInput = document.querySelector('#guessField');
    const guessSlot = document.querySelector('.guesses');
    const remaining = document.querySelector('.lastResult');
    const lowOrHigh = document.querySelector('.LowOrHigh');

    let previousGuesses = [];
    let numGuess = 1;
    let playGame = true;

    submit.addEventListener('click', function(e) {
        e.preventDefault();
        if (playGame) {
            const guess = parseInt(userInput.value);
            validateGuess(guess);
        }
    });

    function validateGuess(guess) {
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert('Please enter a valid number between 1 and 100!');
            return;
        }

        previousGuesses.push(guess);
        displayGuesses(guess);
        checkGuess(guess);
    }

    function checkGuess(guess) {
        if (guess === randomNumber) {
            displayMessage('Congratulations! You guessed the correct number!');
            endGame();
        } else if (numGuess === 10) {
            displayMessage(`Game Over! The correct number was ${randomNumber}`);
            endGame();
        } else {
            const message = guess < randomNumber ? 'Too low! Guess again.' : 'Too high! Guess again.';
            displayMessage(message);
            numGuess++;
            remaining.textContent = 10 - numGuess + 1;
        }
    }

    function displayGuesses(guess) {
        guessSlot.textContent = 'Previous Guesses: ' + previousGuesses.join(', ');
        userInput.value = '';
        userInput.focus();
    }

    function displayMessage(message) {
        lowOrHigh.textContent = message;
    }

    function endGame() {
        playGame = false;
        userInput.disabled = true;
        submit.disabled = true;
    }
});
