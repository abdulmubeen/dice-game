'use strict';

let currentScore, activePlayer, checkPlay, scores;

const firstPlayerElement = document.querySelector('.player--0');
const secondPlayerElement = document.querySelector('.player--1');
const firstPlayerScore = document.querySelector('#score--0');
const secondPlayerScore = document.querySelector('#score--1');
const firstPlayerCurrentScore = document.querySelector('#current--0');
const secondPlayerCurrentScore = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const init = () => {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    checkPlay = true;
    
    firstPlayerScore.textContent = 0;
    secondPlayerScore.textContent = 0;
    firstPlayerCurrentScore.textContent = 0;
    secondPlayerCurrentScore.textContent = 0;

    diceElement.classList.add('hidden');
    firstPlayerElement.classList.remove('player--winner');
    secondPlayerElement.classList.remove('player--winner');
    firstPlayerElement.classList.add('player--active');
    secondPlayerElement.classList.remove('player--active');
}

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    firstPlayerElement.classList.toggle('player--active');
    secondPlayerElement.classList.toggle('player--active');
}

init();

btnRoll.addEventListener('click', () =>{
    if(checkPlay){
        //Generate random dice
        const diceNumber = Math.trunc(Math.random()*6) + 1;
        //Display dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${diceNumber}.png`;
        //Check for dice value 1
        if(diceNumber !== 1){
            //Add dice value to current score
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else switchPlayer();
    }
});

btnHold.addEventListener('click',() =>{
    if(checkPlay){
        //Add currentScore to totalScore
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //Check if a player totalScore>=100
        if (scores[activePlayer] >= 100){
            checkPlay = false;
            diceElement.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else switchPlayer();
    }
});

btnNew.addEventListener('click', init);