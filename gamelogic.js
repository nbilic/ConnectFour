class GameLogic {

    constructor(w, h) {
        this.w = w - 100;
        this.h = h;
        this.Tiles = [];  
        this.players = [];
        this.gameOver = false; 
        this.turn = 0;
        this.maxTurns = 41;
    }
    

    //Stvaramo 42 objekta klase Tile
    createBoard() {
        let row = [];
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++)
                row.push(new Tile(this.w / 7, this.h / 6, j * (this.w / 7), i * this.h / 6, i, j));
            this.Tiles.push(row);
            row = [];
        }
    }

    //Stvaramo 2 objekta klase Player
    createPlayers() {
        this.players[0] = new Player('RED','./RedGlow.cur');
        this.players[1] = new Player('BLUE','./BlueGlow.cur');
    }


    //Prikaz igre na ekranu
    gameLoop() {
        cursor(this.players[this.turn % 2].cursor);
        this.Tiles.forEach(t1 => {
            t1.forEach(t2 => {
                t2.showTile();
                t2.checkHover();
            })
        });      
        this.showScore();
    }

    //Vraća ploču na originalno stanje
    restartGame() {
        this.Tiles = [];
        this.turn = 0;
        this.gameOver = false;
        this.createBoard();
        loop();
    }

    //Metoda za postavljenje krugova na kliknuti Tile
    clicked(mouseX, mouseY) {
        //Nested loop za dobit pojedine tileove
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                let tile = this.Tiles[i][j];
                if (
                    mouseX > tile.x && // X pozicija miša je veća od pocetne x pozicije tilea
                    mouseX < tile.x + tile.w && // X Pozicija miša je manja od krajnje x pozicije tilea
                    mouseY > tile.y && // Y pozicija miša je veća od pocetne y pozicije tilea
                    mouseY < tile.y + tile.h    // Y pozicija miša je manja od krajnje y pozicije tilea 
                ) {

                    //Gleda se od dna da li je slobodan tile
                    for (let x = 5; x >= 0; x--) {
                        tile = this.Tiles[x][j];
                        if (tile.clicked == false) {
                            //Tile je slobodan za postaviti novu vrijednost (RED || BLUE)
                            tile.setTile(this.players[this.turn % 2].color);

                            //Gledamo da li je doslo do pobijednika
                            if (this.checkWin(x, j)) {
                                this.players[this.turn % 2].incrementScore();
                                this.gameOver = true;
                            };
                            this.turn++;
                            break;
                        }
                    }

                }
            }
        }

        //Ako je igra prešla maximum broj poteza završava izjednačeno
        if(this.turn> this.maxTurns)
            this.gameOver = true;
    }


    //Prikaz rezultata
    showScore() {
        textSize(20);
        fill(0);
        for (let i = 0; i < 2; i++) {
            text(this.players[i].color + ': ' + this.players[i].score, this.w+50, i * 40 + 50);
        }
    }

    checkWin(i, j) {
        //Horizontalna pobjeda
        if (this.checkHorizontal(i, j, this.Tiles[i][j].value) >= 4)
            return true;
        //Vertikalna pobjeda
        if (this.checkVertical(i, j, this.Tiles[i][j].value) >= 4)
            return true;
        //Diagonala TL -> BR
        if (this.checkTLDiagonal(i, j, this.Tiles[i][j].value) >= 4)
            return true;
        //Diagonala TR -> BL
        if (this.checkTRDiagonal(i, j, this.Tiles[i][j].value) >= 4)
            return true;

        //Ako nije ispunjen uvjet vraca false
        return false
    }

    //Horizontalna pobjeda
    checkHorizontal(i, j, value) {
        let points = 1;
        let k = j - 1;
        while (k >= 0 && this.Tiles[i][k].value == value) {
            k--;
            points++;
        }

        k = j + 1;
        while (k < 7 && this.Tiles[i][k].value == value) {
            k++;
            points++;
        }
        return points;
    }
    //Vertikalna pobjeda
    checkVertical(i, j, value) {     
        let points = 1;
        let k = i - 1;
        while (k >= 0 && this.Tiles[k][j].value == value) {
            k--;
            points++;
        }

        k = i + 1
        while (k <= 5 && this.Tiles[k][j].value == value) {
            k++;
            points++;
        }

        return points
    };

    //Diagonalna TL -> BR pobjeda
    checkTLDiagonal(i, j, value) {
        let points = 1;
        let k = i - 1;
        let l = j - 1;
        while (k >= 0 && l >= 0 && this.Tiles[k][l].value == value) {
            k--;
            l--;
            points++;

        }

        k = i + 1;
        l = j + 1;
        while (k <= 5 && l < 7 && this.Tiles[k][l].value == value) {
            k++;
            l++;
            points++;
        }

        return points
    }

    //Diagonalna BL -> TR pobjeda
    checkTRDiagonal(i, j, value) {
        let points = 1;
        let k = i - 1;
        let l = j + 1;
        while (k >= 0 && l < 7 && this.Tiles[k][l].value == value) {

            k--;
            l++;
            points++;

        }

        k = i + 1;
        l = j - 1;
        while (k <= 5 && l >= 0 && this.Tiles[k][l].value == value) {
            k++;
            l--;
            points++;
        }

        return points
    }

    // Ekran na kraju igre
    endScreen() {
        let string,fillValue;
        textSize(100);
        stroke(0);
        strokeWeight(7);

        if(this.turn < this.maxTurns){
            string= this.players[--this.turn % 2].color + " WINS";
            if (this.players[this.turn % 2].color == "RED") {
                fillValue = color(255, 0, 0);
            } else
                fillValue = color(0, 0, 255);
        }       
        else{
            string = "TIE";
            fillValue = color(255);
        }      
        fill(fillValue);
        text(string,this.w/2,this.h/2);
        strokeWeight(1);
        noStroke();
        noLoop();
    }

}
