//Selectors
let goBtn=document.querySelector(".goButton");
let errorMsg=document.querySelector(".ErrorMsg");
let nameInput=document.querySelector(".nameInput")
//Handling the Go Button 
goBtn.onclick=function(){
    let name = document.querySelector(".nameInput").value ;
    let modifiedName=toPascalCase(name)
    localStorage.setItem("nameValue",JSON.stringify(modifiedName));
}
let nameValidation=(name)=>{
    insertingUserName(name);
    toPascalCase(name);
}
//Name validations Functions.........................................................................
//******To Pascal Case******
const toPascalCase=(name)=>{
    let words=name.toLowerCase().split(" ");
    for(let i=0;i<words.length;i++){
        words[i]=words[i][0].toUpperCase()+words[i].substr(1);
    }
    return words.join(" ")
}
//******Can't be Empty******
function insertingUserName(name){
    if(name==''){
        errorMsg.style.display="block";
    }
}
//******Can't be Numbers******
nameInput.onkeypress=function(event){
    if(!isNaN(event.key)){
        event.preventDefault();
    }
}