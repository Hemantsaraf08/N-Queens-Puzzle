let allsquares = document.querySelectorAll(".dynamic-box");
let allsquaresArray= Array.prototype.slice.call(allsquares);
let solvedmessage=document.querySelector(".solved-message");
let resetBtn=document.querySelector(".reset");
let impossibleBtn=document.querySelector(".impossible");

resetBtn.addEventListener("click", ()=>location.reload());
impossibleBtn.addEventListener("click", function(){
    alert(`It's possible, try again or see the bot solve it here http://tiny.cc/pxwwtz`);
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
    console.log(QueenCount);
    let i=allsquaresArray.indexOf(e.currentTarget);
    
    
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
