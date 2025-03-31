// ==================== GAME INITIALIZATION ====================
let des = document.getElementById('des').getContext('2d');
let canvas = document.getElementById('des');

// Game state variables
let gameSpeed = 1;
let currentLevel = 1;
let maxLevelReached = 1;
let animationFrameId = null;
let gameStarted = false;
let jogar = true;

// Speed configuration
let backgroundSpeed = 2;
let carSpeed = 2.5;
let roadMarkingsSpeed = 3;

// Level progression
const levelThresholds = [0, 20, 50, 100, 200, 350, 500];

// Game objects
let c1 = new Carro(225,450,50,80,'darkblue');
let carro = new Carro(225,600,45,100,'./assets/carro_01.png');
let c2 = new Carro2(400,-40,45,100,'./assets/carro_02.png');
let c3 = new Carro2(200,-280,45,100,'./assets/carro_03.png');

// Road elements


// Text elements
let t1 = new Text();
let t2 = new Text();
let t3 = new Text();
let t4 = new Text();
let t5 = new Text();

// Audio
let motor = new Audio('./assets/motor.wav');
let batida = new Audio('./assets/batida.mp3');
motor.volume = 0.8;
motor.loop = true;
batida.volume = 0.8;

// Background variables
const backgroundImg = new Image();
backgroundImg.src = './assets/Background.png';
const backgroundHeight = 1400;
let backgroundY = 0;

// ==================== INTRO SCREEN ====================
const introScreen = document.createElement('div');
introScreen.id = 'introScreen';
introScreen.style.position = 'fixed';
introScreen.style.top = '0';
introScreen.style.left = '0';
introScreen.style.width = '100%';
introScreen.style.height = '100%';
introScreen.style.backgroundColor = 'rgba(0, 0, 50, 0.9)';
introScreen.style.display = 'flex';
introScreen.style.flexDirection = 'column';
introScreen.style.alignItems = 'center';
introScreen.style.justifyContent = 'center';
introScreen.style.zIndex = '100';

const gameTitle = document.createElement('h1');
gameTitle.textContent = 'RACING GAME';
gameTitle.style.color = 'yellow';
gameTitle.style.fontFamily = 'Arial, sans-serif';
gameTitle.style.fontSize = '48px';
gameTitle.style.margin = '0 0 40px 0';
gameTitle.style.textShadow = '2px 2px 8px #000000';
gameTitle.style.textAlign = 'center';

const startButton = document.createElement('button');
startButton.textContent = 'START GAME';
startButton.style.padding = '15px 40px';
startButton.style.fontSize = '24px';
startButton.style.fontWeight = 'bold';
startButton.style.backgroundColor = 'darkblue';
startButton.style.color = 'yellow';
startButton.style.border = '3px solid yellow';
startButton.style.borderRadius = '10px';
startButton.style.cursor = 'pointer';
startButton.style.transition = 'all 0.3s';
startButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';

// Button hover effects
startButton.addEventListener('mouseover', () => {
    startButton.style.backgroundColor = 'yellow';
    startButton.style.color = 'darkblue';
    startButton.style.transform = 'scale(1.05)';
});

startButton.addEventListener('mouseout', () => {
    startButton.style.backgroundColor = 'darkblue';
    startButton.style.color = 'yellow';
    startButton.style.transform = 'scale(1)';
});

introScreen.appendChild(gameTitle);
introScreen.appendChild(startButton);
document.body.appendChild(introScreen);

// Intro animations
gameTitle.style.opacity = '0';
gameTitle.style.transform = 'translateY(-30px)';
gameTitle.style.transition = 'all 0.8s ease-out';

startButton.style.opacity = '0';
startButton.style.transform = 'translateY(30px)';
startButton.style.transition = 'all 0.8s ease-out 0.3s';

setTimeout(() => {
    gameTitle.style.opacity = '1';
    gameTitle.style.transform = 'translateY(0)';
    startButton.style.opacity = '1';
    startButton.style.transform = 'translateY(0)';
}, 100);

// ==================== GAME OVER SCREEN ====================
let gameOverScreen = null;
let restartButton = null;

function showRestartScreen() {
    if (gameOverScreen) {
        document.body.removeChild(gameOverScreen);
    }

    gameOverScreen = document.createElement('div');
    gameOverScreen.style.position = 'fixed';
    gameOverScreen.style.top = '0';
    gameOverScreen.style.left = '0';
    gameOverScreen.style.width = '100%';
    gameOverScreen.style.height = '100%';
    gameOverScreen.style.backgroundColor = 'rgba(0, 0, 50, 0.9)';
    gameOverScreen.style.display = 'flex';
    gameOverScreen.style.flexDirection = 'column';
    gameOverScreen.style.alignItems = 'center';
    gameOverScreen.style.justifyContent = 'center';
    gameOverScreen.style.zIndex = '100';
    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.transition = 'opacity 0.5s ease-out';

    const gameOverText = document.createElement('h1');
    gameOverText.textContent = 'GAME OVER';
    gameOverText.style.color = 'red';
    gameOverText.style.fontFamily = 'Arial, sans-serif';
    gameOverText.style.fontSize = '48px';
    gameOverText.style.marginBottom = '10px';
    gameOverText.style.textShadow = '2px 2px 8px #000000';

    const levelText = document.createElement('h2');
    levelText.textContent = `Max Level Reached: ${maxLevelReached}`;
    levelText.style.color = 'yellow';
    levelText.style.fontFamily = 'Arial, sans-serif';
    levelText.style.fontSize = '32px';
    levelText.style.marginBottom = '10px';

    const finalScoreText = document.createElement('h2');
    finalScoreText.textContent = `Final Score: ${carro.pts}`;
    finalScoreText.style.color = 'yellow';
    finalScoreText.style.fontFamily = 'Arial, sans-serif';
    finalScoreText.style.fontSize = '32px';
    finalScoreText.style.marginBottom = '30px';

    restartButton = document.createElement('button');
    restartButton.textContent = 'RESTART GAME';
    restartButton.style.padding = '15px 40px';
    restartButton.style.fontSize = '24px';
    restartButton.style.fontWeight = 'bold';
    restartButton.style.backgroundColor = 'darkred';
    restartButton.style.color = 'white';
    restartButton.style.border = '3px solid white';
    restartButton.style.borderRadius = '10px';
    restartButton.style.cursor = 'pointer';
    restartButton.style.transition = 'all 0.3s';
    restartButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';

    restartButton.addEventListener('mouseover', () => {
        restartButton.style.backgroundColor = 'white';
        restartButton.style.color = 'darkred';
        restartButton.style.transform = 'scale(1.05)';
    });

    restartButton.addEventListener('mouseout', () => {
        restartButton.style.backgroundColor = 'darkred';
        restartButton.style.color = 'white';
        restartButton.style.transform = 'scale(1)';
    });

    gameOverScreen.appendChild(gameOverText);
    gameOverScreen.appendChild(levelText);
    gameOverScreen.appendChild(finalScoreText);
    gameOverScreen.appendChild(restartButton);

    document.body.appendChild(gameOverScreen);

    setTimeout(() => {
        gameOverScreen.style.opacity = '1';
    }, 100);

    restartButton.addEventListener('click', restartGame);
}

// ==================== LEVEL UP FUNCTION ====================
function checkLevelUp() {
    if (currentLevel < levelThresholds.length && carro.pts >= levelThresholds[currentLevel]) {
        currentLevel++;
        maxLevelReached = Math.max(maxLevelReached, currentLevel);
        
        // Increase speeds with level progression
        gameSpeed = 1 + (currentLevel * 0.2);
        backgroundSpeed = 2 + (currentLevel * 0.1);
        carSpeed = 1 + (currentLevel * 0.15);
        roadMarkingsSpeed = 3 + (currentLevel * 0.15);
        
        showLevelUpMessage();
    }
}

function showLevelUpMessage() {
    const levelUpDiv = document.createElement('div');
    levelUpDiv.id = 'levelUpMessage';
    levelUpDiv.textContent = `LEVEL ${currentLevel}!`;
    levelUpDiv.style.position = 'fixed';
    levelUpDiv.style.top = '50%';
    levelUpDiv.style.left = '50%';
    levelUpDiv.style.transform = 'translate(-50%, -50%)';
    levelUpDiv.style.color = 'yellow';
    levelUpDiv.style.fontSize = '72px';
    levelUpDiv.style.fontWeight = 'bold';
    levelUpDiv.style.textShadow = '0 0 10px red, 0 0 20px red';
    levelUpDiv.style.zIndex = '200';
    levelUpDiv.style.opacity = '0';
    levelUpDiv.style.transition = 'all 0.5s ease-out';
    
    document.body.appendChild(levelUpDiv);
    
    // Animate in
    setTimeout(() => {
        levelUpDiv.style.opacity = '1';
        levelUpDiv.style.fontSize = '96px';
    }, 50);
    
    // Animate out after delay
    setTimeout(() => {
        levelUpDiv.style.opacity = '0';
        levelUpDiv.style.fontSize = '72px';
        
        // Remove after animation completes
        setTimeout(() => {
            document.body.removeChild(levelUpDiv);
        }, 500);
    }, 1500);
}

// ==================== GAME FUNCTIONS ====================
function startGame() {
    gameStarted = true;
    introScreen.style.opacity = '0';
    introScreen.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        document.body.removeChild(introScreen);
    }, 500);
    
    motor.play();
    main();
}

function restartGame() {
    if (gameOverScreen) {
        document.body.removeChild(gameOverScreen);
        gameOverScreen = null;
    }

    jogar = true;
    carro.vida = 5;
    carro.pts = 0;
    carro.x = 225;
    carro.y = 600;
    c2.recomeca();
    c3.recomeca();
    
    // Reset to level 1 speeds
    currentLevel = 1;
    gameSpeed = 1;
    backgroundSpeed = 2;
    carSpeed = 2.5;
    roadMarkingsSpeed = 3;
    
    motor.currentTime = 0;
    motor.play();
    main();
}

function drawBackground() {
    des.drawImage(backgroundImg, 0, backgroundY, canvas.width, canvas.height);
    des.drawImage(backgroundImg, 0, backgroundY - backgroundHeight, canvas.width, backgroundHeight);
    
    backgroundY += backgroundSpeed * gameSpeed;
    
    if (backgroundY >= backgroundHeight) {
        backgroundY = 0;
    }
}

function game_over() {
    if(carro.vida <= 0 && jogar) {
        jogar = false;
        motor.pause();
        cancelAnimationFrame(animationFrameId);
        showRestartScreen();
    }
}

function pontos() {
    if(carro.point(c2)){
        carro.pts +=1;
    }else if(carro.point(c3)){
        carro.pts += 1;
    }
}

function colisao() {
    if(carro.colid(c2)){
        carro.vida -= 1;
        c2.recomeca();
        batida.play();
    }else if(carro.colid(c3)){
        carro.vida -= 1;
        c3.recomeca();
        batida.play();
    } 
}

function desenha() {
    drawBackground();
    
    t1.des_text('Pontos: ',360,24,'yellow','26px Times');
    t2.des_text(carro.pts,442,24,'yellow','26px Times');
    t3.des_text('Vida: ',40,24,'yellow','26px Times');
    t4.des_text(carro.vida,100,24,'yellow','26px Times');
    t5.des_text(`Level: ${currentLevel}`, 200, 24, 'yellow', '26px Times');

    if(jogar){
        
        c2.des_car_img();
        c3.des_car_img();
        carro.des_car_img();
    }else{
        c1.des_carro();
        
        t5.des_text('Game Over',120,340,'yellow','46px Times');
    }  
}

function atualiza() {
    if(jogar){
        motor.play();
       
        c2.mov_carro2();
        c3.mov_carro2();
        carro.mov_carro();
        carro.anim('carro_01_');
        pontos();
        colisao();
        checkLevelUp();
        game_over();
    }
}

function main() {
    if (!gameStarted || !jogar) return;
    
    des.clearRect(0, 0, 500, 700);
    desenha();
    atualiza();
    animationFrameId = requestAnimationFrame(main);
}

// ==================== MODIFIED CLASS METHODS ====================
Carro2.prototype.mov_carro2 = function() {
    this.y += 2 * carSpeed * gameSpeed;
    if(this.y > 700){
        this.recomeca();
    }
};

Estrada.prototype.mov_est = function() {
    this.y += roadMarkingsSpeed * gameSpeed;
    if(this.y > 700){
        this.y = -80;
    }
};

// ==================== EVENT LISTENERS ====================
startButton.addEventListener('click', startGame);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !gameStarted) {
        startGame();
    }
    if (e.key === 'Enter' && !jogar && gameOverScreen) {
        restartGame();
    }
    if(e.key === 'a'){
        carro.dir -= 5;
    }else if(e.key === 'd'){
        carro.dir += 5;
    }
});

document.addEventListener('keyup', (e) => {
    if(e.key === 'a'){
        carro.dir = 0;
    }else if(e.key === 'd'){
        carro.dir = 0;
    }
});