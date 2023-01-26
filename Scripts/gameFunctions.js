//Selectors........................................................................
let welcomeAlert=document.querySelector(".alertDiv");
let darkBackground=document.querySelector(".darkBackground");
let headings=document.querySelector(".Headings");
let game=document.querySelector(".gameRunning");
let birdsContainer=document.querySelector(".birdsContainer");
let win=document.querySelector(".winDiv");
let lose=document.querySelector(".lossDiv");
let target=document.querySelector(".targetImg");
let birdsKilledCount=document.querySelector(".birdsKilled");
let scoreElement=document.querySelectorAll(".score");
let timerElement=document.querySelector(".timer");
let boomImg=document.querySelector(".bombAfter");
let bloodSpotImg=document.querySelector(".bloodSpot");
let prevLogin=document.querySelector(".previousLogin");
//Initializer.......................................................................
let sec = 60;                   //Timer Initialization
let birdsKilled=0;              //Count Initialization
let score=0;                    //Score Initialization
//Sounds Selector...................................................................
let whiteBirdSound=new Audio("./sounds/whiteBird.wav");
let blackBirdSound=new Audio("./sounds/blackBirdSound.wav")
let blueBirdSound=new Audio("./sounds/blueBirdSound.wav");
let bombExplosionSound=new Audio("./sounds/BombExplosion.mp3");
let gameRunningSound=new Audio("./sounds/gameRunning.mp3");
let lossSound=new Audio("./sounds/LossSoundEffect.mp3");
let winSound=new Audio("./sounds/WinSound.wav");
//Function to start the game........................................................
//******Handling Timer Function******
function timer (){
    let timerId=setInterval(function(){
        timerElement.innerHTML="00:"+sec;
        sec --;
        startGame();                         //Function in Line 47
        if(sec<10){
            timerElement.innerHTML="00:0"+sec;
        }
        if(sec<=0){
            clearInterval(timerId);
            endGame();                       //Function in Line 61
            
        }
       return sec;
    },1000)//Each 1 second
}
//******Start Game Function******
function startGame(){
    welcomeAlert.style.display="none";
    darkBackground.style.display="none";
    headings.style.display="block";
    game.style.display="block";
    //playing The Game Audio
    gameRunningSound.play();
    //Changing the cursor shape
    window.addEventListener("mousemove",function(event){
        target.style.left=event.pageX+"px";
        target.style.top=event.pageY+"px";
    })
}
//******End Game Function******
function endGame(){
    //Setting User Data in Local Storage
    let finalScore=score;
    let lastDate=(new Date()).toLocaleString();
    let userName=JSON.parse(localStorage.getItem("nameValue"));
    let userData={
        userScore:finalScore,
        userDate:lastDate
    }
    localStorage.setItem(`${userName}`,JSON.stringify(userData));
    //Handling Display Options
    darkBackground.style.display="block";
    headings.style.display="none";
    game.style.display="none";
    //Stopping The Game Audio
    gameRunningSound.pause();
    //Validating The Score
    scoreValidation();                              //Function in Line 81
}
//******Score Validation******
function scoreValidation(){
    if(score>50 && birdsKilled>=25){
        winSound.play();
        win.style.display="block";
        let restartBtn=creatingRestartBtn(win);     //Function in Line 100
        restartBtn.addEventListener("click",function(){
            location.reload();
        })
    }
    else if(score<=50 || birdsKilled<25){
        lossSound.play();
        lose.style.display="block";
        let restartBtn=creatingRestartBtn(lose);    //Function in Line 100
        restartBtn.addEventListener("click",function(){
            location.reload();
        })
    }
}
//******Creating Restart Button******
function creatingRestartBtn (ele){
    let restartBtn=document.createElement("button");
    restartBtn.setAttribute("class","restartBtn");
    restartBtn.innerHTML="Play Again"
    ele.appendChild(restartBtn);
   return restartBtn;
}
//Handling The Birds..........................................................
//******Create Random Image From an Array******
function createImage(array=[]){
    let birdElement=document.createElement("img");
    let randomNumber=Math.floor(Math.random()*array.length);
    birdElement.src=array[randomNumber];
    if(randomNumber==0){
        birdElement.classList.add("whiteBird");
    }
    else if(randomNumber==1){
        birdElement.classList.add("blackBird");
    }
    else if(randomNumber==2){
        birdElement.classList.add("blueBird");
    }
    birdsContainer.appendChild(birdElement);
    let imgTop=Math.floor(Math.random()*300);
    birdElement.style.top=imgTop+"px";
    return birdElement;
}
//******Moving Right Function******
function moveRight (img,left,killed){
    let id = setInterval(function(){
        left += 5;
        img.style.left=left+"px";
        if (left > innerWidth || killed)
        {
            img.remove();
            clearInterval(id);
        }
        else if(killed)
        {
            birdsContainer.removeChild(img);
            clearInterval(id);
        }   
    },30);//End of Set Interval
}
//******Shooting Bird Function****** 
let killed;         //Indicator to the killed bird
function shootBird(img) {
    killed = 0;
    img.onclick=function(event){
        birdsContainer.removeChild(img);
        showBloodSpot();                            //Function in Line 159
        birdsKilledCounter(event);                  //Function in Line 170
        scoreBirdsCounter(event);                   //Function in Line 177
        soundPlay(event);                           //Function in Line 198
        killed = 1;
    };//End of onClick Event
    return killed;
}
//******Showing Blood Spot******
function showBloodSpot(){
    bloodSpotImg.style.display="block";
    window.addEventListener("mousemove",function(event){
        bloodSpotImg.style.left=event.pageX+"px";
        bloodSpotImg.style.top=event.pageY+"px";
    })
    setTimeout(function(){
        bloodSpotImg.style.display="none";
    },500)
}
//******Count Function******
function birdsKilledCounter(event){
    if(event.target.className=="whiteBird"||event.target.className=="blackBird"){
        birdsKilled ++;
        birdsKilledCount.innerHTML = birdsKilled;
    }
}
//******Score Function******
function scoreBirdsCounter(event){
    if(event.target.className=="whiteBird"){
        score += 5;
        for(let i = 0; i < scoreElement.length; i++){
            scoreElement[i].innerHTML=score;
        }
    }
    else if(event.target.className=="blackBird"){
        score += 10;
        for(let i = 0; i < scoreElement.length; i++){
            scoreElement[i].innerHTML=score;
        }
    }
    else{
        score -= 10;
        for(let i = 0; i < scoreElement.length; i++){
            scoreElement[i].innerHTML=score;
        }
    }
}
//******Birds Sound Handling******
function soundPlay(event){
    if(event.target.className=="whiteBird"){
        whiteBirdSound.play();
    }
    else if(event.target.className=="blackBird"){
        blackBirdSound.play();
    }
    else{
        blueBirdSound.play();
    }
}
//Handling The Bomb..........................................................
//******Create an Image Function******
function createBombImage(){
    let img =document.createElement("img");
    img.src="./images/bomb.png";
    img.setAttribute("class","bomb");
    game.appendChild(img);
    let imgLeft=Math.floor(Math.random()*innerWidth);
    img.style.left=imgLeft+"px";
    return img;
}
//******Moving Down Function******
function moveDown (img,top){
    let id = setInterval(function(){
        top += 5;
        img.style.top=top+"px";
        if(top>innerHeight){
            clearInterval(id);
            game.removeChild(img);
        }
    },30);//End of Set Interval
}
//******Shooting The Bomb Function******
function shootBomb (img){
    img.onclick=function(){
        bombExplosionSound.play();
        img.style.display="none";
        showBoom();                                 //Function in Line 241
        scoreHandling();                            //Function in Line 252
    }//End of onClick Event
}
//******Showing The Boom Image******
function showBoom() {
    boomImg.style.display="block";
    window.addEventListener("mousemove",function(event){
        boomImg.style.left=event.pageX+"px";
        boomImg.style.top=event.pageY+"px";
    })
    setTimeout(function(){
        boomImg.style.display="none";
    },800)
}
//******Handling The Score Of Surrounding Birds****** 
function scoreHandling(){
    this.document.addEventListener("click", function (event) {
        if (event.target.className == "bomb") {
            let currentBirds = document.querySelectorAll(".birdsContainer img");
            for (let i = 0; i < currentBirds.length; i++) {
                if (birdInBoundaries(event.target, currentBirds[i], 200)){                   //Function In Line 293
                    if (currentBirds[i].className === "whiteBird"){
                        //Handling The Score
                        score += 5;
                        for (let i = 0; i < scoreElement.length; i++){
                            scoreElement[i].innerHTML=score;
                        }
                        //Handling The Count
                        birdsKilled++;
                        birdsKilledCount.innerHTML = birdsKilled;
                    }
                    else if (currentBirds[i].className === "blackBird"){
                        //Handling The Score
                        score += 10;
                        for (let i = 0; i < scoreElement.length; i++){
                            scoreElement[i].innerHTML=score;
                        }
                        //Handling The Count
                        birdsKilled++;
                        birdsKilledCount.innerHTML = birdsKilled;
                    }
                    else if (currentBirds[i].className=="blueBird") {
                        //Handling The Score
                        score -= 10;
                        for(let i = 0; i < scoreElement.length; i++){
                            scoreElement[i].innerHTML=score;
                        }
                        //BlueBirds  are not counted
                    }
                    currentBirds[i].remove();
                }
            }
        }
    });//End of click Event
}
//*****Checking The birds in Range******
function birdInBoundaries(bomb, bird, range)
{
    //Setting Boundaries
    let inRange = false;
    let bombLeft = parseInt(bomb.style.left);
    let bombTop = parseInt(bomb.style.top);
    let birdLeft = parseInt(bird.style.left);
    let birdTop = parseInt(bird.style.top);
    //Condition
    if (birdTop > (bombTop-range)&& 
        birdTop < (bombTop+bomb.height+range)&&
        (birdLeft+bird.width) > (bombLeft-range)&& 
        birdLeft < (bombLeft+range))
        { inRange = true;}
    return inRange;
}