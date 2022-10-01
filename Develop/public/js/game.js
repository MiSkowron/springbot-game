var character = document.getElementById("character");
var block = document.getElementById("block");
var jumpKey = document.getElementById("jumpKey");
var gameState = document.getElementById("gameState");
var score = document.getElementById("scoreSpan");

var counter = 0;

const keys = ["KeyA", "KeyW", "Space", "KeyQ", "KeyD", "KeyE", "ShiftLeft", "KeyR"]
// keys const for testing
// const keys = ["Space", "ShiftLeft"]

document.addEventListener("keydown", start, { once: true })

let randomKey = 'Space'

function start() {
    getKey()
    character.src = "./assets/run.gif"

    setTimeout(function(){
        block.classList.remove("hidden")
        

    var statusCheck = setInterval(function() {
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
    gameState.innerText = "Game Over! Press any key to restart."
    score.classList.add("hidden")
    block.style.animation = "none";
    block.classList.add("hidden")
    // block.style.animation = "block 1s infinite linear";
    jumpKey.innerText = ("Score: "+Math.floor(counter/100));
    counter=0;
    character.src = "./assets/dead.gif"
    setTimeout(function(){
        character.src = "./assets/dead.png"
    },570);
    setTimeout(() => {
        document.addEventListener("keydown", event => {
            window.location.reload()
        })
      }, 1000)
}

