
let game, button;
let width = 900, height = 800;

function setup() { 
    createCanvas(width, height);
    game = new GameLogic(width,height);
    game.createBoard();
    game.createPlayers();
    genButton();
    textAlign(CENTER);
  }
  

function draw() {
    background(255);   
    game.gameLoop();

    if(game.gameOver){
        game.endScreen();
        button.show();
    }
    else
        button.hide();
}

function mousePressed() {  
    game.clicked(mouseX,mouseY);
}

let genButton= () =>{
    button = createButton('PLAY AGAIN');
    button.position(width+20, 20);
    button.style('font-size','20px');
    button.size(200,75);
    button.mousePressed(()=>{
        game.restartGame();
    })
}