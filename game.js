


function startGame(){
    GameArea.start();
    //calls the start method of GameArea
    checkifkeypressed();

    localStorage.setItem('alertedgameover','no')

    

    

    Player1= new component(30,30,"blue",10,120);
    Obstacle1= new component(10,200,'#3E1E0A',300,120);
    //creates a new instance of component with the specified parameters


}



//"this" refers to the highest thing 
//for example Player1.width if Player1 is the thing that called component


function component(width, height, color, x, y){
    //console.log(this)

    this.width = width; 
    this.height = height;
    this.x = x
    this.y = y
    //"this" refers to the parent function component
    //this.x means that it is setting component.x to the parameter x
    //component.x transfers its value to player1.x
    
   
    GameArea.a.fillStyle = color;
    GameArea.a.fillRect(this.x,this.y,this.width,this.height)

    this.update = function(){
        GameArea.a.fillStyle = color;
        GameArea.a.fillRect(this.x,this.y,this.width,this.height);
    }
    

    /*updateGameArea is called every 20 millisecond
    updateGameArea runs Player1.update
    Player1.update runs this.update replacing "this" with Player1
    this.update redraws Player1 rectangle every 20 milliseconds

    */



   

 
   
   this.newPos = function(){
      this.x = this.x + this.speedX
      this.y = this.y + this.speedY

    this.crashWith = function(otherobj){
        var myleft= this.x;
        var myright=this.x+ (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
       //console.log('player1:',myleft,myright,mytop,mybottom)
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
       // console.log('obstacle1:',otherleft,otherright,othertop,otherbottom)

        var crash = true;

        if ( (mybottom < othertop) ||(mytop > otherbottom) ||(myright < otherleft) ||(myleft > otherright) ){

            crash = false;
        }
        //console.log(crash)
        return crash;

    }


   }

    

}// end component




var GameArea = {

    canvas : document.createElement("canvas"),
    start : function(){
        GameArea.canvas.width = 480;
        GameArea.canvas.height = 270;
        GameArea.a = GameArea.canvas.getContext("2d");
        GameArea.a.fillStyle = "#3D4366"
        GameArea.a.fillRect(0,0,GameArea.canvas.width,GameArea.canvas.height);
        //a can be replaced by anything
        //a is just a filler variable for holding canvas.getcontext


        document.body.insertBefore(GameArea.canvas, document.body.lastChild);
        
        
        /* 
           this line takes the body of the html
           and inserts GameArea.canvas as a node object 
           before document.body.lastChild

            document.body.lastChild is the last child object
           that appears in the body of the html
        */
    
        //window refers to the browser
        //the code below checks if the keypressed
        //or not and assigns a keycode
     
       



        this.interval = setInterval(updateGameArea,20)
        //setInterval calls updateGameArea every 20 ms
        //setInterval works even if declared in a variable
        //var interval is used by GameArea.stop


    },

    //end of start

    clear: function(){
        GameArea.a.clearRect(0,0,GameArea.canvas.width,GameArea.canvas.height);
        GameArea.a.fillStyle = "#3D4366"
        GameArea.a.fillRect(0,0,GameArea.canvas.width,GameArea.canvas.height);
        // first 2 parameters of clearRect specify the
        // the x and y coordinates of the upper left corner
        // of the rectangle to clear
    },

   

    stop: function(){
        clearInterval(this.interval);
        var alertedgameover = localStorage.getItem('alertedgameover') || '';
        if (alertedgameover != 'yes'){
            alert('Game Over...');
            localStorage.setItem('alertedgameover','yes');
        }
    }
    
   
 



}


function checkifkeypressed(){
window.addEventListener('keydown',checkkeydown)

function checkkeydown(e){

    //this line checks if keyspressed exists and assigns it to keyspressed
    //if keypressed does not exist it assigns it to an empty array

    keyspressed = (keyspressed || []);
    keyspressed[e.keyCode] = true;
    

}

window.addEventListener('keyup',checkkeyup)

function checkkeyup(e){
    keyspressed = (keyspressed || []);

    keyspressed[e.keyCode] = false;
    
}

}


function updateGameArea() {
GameArea.clear();


Player1.speedX =0;
Player1.speedY =0;
if (keyspressed[37] == true){
    Player1.speedX = -1
}
if (keyspressed[39] == true){
    Player1.speedX = 1
}
if (keyspressed[38] == true){
    Player1.speedY = -1
}
if (keyspressed[40] == true){
    Player1.speedY = 1
}

Player1.newPos();
Player1.update(); 
//this calls component.update for player1 
//inside the component function it replaces this.update with player1.update
Obstacle1.update();

crashed=Player1.crashWith(Obstacle1)
if (crashed == true){
    GameArea.stop()
}
//console.log(Player1crashed)


    
    



}







keyspressed = []


startGame();