var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.height = window.innerHeight;
if(window.innerWidth > 550){
    canvas.width = 550;
}else{
    canvas.width = window.innerWidth;    
}

var x = canvas.width / 2;
var y = canvas.height / 2;
var Cx = canvas.width / 2;
var Cy = canvas.height / 4;
var vx = 0;
var vy = 0;
var vxC = 0;
var vyC = 0;
var vmax = 20;
let friction = 0.01;
var radius = 30;
var pScore = 0;
var cScore = 0;
var mouse = {
        x : canvas.width / 2,
        y : 3 * canvas.height / 4
    }
var mousePx = [];
var mousePy = [];

window.addEventListener('mousemove', function(event){
    mouse.x = event.clientX - canvas.offsetLeft;
    mouse.y = event.clientY - canvas.offsetTop;
    mousePx.push(mouse.x);
    mousePy.push(mouse.y);
});
window.addEventListener("touchstart", move);
function move(event) {
    window.addEventListener("touchmove", function(event){
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        mousePx.push(mouse.x);
        mousePy.push(mouse.y);
    });
}


function play(){
    requestAnimationFrame(play);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // lefft bar
    c.beginPath();
    c.moveTo(2.5, 10);
    c.lineTo(2.5, canvas.height - 10);
    c.lineCap = "round";
    c.lineWidth = 5;
    c.strokeStyle = '#F2CC0F';
    c.stroke();
    c.closePath();

    // right bar
    c.beginPath();
    c.moveTo(canvas.width - 2.5, 10);
    c.lineTo(canvas.width - 2.5, canvas.height - 10);
    c.lineCap = "round";
    c.lineWidth = 5;
    c.strokeStyle = '#EE05F2';
    c.stroke();
    c.closePath();

    // top left bar
    c.beginPath();
    c.moveTo(10, 2.5);
    c.lineTo(canvas.width / 2 - 50, 2.5);
    c.lineCap = "round";
    c.lineWidth = 5;
    c.strokeStyle = '#F5564E';
    c.stroke();
    c.closePath();

    // top right bar
    c.beginPath();
    c.moveTo(canvas.width / 2 + 50, 2.5);
    c.lineTo(canvas.width - 10, 2.5);
    c.lineCap = "round";
    c.lineWidth = 5;
    c.strokeStyle = '#F5564E';
    c.stroke();
    c.closePath();
    
    // bottom left bar
    c.beginPath();
    c.moveTo(10, canvas.height - 2.5);
    c.lineTo(canvas.width / 2 - 50, canvas.height - 2.5);
    c.lineCap = "round";
    c.lineWidth = 5;
    c.strokeStyle = '#0CF25D';
    c.stroke();
    c.closePath();

    // bottom right bar
    c.beginPath();
    c.moveTo(canvas.width / 2 + 50, canvas.height - 2.5);
    c.lineTo(canvas.width - 10, canvas.height - 2.5);
    c.lineCap = "round";
    c.lineWidth = 5;
    c.strokeStyle = '#0CF25D';
    c.stroke();
    c.closePath();

    // middle bar
    c.beginPath();
    c.moveTo(30, canvas.height / 2);
    c.lineTo(canvas.width - 30, canvas.height / 2);
    c.lineCap = "round";
    c.lineWidth = 5;
    c.strokeStyle = '#5C73F2';
    c.stroke();
    c.closePath();

    // center arc
    c.beginPath();
    c.arc(canvas.width / 2, canvas.height / 2, 70, 0, Math.PI * 2, false);
    c.strokeStyle = '#5C73F2';
    c.stroke();
    c.closePath();

    // computer's arc
    c.beginPath();
    c.arc(canvas.width / 2, 0, 70, 0, Math.PI, false);
    c.strokeStyle = '#F5564E';
    c.stroke();
    c.closePath();

    // player's arc
    c.beginPath();
    c.arc(canvas.width / 2, canvas.height, 70, Math.PI, 0, false);
    c.strokeStyle = '#0CF25D';
    c.stroke();
    c.closePath();

    // computer's score
    c.beginPath();
    c.font = '70px Arial';
    c.strokeStyle = '#FFFFFF';
    c.lineWidth = '1';
    c.textAlign = "center";
    c.textBaseline = 'middle';
    c.strokeText(cScore, canvas.width - 50, canvas.height / 2 - 70);
    c.closePath();

    // player's score
    c.beginPath();
    c.font = '70px Arial';
    c.strokeStyle = '#FFFFFF';
    c.lineWidth = '1';
    c.textAlign = "center";
    c.textBaseline = 'middle';
    c.strokeText(pScore, canvas.width - 50, canvas.height / 2 + 80);
    c.closePath();



   

    

    // ball
    c.beginPath();
    c.arc(x, y, 20, 0, Math.PI * 2, false);
    c.strokeStyle = '#d0c462';
    c.lineWidth = 10;
    c.stroke();
    c.closePath();
    if(x - radius <= 10){
        x = radius + 10;
        vx = -vx;
    }else if(x + radius >= canvas.width - 10){
        x = canvas.width - radius - 10;
        vx = -vx;
    }else{
        vx = vx;
    }
    if(y - radius <= 10){
        y = radius + 10;
        vy = -vy;
    }else if(y + radius >= canvas.height - 10){
        y = canvas.height - radius - 10;
        vy = -vy;
    }else{
        vy = vy;
    }
    vx -= vx * friction;
    vy -= vy * friction;

    // player
    c.beginPath();
    if(mouse.x + 70 >= canvas.width){
        mouse.x = canvas.width - 70;
    }else if(mouse.x - 70 <= 0){
        mouse.x = 70;
    }else{
        mouse.x = mouse.x;
    }
    if(mouse.y + 70 >= canvas.height){
        mouse.y = canvas.height - 70;
    }else if(mouse.y - radius <= canvas.height / 2){
        mouse.y = canvas.height / 2 + radius;
    }else{
        mouse.y = mouse.y;
    } 
    
    c.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2, false);
    c.strokeStyle = '#76e370';
    c.lineWidth = 10;
    c.stroke();
    c.closePath();

    // computer
    c.beginPath();
    if(Cx + 70 >= canvas.width){
        Cx = canvas.width - 70;
        vxC = 0;
    }else if(Cx - 70 <= 0){
        Cx = 70;
        vxC = 0;
    }else{
        Cx = Cx;
    }
    if(Cy + 70 >= canvas.height / 2){
        Cy = canvas.height / 2 - 70;
    }else if(Cy - radius <= canvas.height / 12){
        Cy = canvas.height / 12 + radius;
    }else{
        Cy = Cy;
    }

    c.arc(Cx, Cy, radius, 0, Math.PI * 2, false);
    c.strokeStyle = '#F5564E';
    c.lineWidth = 10;
    c.stroke();
    c.closePath();

    if(Math.abs(Cx - x) > 30 && Cy - y < 0){
        if(Math.abs(vx) < 10){
            vxC = vx;
        }else if(vx < -10){
            vxC = -15;
        }else{
            vxC = 15;
        }
    }
    if(y <= canvas.height / 2){
        if(Cy < y){
            vyC = 5;
        }
        if(Math.abs(vx) < 1 && Math.abs(vy) < 1 && vx != 0 && vy != 0){
            vxC = (x - Cx) / 3;
            vyC = (y - Cy) / 3;
        }
    }else{
        vyC = -10; // computer goes backward if the ball isn't on computer's side
    }


    var PxD = mouse.x - x;
    var PyD = mouse.y - y;
    
    var CxD = Cx - x;
    var CyD = Cy - y;
    
    const pDistance = Math.sqrt(Math.pow(PxD, 2) + Math.pow(PyD, 2));
    const cDistance = Math.sqrt(Math.pow(CxD, 2) + Math.pow(CyD, 2));

    // hit velocity
    const vxh = (mousePx[mousePx.length - 1] - mousePx[mousePx.length - 2]);
    const vyh = (mousePy[mousePy.length - 1] - mousePy[mousePy.length - 2]);

    if(pDistance <= 70){
        hit(mouse.x, mouse.y, vxh, vyh);
    }
    if(cDistance <= 70){
        hit(Cx, Cy, vxC, vyC);
    }

    if(x > canvas.width / 2 - 40 && x < canvas.width / 2 + 40){
        score();
    }

    x += vx;
    y += vy;

    Cx += vxC;
    Cy += vyC;
}

window.onload = play;

function hit(X, Y, Vx, Vy){
    const Dx = x - X;
    const Dy = y - Y;
    const Dvx = Vx - vx;
    const Dvy = Vy - vy;
    if(Dx * Dvx + Dy * Dvy >= 0){ // condition to avoid accidental overlaping
        const thetaR = -Math.atan((Y - y) / (X - x)); // hit angle
        // relative hit velocity with the hit angle
        const vyr = vx * Math.sin(thetaR) + vy * Math.sin(Math.PI / 2 + thetaR);
        let vxr;
        if(Math.abs(Vx) <= Math.abs(vx) && Math.abs(Vy) <= Math.abs(vy)){
            vxr = 2 * ((-vx + 2 * Vx) * Math.cos(thetaR) + (-vy + 2 * Vy)  * Math.cos(Math.PI / 2 + thetaR));
        }else{
            vxr = 2 * (Vx * Math.cos(thetaR) + Vy  * Math.cos(Math.PI / 2 + thetaR));
        }
        // original angle of hit
        vx = vxr * Math.cos(-thetaR) + vyr * Math.cos(Math.PI / 2 - thetaR);
        vy = vxr * Math.sin(-thetaR) + vyr * Math.sin(Math.PI / 2 - thetaR);
        if (vx > vmax) {
            vx = vmax;
        }else if(vx < -vmax){
            vx = - vmax;
        }
        if (vy > vmax) {
            vy = vmax;
        }else if (vy < -vmax) {
            vy = -vmax;
        }
    }
}

function score(){
    if(y <= 70){
        vx = 0;
        vy = 0;
        pScore++;
        console.log("Player scored");
        x = canvas.width / 2;
        y = canvas.height / 2 - 70;
        Cx = canvas.width / 2;
        Cy = canvas.height / 4;
    }
    if(y >= canvas.height - 70){
        vx = 0;
        vy = 0;
        cScore++;
        console.log("Computer scored");
        console.log(cScore);
        x = canvas.width / 2;
        y = canvas.height / 2 + 70;
    }
}