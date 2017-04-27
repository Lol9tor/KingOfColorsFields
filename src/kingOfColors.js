import Field from './field';

export default class KingOfColors {
	constructor(w, h) {
		this.field = new Field(w, h);
		this.players = [];
		this.currentPlayerTurn = null;
	}
}

KingOfColors.prototype.addPlayer = function (player, initCell) {
	const isPlayerInGame = !!this.players.find((p)=>player.user === p.user);
	if (!isPlayerInGame){
		this.field.cells[initCell.x][initCell.y].owner = player.user;
		player.cells = this.grabCells([this.field.cells[initCell.x][initCell.y]]);
		this.players.push(player);
	}
};

KingOfColors.prototype.grabCells = function (cells) {
	for (var i = 0; i < cells.length; i++) {
		var newCellsArr = this.checkNearestCells(cells[i], this.field.cells);
		cells = cells.concat(newCellsArr);
	}
	return cells;
};

KingOfColors.prototype.checkNearestCells = function (cell, cellsArray) {
	var newCellsArr = [],
		x = cell.coords.x,
		y = cell.coords.y,
		mapCells = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1]
		];
	for (var i = 0; i < mapCells.length; i++) {
		var nextX = x + mapCells[i][0],
			nextY = y + mapCells[i][1];
		if (this.isCellExist(nextX, nextY, cellsArray)) {
			var nextCell = cellsArray[nextX][nextY];
			if (this.isNextCellApproach(cell, nextCell)) {
				nextCell.owner = cell.owner;
				newCellsArr.push(nextCell);
			}
		}
	}
	return newCellsArr;
};

KingOfColors.prototype.isCellExist = function (x, y, arr) {
	return x >= 0 && y >= 0 && x < arr.length && y < arr[0].length;
};

KingOfColors.prototype.isNextCellApproach = function (currentCell, nextCell) {
	return nextCell.owner === null &&
		nextCell.currentColor === currentCell.currentColor;
};

