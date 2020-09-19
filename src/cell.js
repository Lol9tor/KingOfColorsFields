import { colors } from './config/config';
export default class Cell {
	constructor(coords, color) {
		this.coords = coords;
		this.currentColor = color;
		this.owner = null;
		this.bonus = null;
	}
}

export class InactiveCell extends Cell {
	constructor() {
		this.currentColor = colors.inactiveColor; // TODO color must be an object
	}

	set bonus(value) {
		this.bonus = null;	
	}

	set owner(value) {
		this.owner = null;	
	}
}