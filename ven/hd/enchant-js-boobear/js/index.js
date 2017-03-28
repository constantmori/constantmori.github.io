/*
  thanks
  http://enchantjs.com/
  http://dotinstall.com/lessons/basic_enchant_js_v2/11511
  http://tmlife.net/programming/javascript/javascript-lib-stats-js-memo.html
*/


enchant();

window.onload = function(){
  var stats = enableStats();
  var GAME_W = window.innerWidth;
  var GAME_H = window.innerHeight;
  var charaSrc = "https://dl.dropboxusercontent.com/u/90712768/img/chara1.png";

  // dat.gui setting
  var Setting = function(){
    this.chara_num = 1.259;
    this.chara_num_max = 5000;
    this.buttleMode = false; 
  }
  var setting = new Setting();

  var core = new Core(GAME_W, GAME_H);
	core.fps = 30;
	core.scale = 1;
	core.preload(charaSrc);
  core.onload = function(){
    
    // Bear class
		var Bear = Class.create(Sprite,{
			initialize:function(x,y){
				Sprite.call(this, 32, 32);
				this.image = core.assets[charaSrc];
				this.x = x;
				this.y = y;
        this.charaSet = rand(3) *5;
  			var v = Math.random() * 8 + 1;
	  		this.on("enterframe", function(){
		  		this.frame = this.age % 3 + this.charaSet;
          if(this.flgButtle){
  			  	this.x += Math.random() * 16 + 1;
          }else{
	  		  	this.x += v;
          }
		    	this.y += (Math.cos(this.age/3 + v)*2);
	  	  	if(GAME_W < this.x)this.x = -10;
  		  })
				core.rootScene.addChild(this);
      },remove:function(){
        core.rootScene.removeChild(this);
      },changeButtleMode:function(flg){
        this.flgButtle = flg;
      },charaSet:0
       ,flgButtle:setting.buttleMode
    })
    
    // create bears
		var bears = [];
		for (var i = 0; i < setting.chara_num; i++) {
   		bears.push(new Bear(rand(GAME_W), rand(GAME_H)));
		};

    // enterframe event
    /*core.addEventListener('enterframe', function(){
      // fps chaek
      stats.update();
    });*/
  
  
    // dat.gui 
    var gui = new dat.GUI();
    gui.add(setting, 'chara_num', 0, setting.chara_num_max).onFinishChange(function(value){
      var nowNum = bears.length;
      var resultNum = Math.floor(value);
      if(nowNum < resultNum){
        var addNum = resultNum - nowNum;
    		for (var i = 0; i < addNum; i++) {
	    		bears.push(new Bear(rand(GAME_W), rand(GAME_H)));
	     	};
      }else if(resultNum < nowNum){
        var removeNum = nowNum - resultNum;
    		for (var i = 0; i < removeNum; i++) {
	    		var removeBear = bears.pop();
          removeBear.remove();
          removeBear = null;
	     	};
      }
  	});
    gui.add(setting, 'buttleMode').onFinishChange(function(value){
      for (var i = 0; i < bears.length; i++) {
   	    bears[i].changeButtleMode(value);
      };
    });

	}
	core.start();

  // event
  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize(){
    GAME_W = window.innerWidth;
    GAME_H = window.innerHeight;
    core.width = GAME_W;
    core.height = GAME_H;
  }

}


// mixin
function rand (n) {
	return Math.floor(Math.random() * (n+1));
}


// Stats.js
var enableStats = function() {             
  if (window.Stats === undefined) return null;
   
  var stats = new Stats();
  // 左上に設定
  stats.domElement.style.position = "fixed";
  stats.domElement.style.left     = "15px";
  stats.domElement.style.top      = "0px";
  document.body.appendChild(stats.domElement);

  return stats;
};