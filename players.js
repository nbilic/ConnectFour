class Player{
    constructor(color,cursor){
        this.color = color;
        this.score = 0;
        this.cursor = cursor;
    }

    incrementScore(){
        this.score++;
    }
}