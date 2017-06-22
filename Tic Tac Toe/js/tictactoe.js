(function($){
	$.fn.tictactoe = function(options){
		var settings = $.extend({
			boardSize		: 300,
			boardBackground	: '#C3C3C3',
			headingVisible	: true,
			headingText		: 'Tic Tac Toe',
			headingSize		: 20,
			cellNumber		: 9,
			tictactoeX		: 'images/tictactoe_x.png',
			tictactoeO		: 'images/tictactoe_o.png',
			selectedToken	: 'X',
			accumulator		: 0,
			score			: new Array(new Array(null,null,null),new Array(null,null,null),new Array(null,null,null)),
			draw			: 0,
			win				: false,
			tokenInPlay		: '',
			level			: 'easy'
		}, options);
		
		var tictactoe = {
			createBoard : function(ob, score){
				settings.win = false;
				settings.draw = 0;
				var board	= $('<div>');
				var heading	= $('<p>');
				heading.attr('id', 'result');
				if(settings.headingVisible){
					heading.text(settings.headingText);
					heading.css({
						color		: '#000000',
						margin		: 5,
						textAlign	: 'center',
						fontSize	: settings.headingSize
					});
					ob.append(heading);
				}
				board.width(settings.boardSize).height(settings.boardSize);
				board.css({
					backgroundColor	: settings.boardBackground,
					position		: 'relative',
					top				: 0,
					left			: 0
				});
				for(var i=0; i<settings.cellNumber; i++){
					var square = $('<div>');
					square.width((settings.boardSize/Math.sqrt(settings.cellNumber))-2).height((settings.boardSize/Math.sqrt(settings.cellNumber))-2);
					square.css({
					});
					square.attr('id', 'square_' + i);
					square.attr('class', 'squares');
					board.append(square);
				}
				ob.append(board);
				tictactoe.addTokens(ob, board.children(), score);
			},
			
			addTokens : function(main, ob, score){
				ob.on({
					mousedown : function(){
						var selected = $(this).children().hasClass('selected');
						if(!selected){
							var img = $('<img>');
							img.attr('class', 'selected');
							img.hide();
							if(settings.selectedToken == 'X' || settings.selectedToken == 'x'){
								img.attr('src', settings.tictactoeX);
							} else {
								img.attr('src', settings.tictactoeO);
							}
							$(this).append(img);
							img.fadeIn(250);
							settings.tokenInPlay = 'X';
							tictactoe.buildScore(main, $(this).attr('id'), score, settings.selectedToken);
							setTimeout(function(){
							tictactoe.computerTurn(main, score);
							},250);
							$('.selected').parent().css({
								backgroundColor	: '#FFFFFF',
								boxShadow		: '4px 4px 8px -2px inset'
							});
						}
					}
				});
			},
			
			computerTurn : function(main, score){
				if(settings.win){
				} else {
					var ct_cell = tictactoe.ai(score);
					var selected = $('#square_' + ct_cell).children().hasClass('selected');
					if(!selected){
						var img = $('<img>');
						img.attr('class', 'selected');
						img.hide();
						if(settings.selectedToken == 'X' || settings.selectedToken == 'x'){
							img.attr('src', settings.tictactoeO);
						} else {
							img.attr('src', settings.tictactoeX);
						}
						var cell = '#square_' + ct_cell;
						$(cell).append(img);
						img.fadeIn(250);
						var sel_token = (settings.selectedToken=='X') ? 'O' : 'X';
						settings.tokenInPlay = 'O';
						tictactoe.buildScore(main, cell, score, sel_token);
						$('.selected').parent().css({
							backgroundColor	: '#FFFFFF',
							boxShadow		: '4px 4px 8px -2px inset'
						});
					} else {
						if(settings.accumulator != 45){
							tictactoe.computerTurn(main, score);
						}
					}
				}
			},
			
			ai : function(score){
				var ct_cell = Math.floor((Math.random()*9));
				if(settings.level == 'easy'){
					return ct_cell;
				} else {
					var build = '';
					var final_build = '';
					for(sc in score){
						for(s in score[parseInt(sc)]){
							build = score[parseInt(sc)];
						}
						final_build += build + ",";
						build = '';
					}
					ai_array = final_build.split(',');
					if(ai_array[0] == 'X' && ai_array[1] == 'X' && ai_array[2] == ''){
						return 2;
					} else if(ai_array[0] == 'X' && ai_array[2] == 'X' && ai_array[1] == ''){
						return 1;
					} else if(ai_array[1] == 'X' && ai_array[2] == 'X' && ai_array[0] == ''){
						return 0;
					} else if(ai_array[3] == 'X' && ai_array[4] == 'X' && ai_array[5] == ''){
						return 5;
					} else if(ai_array[3] == 'X' && ai_array[5] == 'X' && ai_array[4] == ''){
						return 4;
					} else if(ai_array[4] == 'X' && ai_array[5] == 'X' && ai_array[3] == ''){
						return 3;
					} else if(ai_array[6] == 'X' && ai_array[7] == 'X' && ai_array[8] == ''){
						return 8;
					} else if(ai_array[6] == 'X' && ai_array[8] == 'X' && ai_array[7] == ''){
						return 7;
					} else if(ai_array[7] == 'X' && ai_array[8] == 'X' && ai_array[6] == ''){
						return 6;
					} else if(ai_array[0] == 'X' && ai_array[3] == 'X' && ai_array[6] == ''){
						return 6;
					} else if(ai_array[0] == 'X' && ai_array[6] == 'X' && ai_array[3] == ''){
						return 3;
					} else if(ai_array[3] == 'X' && ai_array[6] == 'X' && ai_array[0] == ''){
						return 0;
					} else if(ai_array[1] == 'X' && ai_array[4] == 'X' && ai_array[7] == ''){
						return 7;
					} else if(ai_array[1] == 'X' && ai_array[7] == 'X' && ai_array[4] == ''){
						return 4;
					} else if(ai_array[4] == 'X' && ai_array[7] == 'X' && ai_array[1] == ''){
						return 1;
					} else if(ai_array[2] == 'X' && ai_array[5] == 'X' && ai_array[8] == ''){
						return 8;
					} else if(ai_array[2] == 'X' && ai_array[8] == 'X' && ai_array[5] == ''){
						return 5;
					} else if(ai_array[5] == 'X' && ai_array[8] == 'X' && ai_array[2] == ''){
						return 2;
					} else {
						return ct_cell;
					}
				}
			},
			
			buildScore : function(main, cell_no, score, token){
				var cell = cell_no.split('_');
				var cellNo = parseInt(cell[1]);
				if(cellNo<3){
					score[0][cellNo] = (token=='X') ? 'X' : 'O';
				} else if(cellNo<6){
					score[1][cellNo-3] = (token=='X') ? 'X' : 'O';
				} else {
					score[2][cellNo-6] = (token=='X') ? 'X' : 'O';
				}
				tictactoe.checkScore(main, cellNo, score);
			},
			
			checkScore : function(main, cellNo, score){
				var build = '';
				var final_build = '';
				for(sc in score){
					for(s in score[parseInt(sc)]){
						build = score[parseInt(sc)];
					}
					final_build += build + ",";
					build = '';
				}
				settings.accumulator += (cellNo+1);
				tictactoe.checkForWin(main, final_build);
			},

			checkForWin : function(main, final_build){
				settings.draw++;
				var clear_score	= false;
				var check = final_build.split(',');
				checkToken(check, settings.tokenInPlay);

				function checkToken(check, token){
					if(check[0]==token && check[1]==token && check[2]==token){
						$('#result').text('Top Line Win');
						for(var i=0; i<Math.sqrt(settings.cellNumber); i++){
							tictactoe.win_anim($('#square_' + i));
						}
						settings.win = true;
					} else if(check[3]==token && check[4]==token && check[5]==token){
						$('#result').text('Middle Line Win');
						for(var i=0; i<Math.sqrt(settings.cellNumber); i++){
							tictactoe.win_anim($('#square_' + (i+3)));
						}
						settings.win = true;
					} else if(check[6]==token && check[7]==token && check[8]==token){
						$('#result').text('Bottom Line Win');
						for(var i=0; i<Math.sqrt(settings.cellNumber); i++){
							tictactoe.win_anim($('#square_' + (i+6)));
						}
						settings.win = true;
					} else if(check[0]==token && check[3]==token && check[6]==token){
						$('#result').text('First Column Win');
						for(var i=0; i<settings.cellNumber; i+=3){
							tictactoe.win_anim($('#square_' + i));
						}
						settings.win = true;
					} else if(check[1]==token && check[4]==token && check[7]==token){
						$('#result').text('Second Column Win');
						for(var i=1; i<settings.cellNumber; i+=3){
							tictactoe.win_anim($('#square_' + i));
						}
						settings.win = true;
					} else if(check[2]==token && check[5]==token && check[8]==token){
						$('#result').text('Third Column Win');
						for(var i=2; i<settings.cellNumber; i+=3){
							tictactoe.win_anim($('#square_' + i));
						}
						settings.win = true;
					} else if(check[0]==token && check[4]==token && check[8]==token){
						$('#result').text('Diagonal Down Win');
						for(var i=0; i<settings.cellNumber; i+=4){
							tictactoe.win_anim($('#square_' + i));
						}
						settings.win = true;
					} else if(check[2]==token && check[4]==token && check[6]==token){
						$('#result').text('Diagnonal Up Win');
						for(var i=2; i<settings.cellNumber-2; i+=2){
							tictactoe.win_anim($('#square_' + i));
						}
						settings.win = true;
					} else if(settings.draw == settings.cellNumber){
						$('#result').text('Draw');
						setTimeout(function(){
							settings.accumulator = 0;
							main.children().remove();
							var score = settings.score;
							for(var i=0; i<settings.score.length; i++){
								for(var j=0; j<settings.score[i].length; j++){
									settings.score[i][j] = null;
								}
							}
							tictactoe.createBoard(main, score);
						}, 1500);
					}
					if(settings.win){
						setTimeout(function(){
							settings.accumulator = 0;
							settings.draw = 0;
							main.children().remove();
							var score = settings.score;
							for(var i=0; i<settings.score.length; i++){
								for(var j=0; j<settings.score[i].length; j++){
									settings.score[i][j] = null;
								}
							}
							tictactoe.createBoard(main, score);
						}, 1500);
					}
				}
			},
			
			win_anim : function(ob){
				ob.children().css({
					width	: '100%',
					height	: '100%',
					top		: '0',
					left	: '0'
				});
			}
		};

		return this.each(function(){
			var score = settings.score;
			if(Math.sqrt(settings.cellNumber)%1 !=0){
				$(this).text('Number of cells must be a square number. ' + settings.cellNumber + ' is not a square number.');
			} else {
				tictactoe.createBoard($(this), score);
			}
		});
	}
}(jQuery));
