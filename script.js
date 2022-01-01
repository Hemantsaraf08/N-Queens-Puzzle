let allsquares = document.querySelectorAll(".dynamic-box");
let allsquaresArray= Array.prototype.slice.call(allsquares);
let solvedmessage=document.querySelector(".solved-message");
let resetBtn=document.querySelector(".reset");
let impossibleBtn=document.querySelector(".impossible");

resetBtn.addEventListener("click", ()=>location.reload());
impossibleBtn.addEventListener("click", function(){
    if (confirm(`It is possible, please try again
Press OK to see 1 of the Solution, Press Cancel to try`)) {
                    chessboard.forEach(arr=>arr.forEach(ele=>{if(ele!==-1) chessplayBot(ele)}))
                    botSolver(); 
    } 
    // alert(`It's possible, try again or see the bot solve it here http://tiny.cc/pxwwtz`);
    
})


//build a matrix first;
let chessboard=[];
let row0=[];
let QueenCount=0;
let targetNoQueen=Math.sqrt(allsquares.length);
for(let i=0;i<Math.sqrt(allsquares.length);i++){
    row0.push(-1);
}
for(let i=0;i<Math.sqrt(allsquares.length);i++){
    chessboard.push([...row0]);
}
for (let i = 0; i < allsquares.length; i++) {
    //call chessplay function for every click on chess board
    allsquares[i].addEventListener("click", chessplay);
}

function chessplay(e) {
    console.log(e)
    console.log(QueenCount);
    let i=allsquaresArray.indexOf(e.currentTarget);
    console.log(i)
    
    let img = allsquares[i].previousElementSibling;
    if (img.getAttribute("style") === "display:none") {
        QueenCount+=1;
        if(QueenCount==targetNoQueen){
            solvedmessage.setAttribute("style", "display:true");
        }
        img.setAttribute("style", "display:true");
        let row = allsquares[i].getAttribute("i")
        row=parseInt(row);
        let col = allsquares[i].getAttribute("j")
        col=parseInt(col);
        shade(allsquares, chessboard, row, col,i)     //this function also removes event listeners
    } else {
        QueenCount-=1;
        img.setAttribute("style", "display:none")
        let row = allsquares[i].getAttribute("i")
        row=parseInt(row);
        let col = allsquares[i].getAttribute("j")
        col=parseInt(col);
        unshade(allsquares, chessboard, row, col, i)   //this function also adds event listeners
    }
}

function shade(allsquares, chessboard, row, col, idx) {
    chessboard[row][col]=idx;   //place self on chessboard;

    //to shade principal-diagonal and off-diagonal elements we use equation of st. line;
    //y=mx+c, for principal diagonal m=1 and for off-diagonal m=-1;
    //therefore we get c=y-x i.e. c=row-col for principal-diagonal, and c=y+x i.e. c=row+col for off-diagonal
    let prindiagC=row-col;
    let offdiagC=row+col;
    allsquares.forEach(function (ele) {
        let i=ele.getAttribute("i");
        i=parseInt(i);
        let j=ele.getAttribute("j");
        j=parseInt(j);

        //covering all 8 direction in which queen can attack
        
        if ((j=== col && i!== row&&ele.getAttribute("style")=="opacity:0")) {
            //for col; i.e. vertical check
            ele.setAttribute("style", "opacity:0.8");
            ele.removeEventListener("click", chessplay);
            // chessboard[i][j]=idx;
        }else if((i===row&&j!==col&&ele.getAttribute("style")=="opacity:0")){
            //horizontal check
            ele.setAttribute("style", "opacity:0.8");
            ele.removeEventListener("click", chessplay);
            // chessboard[i][j]=idx;
        }else if((i-j)===prindiagC&&i!==row&&j!==col&&ele.getAttribute("style")=="opacity:0"){
            //principal diagonal
            ele.setAttribute("style", "opacity:0.8");
            ele.removeEventListener("click", chessplay);
            // chessboard[i][j]=idx;
        }else if((i+j)===offdiagC&&i!==row&&j!==col&&ele.getAttribute("style")=="opacity:0"){
            //off-diagonal
            ele.setAttribute("style", "opacity:0.8");
            ele.removeEventListener("click", chessplay);
            // chessboard[i][j]=idx;
        }
    })
    console.log(chessboard);
}

function unshade(allsquares,chessboard, row,col, idx){
    chessboard[row][col]=-1;    //remove self from chess board;

    let prindiagC=row-col;
    let offdiagC=row+col;
    allsquares.forEach(function (ele) {
        let i=ele.getAttribute("i");
        i=parseInt(i);
        let j=ele.getAttribute("j");
        j=parseInt(j);

        //covering all 8 direction in which queen can attack
        
        if ((j=== col && i!== row)) {
            //for col; i.e. vertical check
            ele.setAttribute("style", "opacity:0");
            ele.addEventListener("click", chessplay);
        }else if((i===row&&j!==col)){
            //horizontal check
            ele.setAttribute("style", "opacity:0");
            ele.addEventListener("click", chessplay);
        }else if((i-j)===prindiagC&&i!==row&&j!==col){
            //principal diagonal
            ele.setAttribute("style", "opacity:0");
            ele.addEventListener("click", chessplay);
        }else if((i+j)===offdiagC&&i!==row&&j!==col){
            //off-diagonal
            ele.setAttribute("style", "opacity:0");
            ele.addEventListener("click", chessplay);
        }
    })
    for(let i=0;i<chessboard.length;i++){
        for(let j=0;j<chessboard.length;j++){
            if(chessboard[i][j]>-1){
                let targetEleInd=(i*chessboard.length) + j;
                shade(allsquares, chessboard, i, j, targetEleInd);
                // let ele=allsquares[targetEleInd];
                // ele.setAttribute("style", "opacity:0");
                // ele.addEventListener("click", chessplay);
                // chessboard[i][j]=-1;
            }
        }
    }
}

function botSolver(){
    QueenCount=0;
    let solved=false;
    let chessB=[];  //making chessB matrix below;
    let r0=[];
    const QueenC=8;
    for(let i=0;i<QueenC;i++){
        r0.push(0);
    }
    for(let i=0;i<QueenC;i++){
        chessB.push([...r0]);
    }

    let noOfIteration=0;

    function solveBT(chessB, r){
        noOfIteration+=1;
        if(r==8){
            solved=true;
              //taking a snapshot of solved puzzle
            //   await tab.screenshot({ path: './BotSolution.png' });
            return;
        }
        for(let c=0;c<QueenC;c++){
            let booleanans=isSafe(chessB, r, c);
            if(booleanans){
                chessB[r][c]=1; //click;
                let idxtoclick=(r*QueenC) + c;
                chessplayBot(idxtoclick);
                solveBT(chessB, r+1);
                if(solved) return;
                chessB[r][c]=0; //unclick & display backtracking and undisplay it;
                // displaymes(); //display
                // setTimeout(displaymes, 1000); //undisplay
                chessplayBot(idxtoclick); //unclicking
                console.log(`Backtracking for --> row ${r+1} and  col ${c+1}`);
            }
        }
    }
    //solving puzzle using simple backtracking algo, in fn. solveBT
    solveBT(chessB, 0); //first arg is chessBoard matrix, second arg is row number
    console.log(`Puzzle solved in ${noOfIteration} recursive call`);
    
}

//this function is called inside botSolver


//below fn. is called inside solveBT
function isSafe(chessB, r, c){
    for(let i=r-1, j=c;i>=0;i--){
        if(chessB[i][j]==1) return false;
    }
    for(let i=r-1, j=c-1;i>=0&&j>=0;i--, j--){
        if(chessB[i][j]==1) return false;
    }
    for(let i=r-1, j=c+1;i>=0&&j<8;i--,j++){
        if(chessB[i][j]==1) return false;
    }
    return true;
}
function chessplayBot(idx) {

    
    let img = allsquares[idx].previousElementSibling;
    if (img.getAttribute("style") === "display:none") {
        QueenCount+=1;
        if(QueenCount==targetNoQueen){
            solvedmessage.setAttribute("style", "display:true");
            
        }
        img.setAttribute("style", "display:true");
        let row = allsquares[idx].getAttribute("i")
        row=parseInt(row);
        let col = allsquares[idx].getAttribute("j")
        col=parseInt(col);
        shade(allsquares, chessboard, row, col,idx)     //this function also removes event listeners
    } else {
        QueenCount-=1;
        img.setAttribute("style", "display:none")
        let row = allsquares[idx].getAttribute("i")
        row=parseInt(row);
        let col = allsquares[idx].getAttribute("j")
        col=parseInt(col);
        unshade(allsquares, chessboard, row, col, idx)   //this function also adds event listeners
    }
}
