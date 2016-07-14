import d3 from 'd3';
import PIXI from 'pixi.js';
import boxIntersect from 'box-intersect';

export function pixiIntersect(divName) {

let width = 400, height = 400;

let canvas = d3.select(divName).append('canvas')
.attr('width', width)
.attr('height', height)
.style('position', 'absolute')
.style('top', "0px")
.style('left', "0px")


let svg = d3.select('#circle').append('svg')
.attr('width', width)
.attr('height', height)
.style('position', 'absolute')
.style('top', "0px")
.style('left', "0px")


let renderer = PIXI.autoDetectRenderer(width, height,
        {
            //backgroundColor: 0xdddddd,
            backgroundColor: 0xdddddd,
         antialias: true,
         view: canvas.node()
        });



// create the root of the scene graph
var stage = new PIXI.Container();
var pMain = new PIXI.Graphics();
stage.addChild(pMain);


var text = new PIXI.Text("Pixi.js has text!", {font:"15px Arial", fill:"red"});
pMain.addChild(text);

let gMain = svg.append('g')
let texts = []

let paneRect = gMain.append('rect')
.attr('fill', 'transparent')
.attr('width', width)
.attr('height', height)

let minX = 0, minY = 0;
let maxX = width, maxY = height;
//let maxX =10, maxY = 60;
let format = d3.format(".2n")

function randX() {
    return minX + (maxX - minX) * Math.random();
}

function randY() {
    return minY + (maxY - minY) * Math.random();
}

let points = d3.range(0,1000).map((d) => { 
    let dotSize = 10 * Math.random();

    return {
            'x1': minX + (maxX - minX) * Math.random(),
            'y1': minY + (maxY - minY) * Math.random(),
            'x2': minX + (maxX - minX) * Math.random(),
            'y2': minY + (maxY - minY) * Math.random(),
            'r': dotSize,
            'label': format(dotSize),
            'name': d.toString()}});

points.forEach(function(d) {
    var text = new PIXI.Text(d.label, {font:"15px Arial", fill:"red"});
    text.position.x = d.x;
    text.position.y = d.y;
    //text.anchor.x = d.x;
    //text.anchor.y = d.y;

    texts.push(text);

    pMain.addChild(text);
});

let xScale = d3.scale.linear().domain([minX, maxX]).range([ 0, width ])
let yScale = d3.scale.linear().domain([minY, maxY]).range([ 0, height ])

let zoom = d3.behavior.zoom()
    .x(xScale)
    .y(yScale)
    .on('zoom', draw)

gMain.call(zoom);
let lineWidth = 1;

let graphics = new PIXI.Graphics();
function draw() {

}

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

graphics = new PIXI.Graphics();
graphics.lineStyle(lineWidth, 0x0000FF,1);

let numPoints = 8000;

for (let i = 0; i < numPoints; i ++) {
    graphics.moveTo(randX(), randY());
    graphics.lineTo(randX(), randY());

};
pMain.addChild(graphics);

function animate() {
    stats.begin()

    pMain.removeChild(graphics);
    graphics = new PIXI.Graphics();

    graphics.lineStyle(lineWidth, 0x0000FF,1);
    //graphics.moveTo(0, 0);
    //graphics.lineStyle(1, 0x0000FF);
    //graphics.beginFill(0xFF700B, 1);
    let j = 0;
    for (let i = 0; i < numPoints; i ++) {
        graphics.moveTo(randX(), randY());
        graphics.lineTo(randX(), randY());

    };

    pMain.addChild(graphics);

    // render the container
    renderer.render(stage);

    stats.end();
    requestAnimationFrame(animate);
}
animate();

draw();
}
