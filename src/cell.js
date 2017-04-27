export default class Cell {
	constructor(coords, color) {
		this.coords = coords;
		this.currentColor = color;
		this.owner = null;
		this.bonus = '';
	}
}