// Player Variables 
var playerOne,playerTwo;
var playerOneColor = 'red';
var playerTwoColor = 'yellow';
var playerOneChip = 'player-one-chip';
var playerTwoChip = 'player-two-chip';
var playerOneTurn = false;
var playerTwoTurn = false;
var playerOneTurnCount = 0;
var playerTwoTurnCount = 0;
var lastChipLocation = 0;
var playerOneMatchingChipsHor = 0;
var playerTwoMatchingChipsHor = 0;
var playerOneMatchingChipsVer = 0;
var playerTwoMatchingChipsVer = 0;


var chips = document.getElementsByClassName('chip');
var grid = {};
var columnBottomsArr = [48,47,46,45,44,43,42]

for(var x = 0; x < 7; x++) {
	for (var i = 48; i >= 7; i = i - 7) {
		var currentHoleStr = String(i - x);
		var	currentHoleObj = {};
		currentHoleObj['hole'] = Number(currentHoleStr);
		currentHoleObj['chip'] = chips[i - x];
		currentHoleObj['playerChipInHole'] = 0;
		currentHoleObj.chip.classList.add(i - x);
		currentHoleObj['columnID'] = x;
		currentHoleObj.isFilled = false;

	
		grid[currentHoleStr] = currentHoleObj;
		
		currentHoleObj['holeClicked'] = chips[i - x].onclick = function() {
			PlayerTurn();
			selectColumns(this.classList[1]);
			placeMoveInGrid(this.classList[1]);
		}
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
		playerOneTurnCount ++;
	}
	else {
		playerTwoTurn = true;
		playerOneTurn = false;
		playerTwoTurnCount ++;
	}
}

function currentBoardState() {

	for(var x = 0; x < 7; x++) {
		for (var i = 48; i >= 7; i = i - 7) {
			if(grid[i - x].playerChipInHole == 1) {
				playerOneMatchingChipsVer++;
				console.log(playerOneMatchingChipsVer)
				// if(playerOneMatchingChipsVer > 3) winClause();
			}
			if(grid[i - x].playerChipInHole == 2) playerTwoMatchingChipsVer++;

		}
	}
	playerOneMatchingChipsVer = 0;
}

function winClause() {
	var PlayerOneMatches = 0;
		for (var i = 48; i >= 7; i = i - 7) {
			if(grid[i].playerChipInHole == 1) {
				PlayerOneMatches++;
				console.log(i);
			} else {
				PlayerOneMatches = 0;
			}	
		}
		console.log(playerOneMatchingChipsVer);
	}

function placeMoveInGrid(hole) {
	if (playerOneTurn == true) {
			grid[hole].playerChipInHole =  1;
		}
	else if (playerTwoTurn == true) {
		 	grid[hole].playerChipInHole = 2;
		} 
}
