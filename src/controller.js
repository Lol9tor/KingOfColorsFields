import KingOfColors from './kingOfColors';
import Player from './models/Player';
import Drawer from './drawer';
import {getRandomArrayElement} from './utils/helper';

class Controller {
	constructor(w, h) {
		this.currentPlayerTurn = null;
		this.kingOfColors = new KingOfColors(w, h);
		this.drawer = new Drawer(this.kingOfColors, {selectColor:this.playerTurn.bind(this)});
	}

	init () {
		this.kingOfColors.addPlayer(new Player('Oleh'), {x:0, y: 0});
		this.kingOfColors.addPlayer(new Player('Olya'), {x:this.kingOfColors.field.width-1, y: 0});
		this.kingOfColors.addPlayer(new Player('Vasya'), {x:this.kingOfColors.field.width-1, y: this.kingOfColors.field.height-1});
		this.kingOfColors.addPlayer(new Player('Petya'), {x:0, y: this.kingOfColors.field.height-1});
		this.kingOfColors.field.createBonuses();

		this.currentPlayerTurn = this.kingOfColors.players[0];//getRandomArrayElement(this.kingOfColors.players).player;
		this.drawer.initializeDrawing();
		this.drawer.render(this.currentPlayerTurn);
	}

	playerTurn (colorName) {
		const availableColors = this.kingOfColors.getAvailableColors();
		const color = availableColors.find((c) => c.name === colorName);
		if (availableColors.includes(color)){
			this.currentPlayerTurn.cells.forEach((c)=>c.currentColor = color);
			this.currentPlayerTurn.cells = this.kingOfColors.grabCells(this.currentPlayerTurn.cells);
			this.currentPlayerTurn = this.kingOfColors.getNextPlayer(this.currentPlayerTurn);//next turn
		
			this.drawer.render(this.currentPlayerTurn);
		}
		
		if (this.kingOfColors.getAvailableCells().length === 0) {
			const leader = this.kingOfColors.getLeader();
			this.drawer.drawWinner(leader);
		}
	}

	nextTurn () {

	}

	useBonus (bonus) {

	}
}

export default Controller;