import KingOfColors from './kingOfColors';
import Player from './models/Player';
import Drawer from './drawer';
import {getRandomArrayElement} from './utils/helper';

function Controller(w, h) {
	this.kingOfColors = new KingOfColors(w, h);
	this.drawer = new Drawer(this.kingOfColors.field, {selectColor:this.playerTurn.bind(this)});
	this.currentPlayerTurn = null;
	this.init();
}

Controller.prototype.init = function () {
	this.kingOfColors.addPlayer(new Player('Oleh'), {x:0, y: 0});
	this.kingOfColors.addPlayer(new Player('Olya'), {x:this.kingOfColors.field.width-1, y: 0});
	this.kingOfColors.addPlayer(new Player('Vasya'), {x:this.kingOfColors.field.width-1, y: this.kingOfColors.field.height-1});
	this.kingOfColors.addPlayer(new Player('Petya'), {x:0, y: this.kingOfColors.field.height-1});

	this.currentPlayerTurn = this.kingOfColors.players[0];//getRandomArrayElement(this.kingOfColors.players).player;
	this.drawer.initializeDrawing();
};

Controller.prototype.playerTurn = function (color) {
	this.currentPlayerTurn.cells.forEach((c)=>c.currentColor = color);
	this.currentPlayerTurn.cells = this.kingOfColors.grabCells(this.currentPlayerTurn.cells);
	this.currentPlayerTurn = this.kingOfColors.getNextPlayer(this.currentPlayerTurn);//next turn
	console.log(this.kingOfColors.players);
	this.drawer.drawField();
};

Controller.prototype.nextTurn = function () {

};

Controller.prototype.useBonus = function (bonus) {

};

export default Controller;