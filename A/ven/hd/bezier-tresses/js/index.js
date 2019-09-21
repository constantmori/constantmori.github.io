window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var c = document.getElementById('canv'),
    $ = c.getContext('2d'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    arr = [],
    u = 0;
    o = 0, 

$.fillStyle = '#FEFAE6';
$.fillRect(0,0,w,h);
$.globalCompositeOperation = "source-over";

var inv = function() {
  $.restore();
  $.fillStyle = "#" + (o ? "FEFAE6" : "1A1A1A");
  $.fillRect(0, 0, w, h);
  $.fillStyle = "#" + (o ? "1A1A1A" : "FEFAE6");
  $.save()
};
window.addEventListener("touchstart", function(e){
  e.preventDefault();
  o = !o;
  inv()
}, false);

window.addEventListener("mousedown", function(e){
    o = !o;
    inv()
}, false);

window.addEventListener("keydown", function(keydn) {
  if (keydn.keyCode == 32) {
    o = !o;
    inv()
  }
}, false);

window.addEventListener('resize', function(){
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}, false);

var ready = function() {
    arr = [];
    for (var i = 0; i < 20; i++) {   
        set();
    }
}

var set = function() {
    arr.push({
        x1: w,
        y1: h,
        _x1: w - Math.random() * w,
        _y1: h - Math.random() * h,
        _x2: w - Math.random() * w,
        _y2: h - Math.random() * h,
        x2: -w + Math.random() * w,
        y2: -h + Math.random() * h,
        rot: Math.random() * 180,
        a1: Math.random() * 10,
        a2: Math.random() * 10,
        a3: Math.random() * 10
    });
}

var pretty = function() {
     u-=.2;
    for (var i in arr) {
        var b = arr[i];
        b._x1 *= Math.sin(b.a1 -= 0.001);
        b._y1 *= Math.sin(b.a1);
        b._x2 -= Math.sin(b.a2 += 0.001);
        b._y1 += Math.sin(b.a2);
        b.x1 -= Math.sin(b.a3 += 0.001);
        b.y1 += Math.sin(b.a3);
        b.x2 -= Math.sin(b.a3 -= 0.001);
        b.y2 += Math.sin(b.a3);
        $.save();
        $.globalAlpha = 0.03;
        $.beginPath();
        $.strokeStyle = 'hsla('+ u + ', 85%, 60%, .7)';
        $.moveTo(b.x1, b.y1);
        $.bezierCurveTo(b._x1, b._y1, b._x2, b._y2, b.x2, b.y2);
        $.stroke();
        $.restore();
    }
    window.requestAnimFrame(pretty);
}
ready();
pretty();

setTimeout(function() { 
  var info= document.getElementById('info');
  info.style.right = '-500px';
}, 5500);