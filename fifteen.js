
"use strict";
//Extra feature implemented, Transitions/Animation
// transition feature should be graded

var TOP=0, LEFT=0;


window.onload=setTilePositions;


function setTilePositions(){//This sets up the board puzzlepieces and adds a onclick listener to the shuffle button 
    //var gameEnd=setTilePositions();//attempt to do game win extra feature
    var shufflebtt=document.getElementById("shufflebutton");
    shufflebtt.onclick=function(){shuffle();};
    
	
	var puzzlearea=document.getElementById("puzzlearea");
 	var c=puzzlearea.children;
 	
	for (var i=0; i < c.length; i++) {
        c[i].classList.add("puzzlepiece");
		c[i].style.left=LEFT+"px";
        c[i].style.top=TOP+"px";
        // c[i].style.color="white"; 
        c[i].style.backgroundPosition="-"+ c[i].style.left + " " + "-" +c[i].style.top;
        LEFT+=100;
        //Top +=100;
        if(LEFT > 300){
            TOP+=100;
            LEFT=0;
        }
        c[i].onclick=function(){
            if (isMovable(this.style.left,this.style.top)){
                var Location=switchTiles(this.style.left,this.style.top);
                this.style.top=Location[1];
                this.style.left=Location[0];
                this.style.transition = "all 500ms";
            }else{
                console.log("test");
            }
        };

        c[i].onmouseover=function(){
            // console.log("testing");
            if (isMovable(this.style.left,this.style.top)){
                this.classList.add("movablepiece");
            }
        //     else{
        //         this.classList.remove("moveablepiece");
        //     }
        };

        c[i].onmouseout=function(){
            this.classList.remove("movablepiece");
        };



        //end of for loop bracket 
        }
      
}


function switchTiles(LPos, TPos){// get current tile coordinates and store in temp value, and return new value which is the current empty tile , and set the empty tile  values to old tile val
    var LeftOLD=LPos;
    var TopOLD=TPos;
    LPos=LEFT+"px";
    TPos=TOP+"px";
    LEFT=parseInt(LeftOLD,10);
    TOP=parseInt(TopOLD,10);
    return [LPos,TPos];
}


function isMovable(LPos,TPos){// This function checks if a tile with the requested coordinates is movable and returns true if it is , and false if it isnt 
//  if left plus 100 equal 300 and or top plus 100 equal 300 then return true, and so on
    var TopPos=parseInt(TPos,10);
    var LeftPos=parseInt(LPos,10);
    console.log(LPos);// These log the  position of the tiles in question
    console.log(TPos);

    if(LeftPos+100 === LEFT  && TopPos=== TOP || LeftPos-100 === LEFT && TopPos=== TOP || TopPos+100 === TOP && LeftPos=== LEFT ||  TopPos-100 === TOP && LeftPos=== LEFT){
        return true;
    }else {
            return false;
        }

}


function shuffle(){ // This function when called, is used to shuffle the board pieces , but stays in a solvable state
//choose nmumber from list of isMovable tiles and move them like the onlcik function a random amounf of times, in a reasonable amount of time.
    var puzzlearea=document.getElementById("puzzlearea");
    
    var c=puzzlearea.children;
    Movelist=[];
    
    var Movelist = [];
    for(var a = 0; a < 50; a++){
        for(var b = 0; b < c.length; b++){
            if(isMovable(c[b].style.left, c[b].style.top)){
                Movelist.push([c[b],b]);
            }
        }
        if(Movelist.length != 0){
            var val = Math.floor(Math.random() * Movelist.length);
            var lst = switchTiles(Movelist[val][0].style.left, Movelist[val][0].style.top);
            Movelist[val][0].style.left = lst[0];
            Movelist[val][0].style.top = lst[1];
        }  
        Movelist = [];
    }
}



