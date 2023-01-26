window.addEventListener("load",function(){
    //Initializers
    let birdsKilled=0;              //Count Initialization
    let score=0;                    //Score Initialization
    //Getting The User Data..........................................
    //******User Name******  
    let userName=document.querySelectorAll(".userName");
    let name=JSON.parse(localStorage.getItem("nameValue"));
    for (let i = 0; i < userName.length; i++) {
        userName[i].innerHTML=name;
    }
    //******Handling Last Login******
    let prevUser=JSON.parse(this.localStorage.getItem(name));
    let prevData=this.document.querySelector(".prevData");
    if(prevUser!=null){
        prevData.innerHTML=`Your Last Score = ${prevUser.userScore} at ${prevUser.userDate}`
    }
    else{
        prevData.innerHTML=`It's Your First Time`
    }
    //******User Score****** 
    let scoreElement=document.querySelectorAll(".score");
    for(let i = 0; i < scoreElement.length; i++){
        scoreElement[i].innerHTML=score;
    }
    //******Killed Birds****** 
    let birdsKilledCount=document.querySelector(".birdsKilled");
    birdsKilledCount.innerHTML = birdsKilled;
    //Starting The Game..................................................
    //Selectors
    let startBtn=document.querySelector(".startBtn");
    let birdImgsArray=[
        `./images/Bird1.gif`,
        `./images/Bird2.gif`,
        `./images/Bird3.gif`
    ]
    //Functions to be Implemented after onclick event
    startBtn.addEventListener("click",function(){
        //Handling The Timer
        let time=timer();                                           //gameFunctions File Line 30
        if(time<=0){
            clearInterval(birdGenerationId);
            clearInterval(bombGenerationId);
        }
        //.............................................................................
        //Generating Birds  & Moving Them Right
        let birdGenerationId=setInterval(function(){
            let birdImage=createImage(birdImgsArray);               //gameFunctions File Line 109  
            moveRight(birdImage,0);                                 //gameFunctions File Line 128
            shootBird(birdImage);                                   //gameFunctions File Line 146  
        },1000);//End Of birdGenerationId
        //.............................................................................
        //Generating Bombs  & Moving Them Down
        let bombGenerationId=setInterval(function(){
            let bomb=createBombImage();                             //gameFunctions File Line 211 
            moveDown(bomb,0);                                       //gameFunctions File Line 221 
            shootBomb(bomb);                                        //gameFunctions File Line 232 
        },5000);//End of bombGenerationId
        //.............................................................................
    });//End of click Event
});//End Of Load
