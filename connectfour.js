// Player Variables 
var playerOne,playerTwo;
var playerOneChip = 'player-one-chip';
var playerTwoChip = 'player-two-chip';
var playerOneTurn = false;
var playerTwoTurn = false;
var playerOneWins = 0;
var playerTwoWins = 0;
var playerOneLosses = 0;
var playerTwoLosses = 0;
var playerOneTurnCount = 0;
var playerTwoTurnCount = 0;
var lastChipLocation = 0;
var playerOneMatchingChipsHor = 0;
var playerTwoMatchingChipsHor = 0;
var playerOneMatchingChipsVer = 0;
var playerTwoMatchingChipsVer = 0;
var gameEnded;


var chips = document.getElementsByClassName('chip');
var newGameButton = document.getElementById('new-game-button');
var playerOneWinsID = document.getElementById('player-one-wins');
var playerTwoWinsID = document.getElementById('player-one-losses');
var playerOneLossesID = document.getElementById('player-two-wins');
var playerTwoLossesID = document.getElementById('player-two-losses');

newGameButton.addEventListener('click', newGame);
var grid = {};
var columnBottomsArr = [48,47,46,45,44,43,42]

var Hole = function (hole, chip, classListNumber, columnID) {
	this.hole = hole;
	this.chip = chip;
	this.playerChipInHole = 0;
	this.chip.classList.add(classListNumber);
	this.columnID = columnID;
	this.isFilled = false;
}

for(var x = 0; x < 7; x++) {
	for (var i = 48; i >= 7; i = i - 7) {
		var currentHoleStr = String(i - x);

		var	currentHoleObj = new Hole (Number(currentHoleStr),chips[i - x], i - x, x);
		currentHoleObj.chip.addEventListener('click',  function () {
			if (gameEnded !== true) {
				PlayerTurn();
				placeMoveInGrid(selectColumns(this.classList[1]));
				winClause()
				winClauseDiagonal()
			}
		});

		grid[currentHoleStr] = currentHoleObj;
	}
}



function selectColumns(hole) {
	var currentHoleClicked = grid[hole];
	var lastMove = columnBottomsArr[currentHoleClicked.columnID];

	if (columnBottomsArr[currentHoleClicked.columnID] >= 7) {
		if (playerOneTurn == true) {
				chips[columnBottomsArr[currentHoleClicked.columnID]].classList.add('player-one-chip');
		}
		else {
			chips[columnBottomsArr[currentHoleClicked.columnID]].classList.add('player-two-chip');	
		}

		columnBottomsArr[currentHoleClicked.columnID] = columnBottomsArr[currentHoleClicked.columnID] - 7;
		return lastMove;
	}
	else {
		alert("Column full. Select another column");
	}
}

function PlayerTurn() {
	if (playerOneTurnCount == playerTwoTurnCount) {
		playerOneTurn = true;
		playerTwoTurn = false;
		document.querySelector(".board-holder").classList.add('player-two-background');
		document.querySelector(".player-one-hub h2").style.fontWeight = "normal";
		document.querySelector(".player-two-hub h2").style.fontWeight = "bold";
		playerOneTurnCount ++;
	}
	else {
		playerTwoTurn = true;
		playerOneTurn = false;
		document.querySelector(".board-holder").classList.remove('player-two-background');
		document.querySelector(".player-two-hub h2").style.fontWeight = "normal";
		document.querySelector(".player-one-hub h2").style.fontWeight = "bold";
		playerTwoTurnCount ++;
	}
}

function currentBoardState() {

	for(var x = 0; x < 7; x++) {
		for (var i = 48; i >= 7; i = i - 7) {
			if(grid[i - x].playerChipInHole == 1) {
				playerOneMatchingChipsVer++;
				console.log('player 1: ' + playerOneMatchingChipsVer);
				// if(playerOneMatchingChipsVer > 3) winClause();
			}
			if(grid[i - x].playerChipInHole == 2) {
				playerTwoMatchingChipsVer++;
				console.log('player 2: ' + playerTwoMatchingChipsVer);
			}

		}
	}
	playerOneMatchingChipsVer = 0;
	playerTwoMatchingChipsVer = 0;
}

function winClause() {
	var playerOneMatches = [ [], [] ];
	var playerTwoMatches = [ [], [] ];
	//Checking vertical matches
	for(var x = 0; x < 7; x++) {
		for (var i = 48; i >= 7; i = i - 7) {
			if(grid[i - x].playerChipInHole == 1) {
				playerOneMatches[0].push(i - x);
			} else if(grid[i - x].playerChipInHole == 2) {
				playerTwoMatches[0].push(i - x);
			}	
		}
		
	}
	//Checking horizontal matches
	for (var x = 0; x < 42; x = x + 7) {
		for (var i = 48; i > 41; i--) {
			if(grid[i - x].playerChipInHole == 1) {
				playerOneMatches[1].push(i - x);
			} else if(grid[i - x].playerChipInHole == 2) {
				playerTwoMatches[1].push(i - x);
			}	
		}
	}

	verifyAdjacent(playerOneMatches,playerTwoMatches);
}

function verifyAdjacent(playerOneMatches,playerTwoMatches) {
	var playerOneNumOfAdjacentHoles = 3;
	var playerTwoNumOfAdjacentHoles = 3;
	
	for (x = 0; x < 2; x++) {
		for(var y = 0; y < playerOneMatches[x].length; y++) {
			var playerOneAdjacentHoles = playerOneMatches[x][y] - playerOneMatches[x][y + 1];
			var playerTwoAdjacentHoles = playerTwoMatches[x][y] - playerTwoMatches[x][y + 1];
			
			switch (x) {

				case 0:
					if(playerOneAdjacentHoles == 7){
						playerOneNumOfAdjacentHoles--;
						if (playerOneNumOfAdjacentHoles === 0) return gameOver();
					} else {
						playerOneNumOfAdjacentHoles = 3;
					}
					if(playerTwoAdjacentHoles == 7){
						playerTwoNumOfAdjacentHoles--;
						if (playerTwoNumOfAdjacentHoles === 0) return gameOver();
					} else {
						playerTwoNumOfAdjacentHoles = 3;
					}
					break;

				case 1:
					if(playerOneAdjacentHoles == 1){
						playerOneNumOfAdjacentHoles--;
						if (playerOneNumOfAdjacentHoles === 0) return gameOver();
					} else {
						playerOneNumOfAdjacentHoles = 3;
					}
					if(playerTwoAdjacentHoles == 1){
						playerTwoNumOfAdjacentHoles--;
						if (playerTwoNumOfAdjacentHoles === 0) return gameOver();
					} else {
						playerTwoNumOfAdjacentHoles = 3;
					}
					break;

				default:
					playerOneNumOfAdjacentHoles = 3;	
					playerTwoNumOfAdjacentHoles = 3;
						
			}
			
		}
	}
}

function placeMoveInGrid(hole) {
	if( hole >= 7){
		if (playerOneTurn == true) {
				grid[hole].playerChipInHole =  1;
			}
		else if (playerTwoTurn == true) {
			 	grid[hole].playerChipInHole = 2;
			}
	} 
}

function winClauseDiagonal() {
	var playerOneBackDiagonalArr = [ [],[],[],[],[],[] ];
	var playerTwoBackDiagonalArr = [ [],[],[],[],[],[] ];
	var playerOneForwardDiagonalArr = [ [],[],[],[],[],[] ];
	var playerTwoForwardDiagonalArr = [ [],[],[],[],[],[] ];

	function addHoletoArr (playerOneDiagonalArr, playerTwoDiagonalArr) {
		if(grid[i].playerChipInHole == 1) {
			playerOneDiagonalArr[x].push(i);
		} else if(grid[i].playerChipInHole == 2) {
			playerTwoDiagonalArr[x].push(i);
		}
	}
	
	for(var x = 0; x < 6; x++) {
		switch (x){
			case 0:
				for(var i = 21; i < 46; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
			case 1:	
				for(var i = 14; i < 47; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
			case 2:
				for(var i = 7; i < 48; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
			case 3:
				for(var i = 8; i < 49; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
			case 4:
				for(var i = 9; i < 42; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
			case 5:
				for(var i = 10; i < 35; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
		}
	}

	for(var x = 0; x < 6; x++) {
		switch (x){
			case 0:
				for(var i = 27; i < 46; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
			case 1:	
				for(var i = 20; i < 45; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
			case 2:
				for(var i = 13; i < 44; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
			case 3:
				for(var i = 12; i < 43; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
			case 4:
				for(var i = 11; i < 36; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
			case 5:
				for(var i = 10; i < 29; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
		}
	}

	verifyDiagonal(playerOneBackDiagonalArr, playerTwoBackDiagonalArr, playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
}

function verifyDiagonal(playerOneBackDiagonalArr, playerTwoBackDiagonalArr,
						playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr) {
	var playerOneNumBackAdjacentHoles = 3;
	var playerTwoNumBackAdjacentHoles = 3;
	var playerOneNumForwardAdjacentHoles = 3;
	var playerTwoNumForwardAdjacentHoles = 3;
	var diagonalArrLength = [4,5,6,6,5,4];

	
	for (var x = 0; x < 6; x++) {
		for (var i = 0; i < diagonalArrLength[x]; i++) {
			var playerOneBackAdjacentHoles = playerOneBackDiagonalArr[x][i] - playerOneBackDiagonalArr[x][i + 1];
			var playerTwoBackAdjacentHoles = playerTwoBackDiagonalArr[x][i] - playerTwoBackDiagonalArr[x][i + 1];
			var playerOneForwardAdjacentHoles = playerOneForwardDiagonalArr[x][i] - playerOneForwardDiagonalArr[x][i + 1];
			var playerTwoForwardAdjacentHoles = playerTwoForwardDiagonalArr[x][i] - playerTwoForwardDiagonalArr[x][i + 1];
		
			if (playerOneBackAdjacentHoles == -8) {
				playerOneNumBackAdjacentHoles--;
				if (playerOneNumBackAdjacentHoles === 0) return gameOver();
			} else {
				playerOneNumBackAdjacentHoles = 3;
			}
		
			if (playerTwoBackAdjacentHoles == -8) {
				playerTwoNumBackAdjacentHoles--;
				if (playerTwoNumBackAdjacentHoles === 0) return gameOver();
			} else {
				playerTwoNumBackAdjacentHoles = 3;
			}

			if (playerOneForwardAdjacentHoles == -6) {
				playerOneNumForwardAdjacentHoles--;
				if (playerOneNumForwardAdjacentHoles === 0) return gameOver();
			} else {
				playerOneNumForwardAdjacentHoles = 3;
			}
		
			if (playerTwoForwardAdjacentHoles == -6) {
				playerTwoNumForwardAdjacentHoles--;
				if (playerTwoNumForwardAdjacentHoles === 0) return gameOver();
			} else {
				playerTwoNumForwardAdjacentHoles = 3;
			}
			
		}
	}
}

function gameOver() {
	gameEnded = true;

	if (playerOneTurn === true) {
		playerOneWinsID.textContent = ++playerOneWins;
		playerTwoLossesID.textContent = ++playerTwoLosses;
		document.querySelector(".board-holder").classList.add('player-one-win-bg');
	} else if (playerTwoTurn === true) {
		playerTwoWinsID.textContent = ++playerTwoWins;
		playerOneLossesID.textContent = ++playerOneLosses;
		document.querySelector(".board-holder").classList.add('player-two-win-bg');
	}
}

function newGame() {
	columnBottomsArr = [48,47,46,45,44,43,42]
	playerOneTurn = false;
	playerTwoTurn = false;
	playerOneTurnCount = 0;
	playerTwoTurnCount = 0;
	gameEnded = false;

	document.querySelector(".board-holder").classList.value = "board-holder player-one-background";
	document.querySelector(".player-one-hub h2").style.fontWeight = "bold";
	
	for(var x = 0; x < 7; x++) {
		for (var i = 48; i >= 7; i = i - 7) {
			chips[i - x].classList.value = 'chip ' + (i -x);
			grid[i - x].playerChipInHole = 0;
		}
	}
}
