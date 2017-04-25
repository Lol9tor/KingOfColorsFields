import KingOfColors from './kingOfColors';
import Drawer from './drawer';

function Controller(w, h) {
	this.kingOfColors = new KingOfColors(w, h);
	this.drawer = new Drawer(this.kingOfColors.field);
	this.init();
}

Controller.prototype.init = function () {

};

Controller.prototype.playerMove = function (obj) {
	console.log(obj.data.color);
};

export default Controller;