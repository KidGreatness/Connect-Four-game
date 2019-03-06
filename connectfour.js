// Player Variables 
var playerOne,playerTwo;
var playerOneColor = 'red';
var playerTwoColor = 'yellow';
var playerOneChip = 'player-one-chip';
var playerTwoChip = 'player-two-chip';
var playerOneTurn,playerTwoTurn = false;
var playerOneTurnCount = 0;
var playerTwoTurnCount = 0;
var lastChipLocation = 0;
var playerOneMatchingChipsHor = 0;
var playerTwoMatchingChipsHor = 0;
var playerOneMatchingChipsVer = 0;
var playerTwoMatchingChipsVer = 0;


var holes = document.getElementsByClassName('hole');
var chips = document.getElementsByClassName('chip');
var grid = [];
var columnBottom1 = 42;
var columnBottom2 = 43;
var columnBottom3 = 44;
var columnBottom4 = 45;
var columnBottom5 = 46;
var columnBottom6 = 47;
var columnBottom7 = 48;
var allColumns = {}

for (i = 0; i < 43; i = i + 7) {
	// chips[i].addEventListener("click", columnOne);
	chips[i].onclick = function() { 
		PlayerTurn();
		lastChipLocation = columnOne();
		placeMoveInGrid(lastChipLocation);
	};
	chips[i + 1].onclick = function() { 
		PlayerTurn();
		lastChipLocation = columnTwo();
		placeMoveInGrid(lastChipLocation);
	};
	chips[i + 2].onclick = function() { 
		PlayerTurn();
		lastChipLocation = columnThree();
		placeMoveInGrid(lastChipLocation);
	};
	chips[i + 3].onclick = function() { 
		PlayerTurn();
		lastChipLocation = columnFour();
		placeMoveInGrid(lastChipLocation);
	};
	chips[i + 4].onclick = function() { 
		PlayerTurn();
		lastChipLocation = columnFive();
		placeMoveInGrid(lastChipLocation);
	};
	chips[i + 5].onclick = function() { 
		PlayerTurn();
		lastChipLocation = columnSix();
		placeMoveInGrid(lastChipLocation);
	};
	chips[i + 6 ].onclick = function() { 
		PlayerTurn();
		lastChipLocation = columnSeven();
		placeMoveInGrid(lastChipLocation);
	};
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

function columnOne() {
	var lastMove = columnBottom1;

	if (columnBottom1 >= 7) {
		if (playerOneTurn == true) {
				chips[columnBottom1].classList.add('player-one-chip');
		}
		else {
			chips[columnBottom1].classList.add('player-two-chip');	
		}

		columnBottom1 = columnBottom1 - 7;
		return lastMove;
	}
	else {
		alert("Column full. Select another column");
	}
}
function columnTwo() {
	var lastMove = columnBottom2;

	if (columnBottom2 >= 7) {
		if (playerOneTurn == true) {
				chips[columnBottom2].classList.add('player-one-chip');
		}
		else {
			chips[columnBottom2].classList.add('player-two-chip');	
		}

		columnBottom2 = columnBottom2 - 7;
		return lastMove;
	}
	else {
		alert("Column full. Select another column");
	}
}function columnThree() {
	var lastMove = columnBottom3;

	if (columnBottom3 >= 7) {
		if (playerOneTurn == true) {
				chips[columnBottom3].classList.add('player-one-chip');
		}
		else {
			chips[columnBottom3].classList.add('player-two-chip');	
		}

		columnBottom3 = columnBottom3 - 7;
		return lastMove;
	}
	else {
		alert("Column full. Select another column");
	}
}function columnFour() {
	var lastMove = columnBottom4;

	if (columnBottom4 >= 7) {
		if (playerOneTurn == true) {
				chips[columnBottom4].classList.add('player-one-chip');
		}
		else {
			chips[columnBottom4].classList.add('player-two-chip');	
		}

		columnBottom4 = columnBottom4 - 7;
		return lastMove;
	}
	else {
		alert("Column full. Select another column");
	}
}function columnFive() {
	var lastMove = columnBottom5;

	if (columnBottom5 >= 7) {
		if (playerOneTurn == true) {
				chips[columnBottom5].classList.add('player-one-chip');
		}
		else {
			chips[columnBottom5].classList.add('player-two-chip');	
		}

		columnBottom5 = columnBottom5 - 7;
		return lastMove;
	}
	else {
		alert("Column full. Select another column");
	}
}function columnSix() {
	var lastMove = columnBottom6;

	if (columnBottom6 >= 7) {
		if (playerOneTurn == true) {
				chips[columnBottom6].classList.add('player-one-chip');
		}
		else {
			chips[columnBottom6].classList.add('player-two-chip');	
		}

		columnBottom6 = columnBottom6 - 7;
		return lastMove;
	}
	else {
		alert("Column full. Select another column");
	}
}function columnSeven() {
	var lastMove = columnBottom7;

	if (columnBottom7 >= 7) {
		if (playerOneTurn == true) {
				chips[columnBottom7].classList.add('player-one-chip');
		}
		else {
			chips[columnBottom7].classList.add('player-two-chip');	
		}

		columnBottom7 = columnBottom7 - 7;
		return lastMove;
	}
	else {
		alert("Column full. Select another column");
	}
}

function winClause() {
	for (var x = 48; x > 41; x--) {
		for (var i = 0; i < 36; i = i + 7) {
			console.log(x-i)

			if (grid[x - i] == 1) {
				if (grid[x - i + 7] == 1 && x - i != x)
				playerOneMatchingChipsVer ++;
		    }
		    if (grid[x - i] == 2) {
				if (grid[x - i + 7] == 2 && x - i != x)
				playerTwoMatchingChipsVer ++;
		    }
		}
	}

	for (var x = 7; x <= 42; x = x + 7) {
		for (var i = 0; i < 7; i++) {
			console.log(i + x);

			if (grid[x + i] == 1) {
				if (grid[x + i -1] == 1 && x + i != x)
				playerOneMatchingChipsHor ++;
		    }
		    else if (grid[x + i] == 2) {
				if (grid[x + i -1] == 2 && x + i != x)
				playerTwoMatchingChipsHor ++;
		    }
		}
	}

	if (playerOneMatchingChipsVer >= 3 || playerTwoMatchingChipsVer >= 3) {
		console.log("You win");
		console.log("Player 1: " + playerOneMatchingChipsVer);
		console.log("Player 2: " + playerTwoMatchingChipsVer);
	}
	else {
		console.log("Player 1: " + playerOneMatchingChipsVer);
		console.log("Player 2: " + playerTwoMatchingChipsVer);
		samecolorchipsvert = 0;
		samecolorchipshoriz = 0;
	}
}

function placeMoveInGrid(move) {
	if (playerOneTurn == true) {
			grid[move] =  1;
		}
	else if (playerTwoTurn == true) {
		 	grid[move] = 2;
		} 
}
