const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let pontos = 100

function handleKeyDown(event) {
    if(event.keyCode === 38) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    
    isJumping = true;
    
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            
            // Descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }else {
                    position -= 20;
                    dino.style.bottom = position + 'px'
                }
            }, 20)
        } else {    
            // Subindo
            position += 20;
            dino.style.bottom = position + 'px'
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 3000;
    
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);
    
    let leftInterval = setInterval(() => {
        if (cactusPosition < 0) {
            document.querySelector('.pontuacao').innerHTML = 'Pontos: ' + pontos;
            pontos = pontos + 100
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            // Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = 
            `<div class="game-over-container">
            <p>Fim de Jogo!</p>
            <img src="./img/skull-dino.png">
            <span>Resultado: ${pontos - 100} pontos</span>
            </div>`
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px'     
        }
    }, 20);
    
    setTimeout(createCactus, randomTime);
}


createCactus()
document.addEventListener('keydown', handleKeyDown )
