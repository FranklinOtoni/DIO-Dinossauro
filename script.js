const dino=document.querySelector('.dino');
const background=document.querySelector('.background')
const scoreh2=document.getElementById('score')
// const hscore=document.getElementById('hightscore')
let isJumping = false;
let position = 0;
let score=0;
//let hightscore;
console.log('oi')

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if (!isJumping){
            jump();
        }
    }
 }

function jump() {
    isJumping=true;
    let upInterval = setInterval(() => {
        if (position>=300){
            //parou
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(() => {
                if(position<=0){
                    isJumping=false;            
                    clearInterval(downInterval);
                }else{
                    //  isJumping=true;
                    position -=60;
                    dino.style.bottom = position+'px';                  
                    //console.log(isJumping)
                }
            }, 55);
        }else{
            //subindo
            position += 30;
            dino.style.bottom = position+'px';        
        }
    }, 50);
}

function createCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = 1000;
    let randomTime = Math.random()*8000;
    
    cactus.classList.add('cactus');
    cactus.style.left=1000+'px';
    background.appendChild(cactus);
    
    let leftInterval = setInterval(() => {
        if (cactusPosition <= 10){
            background.removeChild(cactus);
            clearInterval(leftInterval);
        } else if(cactusPosition>0 && cactusPosition<60 && position<60) {
            //perdeu
            clearInterval(leftInterval);
            document.body.innerHTML= '<h1 class="game-over">Fim de Jogo</h1>'
            hightscore = score
            hscore.innerHTML = 'Hight Score: ' + hightscore.toString();
        } else {
            cactusPosition -=10;
            cactus.style.left = cactusPosition + 'px';
            score++;
            // hightscore++;
            scoreh2.innerHTML = 'Score: ' + score.toString();
            // hscore.innerHTML = 'Hight Score: ' + hightscore.toString();
        }
    }, 80);
    //score=++
    
    setTimeout(createCactus, randomTime)
}
createCactus();
document.addEventListener('keypress',handleKeyUp);