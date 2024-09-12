let ball = document.querySelector('#ball');
let paddle = document.querySelector('#paddle');
let board = document.querySelector('#board');
let isMoving = false;
let offsetY = 0;

const boardRect = board.getBoundingClientRect();
const ballDiameter = ball.offsetWidth;
let ballX = 0;
let ballY = getRandomYPosition();
let speedX = 7;

let ballPoints = 0
let paddlePoints = 0
const scoreBoard = document.querySelector('#scoreBoard');


paddle.addEventListener('mousedown', (e) => {
    isMoving = true;
    offsetY = e.clientY - paddle.offsetTop;
    paddle.style.cursor = 'grabbing';
});


document.addEventListener('mousemove', (e) => {
    if (isMoving) {
        let newY = e.clientY - offsetY;
        
        const containerRect = board.getBoundingClientRect();
        const movableRect = paddle.getBoundingClientRect();

        if (newY < 0) {
            newY = 0;
        } else if (newY + movableRect.height > containerRect.height) {
            newY = containerRect.height - movableRect.height;
        }

        paddle.style.top = `${newY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isMoving = false;
    paddle.style.cursor = 'pointer';
});

////////
function getRandomYPosition() {
    const maxY = boardRect.height - ballDiameter;
    return Math.floor(Math.random() * (maxY + 1));
}

function animateBall() {
    ballX += speedX;


    if (ballX <= 0 || ballX + ballDiameter >= boardRect.width) {
        ballPoints += 1
        console.log(`ball: ${ballPoints}`)
        resetBall();
    }


    const ballRect = ball.getBoundingClientRect();
    const paddleRect = paddle.getBoundingClientRect(); 
    if (
        ballRect.right >= paddleRect.left &&
        ballRect.left <= paddleRect.right &&
        ballRect.top < paddleRect.bottom &&
        ballRect.bottom > paddleRect.top
    ) {
        paddlePoints += 1;
        console.log(`paddle: ${paddlePoints}`)
        resetBall();
    }
    scoreBoard.innerText = `${ballPoints} X ${paddlePoints}`;

    
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(animateBall);
}

function resetBall() {
    ballX = 0;
    ballY = getRandomYPosition();
    speedX = 7; 
}

animateBall();
