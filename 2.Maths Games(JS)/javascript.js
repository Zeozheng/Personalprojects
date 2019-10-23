/*eslint-env browser*/
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset button
document.getElementById("startreset").onclick = function(){
    //if we are playing
    if(playing == true){
        //reload page
        location.reload();
    }
    else{//if we are not playing
        //change mode to playing
        playing = true;
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
      //show countdown box      
//    document.getElementById("timeremaining").style.display = "block";
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //hide gameover
        hide("gameOver");
        //change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";
        //start countdown
        startCountdown();
        //generate new Q&A
        generateQA();
    }
}
for(var i = 1;i<5;i++){
//Clicking on the answer box
document.getElementById("box"+i).onclick = function(){
    //checking if we are playing
    if(playing == true){//yes
        if(this.innerHTML == correctAnswer){//correct
            
            //score increase
            score ++;
            document.getElementById("scorevalue").innerHTML = score;
            
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
             setTimeout(function(){
                 hide("correct");
             },1000);
            //generate new QA
            generateQA();
        }else{
            hide("correct");
            show("wrong");
             setTimeout(function(){
                 hide("wrong");
             },1000);
        }
       }
}
}
            

//if we click on answer box
    //if we are palying
        //correct?
            //yes
                //increase score
                //show correct box for 1 sec
                //generate new Q&A
            //no
                //show try again box for 1 sec

//functions
//start counter
 function startCountdown(){
     action = setInterval(function(){
         timeremaining -= 1;
         document.getElementById("timeremainingvalue").innerHTML = timeremaining;
         
         if(timeremaining == 0){//game over
             stopCountdown();
             
             show("gameOver");
//             document.getElementById("gameOver").style.display = "block"; 
             document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>You score is "+ score +".</p>";
             
             hide("timeremaining");
             hide("correct");
             hide("wrong");
             playing = false;
             document.getElementById("startreset").innerHTML = "Start Game";
         }
     },1000)
 }
//stop counter
 function stopCountdown(){
    clearInterval(action);
}
//hide an element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}
//show an element
function show(Id){
    document.getElementById(Id).style.display = "block";
}
//generate question and myltiple answers
function generateQA(){
    var x = 1 + Math.round(Math.random()*9);
    var y = 1 + Math.round(Math.random()*9);
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "×" + y;
    var correctposition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+ correctposition).innerHTML = correctAnswer;//fill one box with correct answer
    
    var answers = [correctAnswer];
    
    //fill other boxes with wrong answers
    for(var i = 1;i<5;i++){
        if (i != correctposition){
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(Math.random()*9)) *(1 + Math.round(Math.random()*9));
                
            }while(answers.indexOf(wrongAnswer)>-1)
                document.getElementById("box" +i).innerHTML = wrongAnswer; 
            answers.push(wrongAnswer);
            
        }
    }
}
                