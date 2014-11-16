/** Apache License 2.0 Applies **/
/** @author Sun Sibai & Liu Yu **/
function playkey(idx) {
 if (idx>0&&!keyStatew[idx-1]) {
  var aus=d3.selectAll('audio.white')[0];
  aus[idx+22].currentTime=0;aus[idx+22].play(); // reset audio in case of repressing too soon
 } else if (idx<0&&!keyStateb[-idx-1]) {
  var aus=d3.selectAll('audio.black')[0];
  aus[-idx+15].currentTime=0;aus[-idx+15].play();
 }
}
function stopkey(idx) {
 if (idx>0&&keyStatew[idx-1]) {
  var aus=d3.selectAll('audio.white')[0];
//  aus[idx+22].pause();aus[idx+22].currentTime=0; // stop audio
 } else if (idx<0&&keyStateb[-idx-1]) {
  var aus=d3.selectAll('audio.black')[0];
//  aus[-idx+15].pause();aus[-idx+15].currentTime=0;
 }
}
function playmetro() {
 var au=d3.select('audio.metro')[0][0];
 au.volume=0.18;au.currentTime=0;au.play();
}

