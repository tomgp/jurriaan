// generates CSS for weights

const style = [
    'fill:black;',
    'fill:white; stroke:black;',
    'fill:white;'
];

let count = 0;

for(let i=0;i<2;i++){
    for(let j=0;j<2;j++){
        for(let k=0;k<2;k++){
            console.log(`
.weight${count} .outer{ ${style[i]} }
.weight${count} .mid{ ${style[j]} }
.weight${count} .inner{ ${style[k]} }`);
            count++;
        }
    }
}
