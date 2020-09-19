import Field from './field';
import { colors } from './config/config'
import {getRandomArrayElement} from './utils/helper';

export default class KingOfColors {
	constructor(w, h) {
		this.field = new Field(w, h);
		this.players = [];
	}

	addPlayer(player, initCell) {
		const isPlayerInGame = !!this.players.find((p)=>player.user === p.user);
		const availableColors = this.getAvailableColors();
		console.log(availableColors);
		
		if (!isPlayerInGame){
			this.field.cells[initCell.x][initCell.y].currentColor = getRandomArrayElement(availableColors);
			this.field.cells[initCell.x][initCell.y].owner = player.user;
			player.cells = this.grabCells([this.field.cells[initCell.x][initCell.y]]);
			this.players.push(player);
		}
	}

	getAvailableColors () {
		const colorsInUse = this.players.map((p)=>p.cells[0].currentColor.main);
		
		return colors.gameField.filter((c) => !colorsInUse.includes(c.main));
	}

	getNextPlayer (player) {
		let index = this.players.findIndex((p)=>p.user === player.user)+1;
		if (index === this.players.length){
			index = 0;
		}
		return this.players[index];
	}

	grabCells (cells) {
		for (let i = 0; i < cells.length; i++) {
			const newCellsArr = this.checkNearestCells(cells[i], this.field.cells);
			cells = cells.concat(newCellsArr);
		}
		return cells;
	};

	checkNearestCells (cell, cellsArray) {
		const newCellsArr = [],
			x = cell.coords.x,
			y = cell.coords.y,
			mapCells = [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1]
			];
		for (let i = 0; i < mapCells.length; i++) {
			const nextX = x + mapCells[i][0],
				nextY = y + mapCells[i][1];
			if (this.isCellExist(nextX, nextY, cellsArray)) {
				const nextCell = cellsArray[nextX][nextY];
				if (this.isNextCellFit(cell, nextCell)) {
					nextCell.owner = cell.owner;
					newCellsArr.push(nextCell);
				}
			}
		}
		return newCellsArr;
	}

	isCellExist (x, y, arr) {
		return x >= 0 && y >= 0 && x < arr.length && y < arr[x].length;
	}

	isNextCellFit (currentCell, nextCell) {
		return nextCell.owner === null &&
			nextCell.currentColor === currentCell.currentColor;
	}
}

