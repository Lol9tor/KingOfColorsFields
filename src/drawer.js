export default function Drawer(field, handlers) {
	this.cellSize = 30;
	this.field = field;
	this.canvas = null;
	this.colorsPanel = null;
	this.width = field.width * this.cellSize;
	this.height = field.height * this.cellSize;
	this.handlers = handlers;
	this.initializeDrawing();
}

Drawer.prototype.initializeDrawing = function () {
	var canvasEl = document.createElement('canvas'),
		wrapperElement = document.createElement('div');
	wrapperElement.setAttribute('id', 'wrapper');
	canvasEl.width = this.width;
	canvasEl.height = this.height;
	this.canvas = canvasEl.getContext('2d');
	this.colorsPanel = document.createElement('div');
	this.colorsPanel.setAttribute('id', 'colorsPanel');
	this.colorsPanel.style.height = this.height + 'px';
	this.colorsPanel.style.width = this.cellSize * 3 + 'px';
	this.drawField();
	this.drawColorPanel();

	wrapperElement.appendChild(canvasEl);
	wrapperElement.appendChild(this.colorsPanel);
	document.getElementById('root').appendChild(wrapperElement);
};

Drawer.prototype.drawField = function () {
	for (var i = 0; i < this.field.cells.length; i++) {
		for (var j = 0; j < this.field.cells[i].length; j++) {
			var obj = this.field.cells[i][j],
				x = i * this.cellSize,
				y = j * this.cellSize;
			this.canvas.fillStyle = obj.currentColor;
			this.canvas.fillRect(x, y, 0.9 * this.cellSize, 0.9 * this.cellSize); //for making margins between cells
		}
	}
};

Drawer.prototype.drawColorPanel = function () {
	var panelButtonWrapper = document.createElement('div');
	panelButtonWrapper.setAttribute('id', 'panelButtonWrapper');
	for (var i = 0; i < this.field.colors.length; i++) {
		var panelButton = document.createElement('div');
		panelButton.setAttribute('data-color', this.field.colors[i]);
		panelButton.style.height = this.cellSize * 2 + 'px';
		panelButton.style.width = this.cellSize * 2 + 'px';
		panelButton.style.backgroundColor = this.field.colors[i];
		panelButton.addEventListener('click', this.playerMove.bind(this));
		panelButtonWrapper.appendChild(panelButton);
	}
	this.colorsPanel.appendChild(panelButtonWrapper);
};

Drawer.prototype.playerMove = function (e) {
	this.handlers.selectColor(e.currentTarget.getAttribute('data-color'));
};

