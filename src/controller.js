import KingOfColors from './kingOfColors';
import Player from './models/Player';
import Drawer from './drawer';
import {getRandomArrayElement} from './utils/helper';

function Controller(w, h) {
	this.kingOfColors = new KingOfColors(w, h);
	this.drawer = new Drawer(this.kingOfColors.field, {selectColor:this.playerTurn});
	this.init();
}

Controller.prototype.init = function () {
	this.kingOfColors.addPlayer(new Player('Oleh'), {x:0, y: 0});
	this.kingOfColors.addPlayer(new Player('Vasya'), {x:this.kingOfColors.field.width-1, y: this.kingOfColors.field.height-1});
	this.kingOfColors.currentPlayerTurn = this.kingOfColors.players[0];//getRandomArrayElement(this.kingOfColors.players).player;
	console.log(this.kingOfColors.players);
};

Controller.prototype.playerTurn = function (color) {
	console.log(color);
};

Controller.prototype.nextTurn = function () {

};

Controller.prototype.useBonus = function (bonus) {

};

export default Controller;