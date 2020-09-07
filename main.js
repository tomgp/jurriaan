const symbols = {};
const svg = d3.select('svg');
const svgWidth = Number(svg.attr('viewBox').split(' ')[2]);
d3.selectAll('symbol').each(function(){
    symbols[this.getAttribute('id')] = this.innerHTML.replace(/symbol/g, 'g');
});


d3.select('#text-input')
    .on('keyup', update);

d3.select('#weight-input')
    .on('change', update);

function write(type){
    const lineLength = 8;
    const charDim = 340;
    const scale = svgWidth/charDim /lineLength
    const chars = type.split('');

    
    const selection  = svg.selectAll('g')
        .data(chars);
    
    selection.enter()
        .append('g')
            .attr('class',(d,i)=>`weight${Math.floor(i/lineLength)%7}`)
            .attr('transform', (d,i)=> `scale(${scale}) translate(${(i%lineLength)*charDim},${Math.floor(i/lineLength)*charDim})`)
            .html(d=>{
                return symbols[`_${d}`]
            });

    selection.html(d=>{
        return symbols[`_${d}`]
    })

    selection.exit().remove();
}

function decorate(){
    const weight = d3.select('#weight-input').node().value;
    d3.selectAll('svg g')
        .attr('class',`weight${weight}`);
}

function update(){
    write(String(d3.select('#text-input').node().value).toLocaleLowerCase());
    //decorate();
}

write('jurriaanschroferjurriaanschroferjurriaanschroferjurriaanschroferjurriaanschroferjurriaanschroferjurriaanschroferjurriaanschrofer')