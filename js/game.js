window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


$(window).load(function() {
game.init();
});


var game = {

	WIDTH: 800, 
    HEIGHT: 600, 
    scale:  1,
    offset: {top: 0, left: 0},
    entities: [],
    nextBubble: 100,
    score: {
        taps: 0,
        hit: 0,
        escaped: 0,
        accuracy: 0
    },
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    ua:  null,
    android: null,
    ios:  null,
	
	init: function(){
		game.RATIO = game.WIDTH / game.HEIGHT;
        game.currentWidth = window.WIDTH;
        game.currentHeight = window.HEIGHT;
		
		$('.gamelayer').hide();
		$('#gamestartscreen').show();
		$('#gamecanvas').show();
		
		game.canvas = document.getElementsByTagName('canvas')[0];
		game.canvas.width = window.WIDTH;
        game.canvas.height = window.HEIGHT;
		
		
		game.ctx = game.canvas.getContext('2d');
		
		game.ua = navigator.userAgent.toLowerCase();
        game.android = game.ua.indexOf('android') > -1 ? true : false;
        game.ios = ( game.ua.indexOf('iphone') > -1 || game.ua.indexOf('ipad') > -1  ) ? true : false;
		
	
		
		
		
		game.resize();
	},
	
	resize: function() {
    
        game.currentHeight = window.innerHeight;
        game.currentWidth = game.currentHeight * game.RATIO;
        
        game.canvas.style.width = game.currentWidth + 'px';
        game.canvas.style.height = game.currentHeight + 'px';
		if (game.android || game.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }
        game.scale = game.currentWidth / window.WIDTH;
        game.offset.top = game.canvas.offsetTop;
        game.offset.left = game.canvas.offsetLeft;
    	window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    },
	
	mabout: function(){
		
		
		
		
		$('#gamestartscreen').hide();
		$('#gameabout').show();
		
		game.ctx.drawImage('#fff',10,10);
		
	},
	
	mback: function(){
		$('#gamestartscreen').show();
		$('#levelselectscreen').hide();
		$('#gamehs').hide();
		$('#gamehtp').hide();
		$('#gameabout').hide();
		$('#gfind').hide();
		
		game.Draw.clear();
	},
	
	mhtp: function(){
		
		$('#gamestartscreen').hide();
		$('#gamehtp').show();
	},
	
	mplay: function(){
		
		
		$('#gamestartscreen').hide();
		$('#levelselectscreen').show();
		
		game.Draw.text('Pilih Permainan / Choose Game', 50, 100, 30, '#000');
		
		
	},
	
	gshuffle: function(){
		
		$('#levelselectscreen').hide();
		$('#mgshuffle').show();
		
		
	},
	
	gfind: function(){
		game.Draw.clear();
		
		$('#levelselectscreen').hide();
		$('#gfind').show();
		
		
        game.Draw.text('Your Score : ' + game.score.hit, 20, 30, 14, '#000');
		game.Draw.text('Number : ' + game.score.hit, 20, 50, 14, '#000');
		game.findmatch.answer();
		
	},
	
	mhs: function(){
		
		$('#gamestartscreen').hide();
		$('#levelselectscreen').hide();
		$('#gamehtp').hide();
		$('#gamehs').show();
		$('#gameabout').hide();
	}

};

game.Draw = {

    clear: function() {
        game.ctx.clearRect(0, 0, game.WIDTH, game.HEIGHT);
    },


    rect: function(x, y, w, h, col) {
        game.ctx.fillStyle = col;
        game.ctx.fillRect(x, y, w, h);
    },

    circle: function(x, y, r, col) {
        game.ctx.fillStyle = col;
        game.ctx.beginPath();
        game.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        game.ctx.closePath();
        game.ctx.fill();
    },


    text: function(string, x, y, size, col) {
        game.ctx.font = 'bold '+size+'px Monospace';
        game.ctx.fillStyle = col;
        game.ctx.fillText(string, x, y);
    }

};

game.findmatch = {
	
	
	answer: function(){
		
			var ia = new Array();
			
			var x2=130;
			var y2=350;
			for(var x=1;x<=4;x++){
				var image1 = new Image();
            	image1.src = "img/find/"+x+".png";
				ia[x] = image1;
            	game.ctx.drawImage(image1, x2, 350);
				x2=x2+130;
				
				document.ia[x].onclick = function() {
   					game.ctx.drawImage(image1, 500, 350);
				}
			}
			
		
	}
}

