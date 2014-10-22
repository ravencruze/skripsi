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

	WIDTH: 600, 
    HEIGHT: 800, 
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
        game.currentWidth = game.WIDTH;
        game.currentHeight = game.HEIGHT;
		
		$('.gamelayer').hide();
		$('#gamestartscreen').show();
		$('#gamecanvas').show();
		
		game.canvas = document.getElementsByTagName('canvas')[0];
		game.canvas.width = game.WIDTH;
        game.canvas.height = game.HEIGHT;
		
		
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
        game.scale = game.currentWidth / game.WIDTH;
        game.offset.top = game.canvas.offsetTop;
        game.offset.left = game.canvas.offsetLeft;
    	window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    },
	
	mabout: function(){
		
		game.ctx.font = "20px Georgia";
		game.ctx.fillText("Hello World!", 30, 600);
		
		
		$('#gamestartscreen').hide();
		$('#gameabout').show();
		
		
	},
	
	mback: function(){
		$('#gamestartscreen').show();
		$('#levelselectscreen').hide();
		$('#gamehs').hide();
		$('#gamehtp').hide();
		$('#gameabout').hide();
	},
	
	mhtp: function(){
		
		$('#gamestartscreen').hide();
		$('#gamehtp').show();
	},
	
	mplay: function(){
		
		$('#gamestartscreen').hide();
		$('#levelselectscreen').show();
		$('#gamehs').hide();
		$('#gamehtp').hide();
		$('#gameabout').hide();
		
		
	},
	
	gshuffle: function(){
		
		$('#levelselectscreen').hide();
		$('#mgshuffle').show();
		
		
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
