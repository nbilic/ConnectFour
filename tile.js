class Tile{
    constructor(w,h,x,y,i,j){

        //Velicina i pozicija pojedinacnog Tile-a
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;

        this.hoverColor=210; // Efekt da se vidi u koji stupac ce ici krug
        this.value; // Da li je igra Crveni ili Plavi igrac
        this.clicked = false;
        this.color;   // Boja kruga
    }

    // Prikaz individualnog Tile-a, stroke funkcije su dio p5.js librarya vezane uz graficki prikaz objekata
    showTile(){
        fill(this.hoverColor); 

        stroke(0);
        strokeWeight(2);

        rect(this.x,this.y,this.w,this.h);
        
        if(this.clicked == true){
            fill(this.color);
            circle(this.x+this.w/2,this.y+this.h/2,this.h/2*1.5)
        }  
        noStroke();
    }


    //Odredi koji je igrac kliknuo na Tile
    setTile(value){
        if(value == "RED")
            this.color = color(255,50,50);
        else
            this.color = color(50,150,205);
        
        this.value = value;
        this.clicked = true;
    }

    //Da li mis prelazi preko stupca
    checkHover(){
            if(
                mouseX > this.x && 
                mouseX < this.x + this.w
            )
                this.hover();
            else
                this.reset();         
        }
        

    hover(){
        this.hoverColor = 210;
    }
    reset(){
        this.hoverColor= 250;
    }
}
