/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
// constant declaration
var wid=700; // width
var hgh=500; // height
var crnblk=10; // corner blank
var pianow=30; // piano whole keyboard thick
var keywwid=16; // piano one white panel width
var keybwid=10; // piano one black panel width
var txtsiz=15; // text size to adjust blank
var blackaux=[0,1,3,4,5]; // auxiliary array to render black key
var numofoct=3; // number of octaves
var driftspd=5; // 5px/50ms
var refreshT=50; // 1frame/50ms
var freemode=true; // play keyboard piano
var source=''; // this is for MIDI json file playing (TODO)
// function declaration
function drawinit() {
 d3.select('body').append('div').attr('class','wrapper').attr('id','canvas')
   .append('svg').attr('class','chart center')
   .attr('width',wid).attr('height',hgh);
}
function delgraph() {
 d3.select('div#canvas').remove();
}
function drawaxis() {
 d3.select('svg').append('line').attr('class','sline')
   .attr('x1',1).attr('y1',hgh-1).attr('x2',wid-1).attr('y2',hgh-1);
 d3.select('svg').append('text').attr('class','sline')
   .attr('x',crnblk).attr('y',hgh-crnblk).text('t');
 d3.select('svg').append('line').attr('class','sline')
   .attr('x1',wid-pianow).attr('y1',1).attr('x2',wid-pianow).attr('y2',hgh-1);
 d3.select('svg').append('text').attr('class','sline')
   .attr('x',wid-2.5*crnblk-pianow).attr('y',crnblk+txtsiz).text('log(f)');
}
function idx2posw(i) { // y-position of white panel
 return hgh-2.5*pianow-i*keywwid;
}
function idx2posb(i) { // y-position of black panel
 return hgh-2.5*pianow-(Math.floor(i/5)*7+blackaux[i%5])*keywwid-keybwid/2;
}
function drawkeys() {
 d3.select('svg').selectAll('rect.keyw').data(new Array(numofoct*7)).enter() // enter: append rect if data.length > exist(rect).length
   .append('rect').attr('class','keyw')
   .attr('x',wid-pianow).attr('width',pianow-1).attr('height',keywwid)
   .attr('y',function (d,i) {return idx2posw(i);});
 d3.select('svg').selectAll('rect.keyb').data(new Array(numofoct*5)).enter()
   .append('rect').attr('class','keyb')
   .attr('x',wid-pianow).attr('width',pianow/2-1).attr('height',keybwid)
   .attr('y',function (d,i) {return idx2posb(i);});
}
function drawstat() { // statistics
 d3.select('svg').selectAll('rect.statw').data(new Array(numofoct*7)).enter()
   .append('rect').attr('class','statw')
   .attr('x',1).attr('width',pianow-1).attr('height',keywwid)
   .attr('y',function (d,i) {return idx2posw(i);});
 d3.select('svg').selectAll('rect.statwo').data(new Array(numofoct*7)).enter()
   .append('rect').attr('class','statwo')
   .attr('x',1).attr('width',pianow-1).attr('height',keywwid)
   .attr('y',function (d,i) {return idx2posw(i);});
 d3.select('svg').selectAll('rect.statb').data(new Array(numofoct*5)).enter()
   .append('rect').attr('class','statb')
   .attr('x',1).attr('width',pianow/2-1).attr('height',keybwid)
   .attr('y',function (d,i) {return idx2posb(i);});
 d3.select('svg').selectAll('rect.statbo').data(new Array(numofoct*5)).enter()
   .append('rect').attr('class','statbo')
   .attr('x',1).attr('width',pianow/2-1).attr('height',keybwid)
   .attr('y',function (d,i) {return idx2posb(i);});
}
