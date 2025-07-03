const board=document.getElementById('board');
const statustext=document.getElementById('status');
const reset=document.getElementById('reset');
let currentplayer="X";
let gameActive=true;
let gameState=Array(9).fill("");
let ScoreX=0;
let ScoreO=0;
let winningconditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function createboard(){
    board.innerHTML="";
    for(let i=0;i<9;i++){
        const cell=document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index=i;
        cell.addEventListener('click',handleCellClick);
        board.appendChild(cell);
    }
    statustext.textContent=`Player ${currentplayer}'s turn`;
}
function updateScore(){
    document.getElementById('ScoreX').textContent=ScoreX;
    document.getElementById('ScoreO').textContent=ScoreO;
}
function handleCellClick(e){
    const cell=e.target;
    const index=cell.dataset.index;
    if(gameState[index]!=="" || !gameActive)return;
    gameState[index]=currentplayer;
    cell.textContent=currentplayer;
    const winningCombo=checkwin();
    if(winningCombo){
        statustext.textContent=`Player ${currentplayer} Won`;
        winningCombo.forEach(index => {
            document.querySelector(`.cell[data-index="${index}"]`)
            .classList.add('win');
        });
        gameActive=false;
        if(currentplayer==='X'){
            ScoreX++;
        }else{
            ScoreO++;
        }
        updateScore();
    }
    else if(gameState.every(cell=>cell!=="")){
        statustext.textContent="It's a Draw ! ";
        gameActive=false;
    }
    else{
        currentplayer=currentplayer==='X'?'O':'X';
        statustext.textContent=`Player ${currentplayer}'s turn`;
    }
}
function checkwin(){
    for(let condition of winningconditions){
        const[a,b,c]=condition;
        if(gameState[a] && gameState[a] === gameState[b] && gameState[a]===gameState[c]){
            return condition;      // returns winning combo
        }
    }  
    return null;   //if there are no winner 
}
reset.addEventListener('click',()=>{
    currentplayer='X';
    gameActive=true;
    gameState.fill("");
    createboard();
})
createboard();