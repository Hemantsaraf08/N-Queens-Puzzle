var a=4;
let arr=[];

for(let i=0;i<a;i++){
    arr.push(0)
}
// console.log(arr);

let ans=[];
for(let i=0;i<4;i++){
    ans.push([...arr]);
}
console.log(ans);
ans[2][1]=9;
// ans[2][2]=9;
console.log(ans);
for(let i=0;i<ans.length;i++){
    for(let j=0;j<ans.length;j++){
        if(ans[i][j]==9) console.log("found @", i, j);
    }
}
