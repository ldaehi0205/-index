const canvas = document.querySelector(".Canvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;//공 반지름
let x = canvas.width/2;//화면 가로갈이 절반(공x축 위치)
let y = canvas.height-50;//밑에서 50만큼 위(공 y축 위치)
let dx = 3;
let dy = -3;//공이 움직일때마다 움직이는 프레임, -2면 공이 위로 올라감

let paddleWidth = 70;
let paddleHeight = 15;
let paddleinit = (canvas.width - paddleWidth)/2;
let leftPress = false;
let rightPress = false;
let count = 0;

document.addEventListener('keydown',keyDownHandler);
document.addEventListener('keyup',keyUpHandler);

function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPress = true;
    }else if(e.keyCode == 37){
        leftPress = true;
    }
}
function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPress = false;
    }else if(e.keyCode == 37){
        leftPress = false;
    }
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleinit, 370, paddleWidth, paddleHeight);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}
function texts(){
    ctx.font = '30px serif';
    ctx.fillStyle = "white";
    ctx.fillText(count,500, 30);
}
function draw() {   
    ctx.clearRect(0, 0, canvas.width, canvas.height);//전 프레임을 지움
    ctx.beginPath();//그리기 시작
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);//(공의 시작 좌표, 0~360도)
    ctx.fillStyle = "yellow";//공 색깔
    ctx.fill();
    ctx.closePath();
    //drawBall();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //공의 x위치 + 2픽셀 > 화면 가로 - 반지름(오른쪽 벽 부딪힐 때) || 공의 x위치 + 2픽셀 < 반지름(왼쪽 벽 부딪힐때)
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }//벽에 튕기기 위한 함수
    
    x += dx; //
    y += dy;//2씩 움직인다.

    if(leftPress && paddleinit >0){
        paddleinit -= 5;
    }else if(rightPress && paddleinit < canvas.width-paddleWidth){
        paddleinit += 5;
    }
    if(y+ dy > 370 && x + dx > paddleinit - (paddleWidth/2) && x+dx < paddleinit + paddleWidth){
        dy = -dy;//paddle에 떨어졌을 때 반사
        count += 10;}
    if(y+dy > 390){//게임 끝
        alert(`당신의 점수는 ${count}점 입니다.`);
        console.log(y+dy);
        return;
    }
    console.log(x,y);
    console.log(paddleinit);
    drawPaddle();
    texts();
    requestAnimationFrame(draw);       
}
draw();
    // console.log(leftPress);
    // console.log(rightPress);
    //console.log(x,y);
    //console.log(paddleinit);
