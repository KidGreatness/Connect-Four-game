// Player Variables 
var playerOne,playerTwo;
var playerOneTurn = true;
var playerTwoTurn = false;
var playerOneWins = 0;
var playerTwoWins = 0;
var playerOneLosses = 0;
var playerTwoLosses = 0;
var playerOneTurnCount = 0;
var playerTwoTurnCount = 0;
var playerOneMatchingChipsHor = 0;
var playerTwoMatchingChipsHor = 0;
var playerOneMatchingChipsVer = 0;
var playerTwoMatchingChipsVer = 0;
var gameEnded;

var playerOneChipClass = 'player-one-chip';
var playerTwoChipClass = 'player-two-chip';
var playerOneWinBGClass = 'player-one-win-bg';
var playerTwoWinBGClass = 'player-two-win-bg';

var playerTwoBackgroundClass = 'player-two-background';
var playerTwoTopRowClass = 'player-two-top-row';
var highlightedClass ='highlighted';

var defaultBoardClassese = 'board-holder player-one-background';
var defaultPlayerHubClasses = '';

var chips = document.getElementsByClassName('chip');
var lastChipLocation = chips.length - 1;

var DOMstrings = {
	boardHolder: document.querySelector('.board-holder'),
	board: document.querySelector('.board'),
	topRow: document.querySelector('.holes-row6'),
	playerOneTitle: document.querySelector('.player-one-hub h2'),
	playerTwoTitle: document.querySelector('.player-two-hub h2'),
	newGameButton: document.getElementById('new-game-button'),
	playerOneWinsID: document.getElementById('player-one-wins'),
	playerTwoWinsID: document.getElementById('player-one-losses'),
	playerOneLossesID: document.getElementById('player-two-wins'),
	playerTwoLossesID: document.getElementById('player-two-losses')
};

DOMstrings.newGameButton.addEventListener('click', newGame);
DOMstrings.board.addEventListener('click', function(event) {
	var holeClicked;

	holeClicked = parseInt(event.target.classList[1]);
	
	if (gameEnded !== true) {
			
			if (Number.isInteger(holeClicked)) {
				PlayerTurn();
				placeMoveInGrid(selectColumns(holeClicked));
				winClause();
				winClauseDiagonal();
			}	
	}		
});

var grid = {};
var columnTopArr = [6,5,4,3,2,1,0];
var columnBottomsArr = [41,40,39,38,37,36,35];

var Hole = function (hole, chip, classListNumber, columnID) {
	this.hole = hole;
	this.chip = chip;
	this.playerChipInHole = 0;
	this.chip.classList.add(classListNumber);
	this.columnID = columnID;
	this.isFilled = false;
}

for(var x = 0; x < 7; x++) {
	for (var i = lastChipLocation; i >= 0; i = i - 7) {
		var currentHoleStr = String(i - x);

		var	currentHoleObj = new Hole (Number(currentHoleStr),chips[i - x], i - x, x);

		grid[currentHoleStr] = currentHoleObj;
	}
}

function selectColumns(hole) {
	var currentHoleClicked = grid[hole];
	var lastMove = columnBottomsArr[currentHoleClicked.columnID];

	if (columnBottomsArr[currentHoleClicked.columnID] >= 0) {
		if (playerOneTurn == true) {
				chips[columnBottomsArr[currentHoleClicked.columnID]].classList.add(playerOneChipClass);
		}
		else {
			chips[columnBottomsArr[currentHoleClicked.columnID]].classList.add(playerTwoChipClass);	
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
		DOMstrings.boardHolder.classList.toggle(playerTwoBackgroundClass);
		DOMstrings.topRow.classList.toggle(playerTwoTopRowClass);
		DOMstrings.playerOneTitle.classList.toggle(highlightedClass);
		DOMstrings.playerTwoTitle.classList.toggle(highlightedClass);
		playerOneTurnCount ++;
	}
	else {
		playerTwoTurn = true;
		playerOneTurn = false;
		DOMstrings.boardHolder.classList.toggle(playerTwoBackgroundClass);
		DOMstrings.topRow.classList.toggle(playerTwoTopRowClass);
		DOMstrings.playerOneTitle.classList.toggle(highlightedClass);
		DOMstrings.playerTwoTitle.classList.toggle(highlightedClass);
		playerTwoTurnCount ++;
	}
}

function currentBoardState() {

	for(var x = 0; x < 7; x++) {
		for (var i = lastChipLocation; i >= 0; i = i - 7) {
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
		for (var i = lastChipLocation; i >= 0; i = i - 7) {
			if(grid[i - x].playerChipInHole == 1) {
				playerOneMatches[0].push(i - x);
			} else if(grid[i - x].playerChipInHole == 2) {
				playerTwoMatches[0].push(i - x);
			}	
		}
		
	}
	//Checking horizontal matches
	for (var x = 0; x < 42; x = x + 7) {
		for (var i = lastChipLocation; i > 34; i--) {
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
					if(playerOneAdjacentHoles == 1 && playerOneMatches[x][y] % 7 !== 0){
						playerOneNumOfAdjacentHoles--;
						if (playerOneNumOfAdjacentHoles === 0) return gameOver();
					} else {
						playerOneNumOfAdjacentHoles = 3;
					}
					if(playerTwoAdjacentHoles == 1 && playerTwoMatches[x][y] % 7 !== 0){
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
	if( hole >= 0){
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
		switch (x) {
			case 0:
				for(var i = 14; i < 39; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
			case 1:	
				for(var i = 7; i < 40; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
			case 2:
				for(var i = 0; i < 41; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
			case 3:
				for(var i = 1; i < 42; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
			case 4:
				for(var i = 2; i < 35; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
			case 5:
				for(var i = 10; i < 28; i = i + 8) {
					addHoletoArr(playerOneBackDiagonalArr, playerTwoBackDiagonalArr);
				}
				break;
		}
	}

	for(var x = 0; x < 6; x++) {
		switch (x) {
			case 0:
				for(var i = 20; i < 39; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
			case 1:	
				for(var i = 13; i < 38; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
			case 2:
				for(var i = 6; i < 37; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
			case 3:
				for(var i = 5; i < 36; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
			case 4:
				for(var i = 4; i < 29; i = i + 6) {
					addHoletoArr(playerOneForwardDiagonalArr, playerTwoForwardDiagonalArr);
				}
				break;
			case 5:
				for(var i = 3; i < 22; i = i + 6) {
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
		DOMstrings.playerOneWinsID.textContent = ++playerOneWins;
		DOMstrings.playerTwoLossesID.textContent = ++playerTwoLosses;
		DOMstrings.boardHolder.classList.add(playerOneWinBGClass);
	} else if (playerTwoTurn === true) {
		DOMstrings.playerTwoWinsID.textContent = ++playerTwoWins;
		DOMstrings.playerOneLossesID.textContent = ++playerOneLosses;
		DOMstrings.boardHolder.classList.add(playerTwoWinBGClass);
	}
}

function newGame() {
	columnBottomsArr = [41,40,39,38,37,36,35];
	playerOneTurn = false;
	playerTwoTurn = false;
	playerOneTurnCount = 0;
	playerTwoTurnCount = 0;
	gameEnded = false;

	DOMstrings.boardHolder.classList.value = defaultBoardClassese;
	DOMstrings.playerOneTitle.classList.value = highlightedClass;
	DOMstrings.playerTwoTitle.classList.value = '';
	DOMstrings.topRow.classList.remove(playerTwoTopRowClass);
	
	for(var x = 0; x < 7; x++) {
		for (var i = lastChipLocation; i >= 0; i = i - 7) {
			chips[i - x].classList.value = 'chip ' + (i - x);
			grid[i - x].playerChipInHole = 0;
		}
	}
}

