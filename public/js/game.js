var character = document.getElementById("character");
var block = document.getElementById("block");
var jumpKey = document.getElementById("jumpKey");
var gameState = document.getElementById("gameState");
var score = document.getElementById("scoreSpan");
var scoreTxt = document.getElementById("score");
var saveBtn = document.getElementById("saveScore");
var bg = document.getElementById("bg");

// SFX
let deathSfx = new Audio('./sfx/death.mp3');
let jumpSfx = new Audio('./sfx/jump.mp3');
let hitSfx = new Audio('./sfx/hit.mp3');
let startSfx = new Audio('./sfx/start.mp3');

// Difficulty option buttons
var hardBtn = document.getElementById("hard");
var normalBtn = document.getElementById("normal");
var easyBtn = document.getElementById("easy");
const keysEasy = ["Space", "ShiftLeft"]
const keysHard = ["KeyA", "KeyW", "Space", "KeyQ", "KeyD", "KeyE", "ShiftLeft", "KeyR", "KeyP", "KeyO", "KeyI", "KeyU", "KeyK", "KeyJ", "KeyL", "ShiftRight"]

// Game Set
var counter = 0;
var statusCheck;
const keys = ["KeyA", "KeyW", "Space", "KeyQ", "KeyD", "KeyE", "ShiftLeft", "KeyR"]

// keys const for testing
// const keys = ["Space", "ShiftLeft"]

// Quotes from the scientist when you lose
const quotes = ['"Time to test another Springbot" - Scientist', '"This Springbot is defective" - Scientist', '"Better luck next time Springbot" - Scientist', '"More Springbot testing is needed" -Scientist', '"You can do better Springbot" -Scientist', '"Electric bombs are deadly for Springbot" -Scientist', '"I will build as many Springbots as it takes" -Scientist', '"When will I have my perfect Springbot?" -Scientist']

// Begin Game

document.addEventListener("keydown", start, { once: true })
document.addEventListener("keydown", jump, { once: true })

let randomKey = 'Space'

function start() {
    getKey()
    startSfx.play()
    character.src = "./assets/run.gif"
    bg.src = "./assets/BgRun.gif"

    setTimeout(function(){
        block.classList.remove("hidden")

     statusCheck = setInterval(function() {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        // HIT
        if(blockLeft<130 && blockLeft>100 && characterTop>=130){
            gameOver()  
        } 
        // DODGED
        else {
            counter++;
            document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
        }
    }, 10);
}, 1000);
}

function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");

    character.src = "./assets/jump.gif"
    jumpSfx.play()
    setTimeout(function(){
        character.classList.remove("animate");
        character.src = "./assets/run.gif"
    },300);
}

// document.addEventListener('keydown', event => {
//     // getKey()
//     console.log(event.code)
//     if(event.code === randomKey ) {
//         jump();
//     }
// })

function getKey(){
    var randomKey = keys[Math.floor(Math.random()* keys.length)]
    jumpKey.innerText = randomKey
    // console.log(randomKey);
    document.addEventListener('keydown', event => {
        // getKey()
        // console.log(event.code)
        if(event.code === jumpKey.innerText ) {
            jump();
            getKey()
        }
    })
}

function gameOver() {
    hitSfx.play()

    clearInterval(statusCheck);
    gameState.innerText = "Game Over! Press any key to restart."
    score.classList.add("hidden")

    var randomQuote = quotes[Math.floor(Math.random()* quotes.length)]
    scoreTxt.innerText = randomQuote

    block.style.animation = "none";
    block.classList.add("hidden")
    // block.style.animation = "block 1s infinite linear";
    jumpKey.innerText = ("Score: "+Math.floor(counter/100));
    counter = ("Score: "+Math.floor(counter/100));
    character.src = "./assets/dead.gif"
    bg.src = "./assets/BgSad.gif"
    
    setTimeout(function(){
        deathSfx.play()
        character.src = "./assets/dead.png"
        // bg.src = "./assets/BgSad.png"
    },570);
    setTimeout(() => {
        document.addEventListener("keydown", event => {
            window.location.reload()
        })
      }, 1000)
}

const recordScore = async () => {
    console.log(score);
if(score.innerText) {
    const userScore = score.innerText
    console.log(userScore);
    const response = await fetch(`/api/scores`, {
        method: 'POST',
        body: JSON.stringify({score: userScore}),
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
        // document.location.replace('/scores');
        
    } else {
        alert('Failed to post score')
    }
}
};

document.addEventListener('DOMContentLoaded', () => saveBtn.addEventListener('click', recordScore, { once: true }) )


