import Cell from './cell';
import {getRandomArrayElement} from './utils/helper';

export default class Field {
	constructor(w, h) {
		this.width = w || 20;
		this.height = h || 20;
		this.colors = ['red', 'blue', 'green', 'gold', 'magenta', 'chocolate', 'indigo'];
		this.bonuses = ['bomb', 'freeze', 'mixCells', 'newCells', 'night'];
		this.FREQUANCY_BONUSES = 0.025;
		this.cells = [];
		this.createField();
	}
}

Field.prototype.createField = function () {
	for (var i = 0; i < this.width; i++) {
		this.cells[i] = [];
		for (var j = 0; j < this.height; j++) {
			var cell = new Cell({x: i, y: j}, getRandomArrayElement(this.colors));
			this.cells[i].push(cell);
		}
	}

	var numberOfBonuses = parseInt(this.width * this.height * this.FREQUANCY_BONUSES);
	for (i = 0; i < numberOfBonuses; i++) {
		var bonusCellX = Math.floor(Math.random() * this.cells.length),
			bonusCellY = Math.floor(Math.random() * this.cells[i].length);
		if (this.cells[bonusCellX][bonusCellY].owner === null) {
			this.cells[bonusCellX][bonusCellY].bonus = getRandomArrayElement(this.bonuses);
		} else {
			i--;
			//i ? (i--) : (i=0);
		}
	}
};