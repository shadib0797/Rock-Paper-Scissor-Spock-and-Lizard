const userHand = document.querySelector(".user-picked-hand");
const houseHand = document.querySelector(".house-picked-hand");
const rules = document.querySelector(".rules");
const logo  = document.querySelector(".logo");

const gameArea = document.querySelector(".game");
const gameThreeWay = document.querySelector(".initial-state.three-way");
const gameFiveWay = document.querySelector(".initial-state.five-way");
const middleState = document.querySelector(".middle-state");
const gameHands = document.querySelectorAll(".initial-state .game-hand");
const scoreBoard = document.querySelector(".score");

let userPickedHand = "";
let housePickedHand = "";
let score = 0;

function randomThreeHand(){
    const data = ["rock" , "paper", "scissors"];
    const index = Math.floor(Math.random()*3);
    return data[index]
}

function randomFiveHand(){
    const data = ["rock", "paper", "scissors", "spock", "lizard"];
    const index = Math.floor(Math.random()*5);
    console.log(index);
    return data[index]
}

function displayUserHand(){
    const div = document.createElement("div");
    div.classList.add("game-hand", userPickedHand, "user-hand-animation");
    userHand.appendChild(div)
            .innerHTML = `<img src='./images/icon-${userPickedHand}.svg' alt='icon-${userPickedHand}'>`;
}

function displayHouseHand(){
    housePickedHand = gameArea.classList.contains("three-way") ? randomThreeHand() : randomFiveHand();
    console.log(housePickedHand);
    const div = document.createElement("div");
        div.classList.add("game-hand", housePickedHand, "house-hand-animation");
        houseHand.appendChild(div)
                .innerHTML = `<img src='./images/icon-${housePickedHand}.svg' alt='icon-${housePickedHand}'>`;
}

gameHands.forEach(gameHand => (
    gameHand.addEventListener("click", ()=>{

        const target = gameHand.classList;
        if(target.contains("paper")){
            userPickedHand = "paper";
        }else if (target.contains("rock")) {
            userPickedHand = "rock";
        }else if(target.contains("scissors")){
            userPickedHand = "scissors";
        }else if(target.contains("spock")){
            userPickedHand = "spock";
        }else if(target.contains("lizard")){
            userPickedHand = "lizard";
        }

        game();
    })
));


function gameReset(){
    if(gameArea.classList.contains("three-way")){
        gameThreeWay.classList.remove("hide");
        gameFiveWay.classList.add("hide");
    }else{
        gameFiveWay.classList.remove("hide");
        gameThreeWay.classList.add("hide");
    }
    middleState.classList.add("hide");
    userHand.removeChild(userHand.firstElementChild);
    userHand.classList.remove("win");
    houseHand.removeChild(houseHand.firstElementChild);
    houseHand.classList.remove("win");
    document.querySelector(".game").classList.remove("animate");
}


function game(){
    if(gameArea.classList.contains("three-way")){
        gameThreeWay.classList.add("hide");
    }else{
        gameFiveWay.classList.add("hide");
    }
    middleState.classList.remove("hide");

    displayUserHand();
    setTimeout(() => {
        displayHouseHand();
        document.querySelector(".game").classList.add("animate");
        showResult();
    }, 1000);
}

function showResult(){
    const result = document.querySelector(".result .text");

    if(userPickedHand === housePickedHand){
        result.innerText = "Game Tie";
        scoreBoard.innerText = score;
    }else if ((userPickedHand === "paper" && (housePickedHand === "rock" || housePickedHand === "spock")) || 
                (userPickedHand === "rock" && (housePickedHand === "scissors" || housePickedHand === "lizard")) || 
                (userPickedHand === "scissors" && (housePickedHand === "paper" || housePickedHand === "lizard")) || 
                (userPickedHand === "spock" && (housePickedHand === "scissors" || housePickedHand === "rock")) || 
                (userPickedHand === "lizard" && (housePickedHand === "paper" || housePickedHand === "spock"))) {
        result.innerText = "You win";
        userHand.classList.add("win");
        score += 1
        scoreBoard.innerText = score;
    }else{
        result.innerText = "You Lose";
        houseHand.classList.add("win");
        if (score !== 0){
            score -= 1
        }
        scoreBoard.innerText = score;
    }
}

document.querySelector(".result button").addEventListener("click", ()=>{
    gameReset();
})

rules.addEventListener("click", ()=>{
    document.querySelector(".modal").classList.remove("hide")
})

document.querySelector(".icon-close").addEventListener("click", ()=>{
    document.querySelector(".modal").classList.add("hide")
})

logo.addEventListener("click", ()=>{
    // LOGO TOOGLE
    document.querySelector(".rps").classList.toggle("hide");
    document.querySelector(".rpssl").classList.toggle("hide");
    document.querySelector(".img-rules").classList.toggle("hide");
    document.querySelector(".img-rules-bonus").classList.toggle("hide");

    // INITIAL STATE TOGGLE
    gameArea.classList.toggle("three-way");
    gameReset();
    score = 0;
    scoreBoard.innerText = score;
})