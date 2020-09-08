const symbols = {};
const svg = d3.select('svg');
const svgWidth = Number(svg.attr('viewBox').split(' ')[2]);
d3.selectAll('symbol').each(function(){
    symbols[this.getAttribute('id')] = this.innerHTML.replace(/symbol/g, 'g');
});


d3.select('#text-input')
    .on('keyup', update);

d3.selectAll('.variant-select')
    .on('change', update);

d3.selectAll('#size-select')
    .on('change', update);

function write(type){
    const charDim = 340;
    const lineLength = 50 - Number(d3.select('#size-select').node().value);
    
    const scale = svgWidth/charDim /lineLength
    
    const selection  = svg.selectAll('g')
        .data(type.split(''));
    
    selection.enter()
        .append('g')
            .attr('class',(d,i)=>{
                const w = Math.floor(i)%7
                return `weight${w}`;
            })
            .attr('transform', (d,i)=> `scale(${scale}) translate(${(i%lineLength)*charDim},${Math.floor(i/lineLength)*charDim})`)
            .html(d=>{
                return symbols[`_${d}`]
            });

    selection
        .attr('class',(d,i)=>{
            const w = Math.floor(i)%7
            return `weight${w}`;
        })
        .attr('transform', (d,i)=> `scale(${scale}) translate(${(i%lineLength)*charDim},${Math.floor(i/lineLength)*charDim})`)
        .html(d=>{
        return symbols[`_${d}`]
    })

    selection.exit().remove();
}

function decorate(){
    const weight = d3.select('.variant-select:checked').node().value;
    console.log(weight);
    d3.selectAll('svg g')
        .attr('class',(d,i)=>{
            let w = weight;
            if(weight == 'no'){
                w = Math.floor(i)%8;
            }
            return `weight${w}`;
        });
}

function update(){
    write(String(d3.select('#text-input').node().value).toLocaleLowerCase());
    decorate();
}

d3.select('#text-input').attr('value',
    `letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt letters op matt`
    .toLocaleLowerCase());

update();