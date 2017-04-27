import {getUniqueId} from '../utils/helper';

export default class Score {
	constructor() {
		this.score = 0;
		this.id = getUniqueId();
		this.player = null;
	}
}