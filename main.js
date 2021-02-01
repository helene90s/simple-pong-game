
let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 15;
let ballSpeedY = 5;
const paddleWidth = 10;
const paddleHeight = 100;
let paddle1Y = 250;
let paddle2Y = 250;
let player1Score = 0
let player2Score = 0
const winningScore = 3
let endGame = false



function getMousePos(e) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function handleMouseClick(e) {
  if (endGame) {
    player1Score = 0
    player2Score = 0
    endGame = false
  }
}

window.onload = function () {

  canvas = this.document.getElementById('pong-game')
  canvasContext = canvas.getContext('2d')

  var framesPerSecond = 40
  setInterval(function () {
    draw()
    move()
  }, 1000 / framesPerSecond);


  canvas.addEventListener('mousedown', handleMouseClick)


  canvas.addEventListener('mousemove', function (e) {
    paddle1Y = getMousePos(e).y - (paddleHeight / 2)
  })

}

function resetBall() {

  if (player1Score >= winningScore || player2Score >= winningScore) {
    endGame = true
  }

  ballSpeedX = -ballSpeedX
  ballX = canvas.width / 2;
  ballY = canvas.height / 2
}

function computerMove() {
  if ((paddle2Y + (paddleHeight / 2)) < ballY - 35) {
    paddle2Y += 10
  } else if ((paddle2Y + (paddleHeight / 2)) > ballY + 35) {
    paddle2Y -= 10
  }
}

function move() {

  if (endGame) {
    return;
  }

  computerMove()

  ballX += ballSpeedX
  ballY += ballSpeedY

  if (ballX >= canvas.width) {
    if (ballY > paddle2Y && ballY < (paddle2Y + paddleHeight)) {
      ballSpeedX = -ballSpeedX
      let deltaY = ballY - (paddle2Y + paddleHeight / 2)
      ballSpeedY = deltaY * 0.35
    } else {
      player1Score++
      resetBall()
    }
  }

  if (ballX <= 0) {
    if (ballY > paddle1Y && ballY < (paddle1Y + paddleHeight)) {
      ballSpeedX = -ballSpeedX
      let deltaY = ballY - (paddle1Y + paddleHeight / 2)
      ballSpeedY = deltaY * 0.35
    } else {
      player2Score++
      resetBall()
    }
  }

  if (ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY
  }

  if (ballY <= 0) {
    ballSpeedY = -ballSpeedY
  }
}

function drawNet() {
  for (let i = 10; i <= canvas.height; i += 40) {
    canvasContext.fillStyle = 'white'
    canvasContext.fillRect(canvas.width / 2 - 1, i, 2, 20)
  }
}

function draw() {
  canvasContext.fillStyle = 'navy'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)


  if (endGame) {
    canvasContext.font = "30px Arial"
    canvasContext.fillStyle = 'white';

    if (player1Score >= winningScore) {
      canvasContext.fillText('Player 1 Wins !', canvas.width / 2 - 100, 50)
    } else if (player2Score >= winningScore) {
      canvasContext.fillText('Player 2 Wins !', canvas.width / 2 - 100, 50)
    }

    canvasContext.fillText('Click to continue', (canvas.width / 2) - 100, 150)
    return;
  }

  drawNet()


  paddle(0, paddle1Y, paddleWidth, paddleHeight, 'yellow')
  paddle(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, 'lightgreen')
  ball(ballX, ballY, 10, 'red')

  canvasContext.font = "30px Arial"
  canvasContext.fillStyle = 'white';
  canvasContext.fillText(player1Score, 300, 50)
  canvasContext.fillText(player2Score, canvas.width - 300, 50)
}

function paddle(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color
  canvasContext.fillRect(leftX, topY, width, height)
}

function ball(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color
  canvasContext.beginPath()
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
  canvasContext.fill()
}