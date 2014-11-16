/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
var barperiod; // period of a measure
var autobarInterval; // auto bar line
var barTimeStart;
var barTimeFinal;
var keyStatew=new Array(numofoct*7); // if keypressing
var keyStateb=new Array(numofoct*5); // if keypressing
var keyStates=[false];
for (var s=0;s<numofoct*7;s+=1) {keyStatew[s]=false;}
for (var s=0;s<numofoct*5;s+=1) {keyStateb[s]=false;}
function autobarSet(period) {
 if (driftInterval) {
  clearInterval(autobarInterval);
  autobarInterval=null;
 }
 autobarInterval=setInterval('createbarline();',period);
}
function createbarline() {
 d3.select('svg').insert('line',':first-child').attr('class','barline')
   .attr('x1',wid-pianow).attr('x2',wid-pianow).attr('y1',1).attr('y2',hgh-1);
 playmetro();
}
var keybinddata; // key bindings
d3.json('res/keybind.json',function(error,data) {
 if (error) {console.log(error);}
 keybinddata=data;
});
function key2idx(keyCode) { // return positive+1 value means white panel, negative-1 means black, return zero means unknown
 var keychar=String.fromCharCode(keyCode);
 var wi=keybinddata.white[keychar];
 if (wi) {return wi;}
 var bi=keybinddata.black[keychar];
 if (bi) {return -bi;}
 return 0;
}
function keyplay(event) {
 if (event.keyCode==32&&!keyStates[0]) {
  keyStates[0]=true;
  d3.select('svg').insert('line',':first-child').attr('class','barline')
    .attr('x1',wid-pianow).attr('x2',wid-pianow).attr('y1',1).attr('y2',hgh-1);
  barTimeFinal=(new Date()).getTime();
  if (barTimeStart) {
   autobarSet(barTimeFinal-barTimeStart);
  }
  barTimeStart=barTimeFinal;
 } else {
  var idx = key2idx(event.keyCode);
  playkey(idx);
  if (idx>0&&!keyStatew[idx-1]) {
   keyStatew[idx-1]=true;
   d3.select('svg').insert('rect',':first-child').attr('class','notew press')
     .attr('x',wid-pianow).attr('width',1).attr('height',keywwid)
     .attr('y',idx2posw(idx-1));
  } else if (idx<0&&!keyStateb[-idx-1]) {
   keyStateb[-idx-1]=true;
   d3.select('svg').insert('rect',':first-child').attr('class','noteb press')
     .attr('x',wid-pianow).attr('width',1).attr('height',keybwid)
     .attr('y',idx2posb(-idx-1));
  }
 }
 event.preventDefault(); // non-IE
 event.returnValue=false; // IE
}
function keystop(event) {
 if (event.keyCode==32&&keyStates[0]) {
  keyStates[0]=false;
 } else {
  var idx = key2idx(event.keyCode);
  stopkey(idx);
  if (idx>0&&keyStatew[idx-1]) {
   keyStatew[idx-1]=false;
   var rects = d3.selectAll('rect.notew.press')[0];
   for (rct in rects) {
    if (rct!="parentNodes") {
     var ridx=pos2idxw(parseFloat(rects[rct].getAttribute('y')));
     if (ridx==idx-1) {rects[rct].setAttribute('class','notew');}
    }
   }
  } else if (idx<0&&keyStateb[-idx-1]) {
   keyStateb[-idx-1]=false;
   var rects = d3.selectAll('rect.noteb.press')[0];
   for (rct in rects) {
    if (rct!="parentNodes") {
     var ridx=pos2idxb(parseFloat(rects[rct].getAttribute('y')));
     if (ridx==-idx-1) {rects[rct].setAttribute('class','noteb');}
    }
   }
  }
 }
 event.preventDefault(); // non-IE
 event.returnValue=false; // IE
}
