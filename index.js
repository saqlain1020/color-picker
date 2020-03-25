function getRandomColorVal(){
    return Math.floor(Math.random()*256);
}
function renderCircles(){
    colorBox = document.querySelector(".colorBox");
    colorBox.innerHTML="";
    for(let i=0;i<6;i++){
        let tempR = getRandomColorVal();
        let tempG = getRandomColorVal();
        let tempB = getRandomColorVal();
        colorBox.insertAdjacentHTML('beforeend',`
        <div style="background-color: rgb(${tempR},${tempG},${tempB}); opacity: 0;" class="circle c${i+1}"></div>
        `);
    }
    let circles = Array.from(document.querySelectorAll(".circle"));
    circles.forEach(function(circle){
        setTimeout(function(){
            circle.style.opacity = 1;
        },100);
    });
    //Pick ans as rgb from any color circle
    randomCircleNo = Math.ceil(Math.random()*6);
    var circle = document.querySelector(`.c${randomCircleNo}`);
    ans = circle.style.backgroundColor;
    ans = ans.split(",");
    ans[0] = ans[0].replace("rgb(","");
    ans[2] = ans[2].replace(")","");
    //set ans heading
    var mainHeading = document.querySelector(".mainHeading");
    mainHeading.innerHTML = `<r>r</r><g>g</g><b>b</b>(<r>${ans[0]}</r>,<g>${ans[1]}</g>,<b>${ans[2]}</b>)`;
    ans = circle.style.backgroundColor;
    tempColor=1;
}
var colorBox = document.querySelector(".colorBox");
var ans;
var randomCircleNo;
var tempColor;
var winCounter=0;
var winDiv = document.querySelector(".winCounter");
renderCircles();
//listener
colorBox.addEventListener("click",function(event){
    let circle = event.target;
    tempColor = circle.style.backgroundColor;
    if(tempColor===ans){
        let circle;
        winCounter++;
        winDiv.innerHTML = `Wins:${winCounter}`; 
        for(let i=0;i<6;i++){
            if(i+1!=randomCircleNo)
                document.querySelector(`.c${i+1}`).style.opacity  = 0;
        }
        document.querySelector(".container").style.backgroundColor = ans;
        document.querySelector(".mainHeading").style.backgroundColor = ans;
    }else if(circle.className!=='colorBox'){
        circle.style.opacity=0;
    }
    
});
//Reset Press
function reset(){
    renderCircles();
}
let count=0;
let timer = document.querySelector(".timer");
function setTime(){
    setTimeout(function(){
        timer.innerHTML=count+"s";
        count++;
        setTime();
    },1000);
}
setTime();
timer.addEventListener('click',function(){
    count =0;
})