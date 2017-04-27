import {getUniqueId} from '../utils/helper';

export default class Player {
	constructor(name) {
		this.user = name;
		// this.id = getUniqueId();
		this.cells = [];
		this.currentColor = '';
		this.collectedBonuses = [];
	}
}