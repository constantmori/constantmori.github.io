var XnOPAnimate = false;
function XNOS(){
	var canvas = $('<canvas/>')[0];
	canvas.height = $('#xnos').height() + 45;
	canvas.width = $('#xnos').width();
	var context = canvas.getContext('2d');
	$('#xnos').append(canvas);

	$(window).resize(function(){
		canvas.height = $('#xnos').height() + 45;
		canvas.width = $('#xnos').width();
		createCells();
	});

	var startTime = new Date().getTime();
	var currentTime = 0;

	var gridSize = 15,
	    cells = [],
	    drawArray = [];

	var letters = [
		['☐', 9],
		["⨯", 14],
		["O", 8]
	];

	var cell = function(x,y){
		this.x = x;
		this.y = y;

		this.opacity = 0.2;
		this.opacitys = 0.2;
		this.letter = 1;

		this.hovered = false;
		this.hoverType = 0;
		this.hoverTime = 0;

		if(cells[y/gridSize]){
			cells[y/gridSize].push(this);
		}

		this.id = drawArray.length;
		drawArray.push(this);
	}

	cell.prototype.hover = function(type, dist){
		if(this.hovered == false){
			this.id = drawArray.length;
			drawArray.push(this);
		}

		this.hovered = true;
		var now = new Date().getTime();
		this.hoverTime = (now - startTime) / 1000;
		this.hoverType = type;
		this.opacitys = dist;


	}

	cell.prototype.draw = function(){
		context.save();

		context.clearRect(this.x-gridSize/2,this.y-gridSize/2-2,gridSize,gridSize);

		if(this.hovered == true){
			var z = ((8-this.opacitys) - ((currentTime - this.hoverTime) * 0.8) * 1.5); // ((3.2-this.opacitys) - only X's are shown at 7+ value
			var t = z > 0 ? z : 0;
			this.opacity = 0.2 + t;
			context.translate( this.x, this.y-3);
			context.rotate(t*4);
			context.translate(-this.x,-this.y+3); 

			if(t == 0){
				this.hovered = false;
				this.letter = 1;
				this.opacity = 0.2;

			} else if(t > 0.3 && t < 2){
				if(t > 0.5 && t < 1.5){
					this.letter = 2;
				} else {
					this.letter = this.hoverType;
				}
			} else {
				this.letter = 1;
			}
		} else {
			delete drawArray[this.id];
		}


		this.color = 'rgba(164, 148, 164,'+this.opacity+')';
		// 'rgba(110, 95, 110,'+this.opacity+')';
		//'rgba(152, 133, 152,'+this.opacity+')'; 
		context.font = letters[this.letter][1]+"px Futura, sans-serif";
		context.fillStyle = this.color;
		context.textAlign = "center";
		context.fillText(letters[this.letter][0], this.x, this.y);

		context.restore();
	}

	cmilk.on('mousemove','#xnos canvas',function(e,velocity){
		XOSmoveHandle(e,velocity);
	});

	function XOSmoveHandle(e,velocity){
		var v = Math.floor(velocity/3 + 2) < 5 ? Math.floor(velocity/3 + 2) : 4;
		e.pageY = e.pageY - $('#xnos canvas').offset().top;
		for(var y = 0; y < v; y++){
			for(var x = 0; x < v; x++){
				var x2 = Math.floor(x - (v/3));
				var y2 = Math.floor(y - (v/3));
				var ly = Math.floor((e.pageY+20)/gridSize);
				var lx = Math.floor((e.pageX+20)/gridSize);
				var ny = ly+y2;
				var nx = lx+x2;

				if(cells[ny] && cells[ny][nx]){

					var icon = cells[ny][nx];

					var dist = Math.abs(ly - ny) + Math.abs(lx - nx);

					icon.hover(0, dist / 2);
				}
			}
		}
	}

	function createCells(){
		cells = [];
		for(var y = 0; y < canvas.height; y+=gridSize){
			cells.push([]);
			for(var x = 0; x < canvas.width; x+=gridSize){
				new cell(x, y);
			}
		}
	}

	var requestframe = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
	    // IE Fallback, you can even fallback to onscroll
	    function (callback) {
		    window.setTimeout(callback, 1000 / 60);
	    };



	function loop(){

		//canvas.width = canvas.width;
		//canvas.height = canvas.height;

		var now = new Date().getTime();
		currentTime = (now - startTime) / 1000;
		for(var i = 0; i<drawArray.length; i++){
			if(typeof(drawArray[i]) == 'object'){
				drawArray[i].draw();
			}
		}
		
		if(XnOPAnimate == true){
			doAnimate();
		}
		
		requestframe(loop);
	}

	function init(){
		loop();
		createCells();
	}
	init();
	
	function doAnimate(){
		XnOPAnimate = false;
		if(XnOsP){
			for(var i = 0; i < XnOsP.length; i++){
				setDelay(i);
			}	
		}
	}
	function setDelay(i){
		setTimeout(function(){
			var it = XnOsP[i];

			var x = $('#xnos canvas').width() * (it[0].x / 100);
			var y = $('#xnos canvas').height() * (it[0].y / 100);
			XOSmoveHandle({pageX: x, pageY: $('#xnos canvas').offset().top + y},it[1]);
		}, 5*i)
	}
}

XNOS();