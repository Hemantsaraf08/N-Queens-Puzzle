//build a matrix first;
let chessboard=[];
let row0=[];
let QueenCount=8;
// let targetNoQueen=Math.sqrt(allsquares.length);
for(let i=0;i<QueenCount;i++){
    row0.push(0);
}
for(let i=0;i<QueenCount;i++){
    chessboard.push([...row0]);
}

solveBT(chessboard, 0);

function solveBT(chessboard, row){
    for(let col=0;col<QueenCount;col++){
        if(isSafe(chessboard, row, col)){
            chessboard[row][col]=1; //click;
            let idxtoclick=(row*QueenCount) + col;
            if(row==QueenCount-1){
                //final row queen placement safe and done;
                break;
            }
            solveBT(chessboard, row+1);
            chessboard[row][col]=0; //unclick & print backtracking
        }
    }
}

function isSafe(chessboard, row, col){
    for(let i=row-1, j=col;i>=0;i--){
        if(chessboard[row][col]==1) return false;
    }
    for(let i=row-1, j=col-1;i>=0&&j>=0;i--, j--){
        if(chessboard[row][col]==1) return false;
    }
    for(let i=row-1, j=col+1;i>=0&&j<chessboard.length;i--,j++){
        if(chessboard[row][col]==1) return false;
    }
    return true;
}