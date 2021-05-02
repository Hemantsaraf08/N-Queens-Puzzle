/*  
    Program to solve the N-Queen problem (here for a 8*8 chess board) using simple backtracking algorithm
*/
const puppeteer = require("puppeteer");
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

(async function () {
    try {

        let brser = await puppeteer.launch({
            defaultViewport: null,
            headless: false,
            args: ["--start-maximized"],
            slowMo: 230
        })
        let tab = await brser.newPage();
        await tab.goto("https://hemantsaraf08.github.io/N-Queens-Puzzle/");
        await tab.waitForSelector(".dynamic-box");
        // await tab.waitForTimeout(500);

        //solving puzzle using simple backtracking algo, in fn. solveBT
        await solveBT(chessB, 0, tab, ".dynamic-box", ".hidden-container>h3");
        console.log(`Puzzle solved in ${noOfIteration} recursive call`);
        await tab.waitForTimeout(3000);
        await brser.close();
    } catch (err) {
        console.log(err);
    }
})();

async function solveBT(chessB, r, tab, sqSelector, mesSelector){
    noOfIteration+=1;
    if(r==QueenC){
        solved=true;
          //taking a snapshot of solved puzzle
          await tab.screenshot({ path: './BotSolution.png' });
        return;
    }
    for(let c=0;c<QueenC;c++){
        let booleanans=await isSafe(chessB, r, c);
        if(booleanans){
            chessB[r][c]=1; //click;
            let idxtoclick=(r*QueenC) + c;
            await squareclick(tab,idxtoclick, sqSelector);
            await solveBT(chessB, r+1,tab, sqSelector, mesSelector);
            if(solved) return;
            chessB[r][c]=0; //unclick & display backtracking and undisplay it;
            await displaymes(tab, mesSelector); //display
            await tab.waitForTimeout(500); //time interval
            await displaymes(tab, mesSelector); //undisplay
            await squareclick(tab,idxtoclick, sqSelector);
            console.log(`Backtracking for --> row ${r+1} and  col ${c+1}`);
        }
    }
}

async function squareclick(tab,idxtoclick, selector){
    // console.log("click command on :-->", idxtoclick);
    let z=await tab.$$(selector);
    await z[idxtoclick].click();
}

async function displaymes(tab,mesSelector){
    let resp=await tab.evaluate((mesSelector)=>{
        let textEle=document.querySelector(mesSelector);
        let str=textEle.innerText;
        if(str=="") textEle.innerText="BACKTRACKING!";
        else textEle.innerText="";
    }, mesSelector)
}

async function isSafe(chessB, r, c){
    for(let i=r-1, j=c;i>=0;i--){
        if(chessB[i][j]==1) return false;
    }
    for(let i=r-1, j=c-1;i>=0&&j>=0;i--, j--){
        if(chessB[i][j]==1) return false;
    }
    for(let i=r-1, j=c+1;i>=0&&j<QueenC;i--,j++){
        if(chessB[i][j]==1) return false;
    }
    return true;
}