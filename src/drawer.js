export default class Drawer {
	constructor(game, handlers) {
		this.cellSize = 30;
		this.field = game.field;
		this.game = game;
		this.canvas = null;
		this.colorsPanel = null;
		this.width = game.field.width * this.cellSize;
		this.height = game.field.height * this.cellSize;
		this.handlers = handlers;
		this.playersViewMode = false;
		// this.initializeDrawing();
	}

	initializeDrawing () {
		const canvasEl = document.createElement('canvas'),
			wrapperElement = document.createElement('div'),
			title =  document.createElement('h2');
		wrapperElement.setAttribute('id', 'wrapper');
		title.textContent = 'King of colorful fields';
		canvasEl.width = this.width;
		canvasEl.height = this.height;
		this.canvas = canvasEl.getContext('2d');
		this.playersPanel =  document.createElement('div');
		this.playersPanel.setAttribute('class', 'playersPanel');
		this.colorsPanel = document.createElement('div');
		this.colorsPanel.setAttribute('id', 'colorsPanel');
		this.colorsPanel.style.height = this.height + 'px';
		this.colorsPanel.style.width = this.cellSize * 3 + 'px';
		// this.render();
		wrapperElement.appendChild(this.playersPanel);
		wrapperElement.appendChild(canvasEl);
		wrapperElement.appendChild(this.colorsPanel);

		const rootEl = document.getElementById('root');
		rootEl.appendChild(title);
		rootEl.appendChild(wrapperElement);

		canvasEl.addEventListener('mousedown', this.handleMouseDown);
		window.addEventListener('mouseup', this.handleMouseUp);
	}

	handleMouseDown () {
		this.playersViewMode = true;
	}

	handleMouseUp () {
		if (this.playersViewMode) {
			this.playersViewMode = false;		
		}
	}

	drawField () {
		for (let i = 0; i < this.field.cells.length; i++) {
			for (let j = 0; j < this.field.cells[i].length; j++) {
				let obj = this.field.cells[i][j],
					x = i * this.cellSize,
					y = j * this.cellSize;
				this.canvas.fillStyle = obj.currentColor;
				this.canvas.fillRect(x, y, 0.93 * this.cellSize, 0.93 * this.cellSize); //for making margins between cells
			}
		}
	}

	drawColorPanel () {
		const panelButtonWrapper = document.createElement('div');
		panelButtonWrapper.setAttribute('id', 'panelButtonWrapper');
		for (let i = 0; i < this.field.colors.length; i++) {
			const panelButton = document.createElement('div'),
				currentColor = this.field.colors[i];
			panelButton.setAttribute('data-color', currentColor);
			panelButton.style.height = this.cellSize * 1.75 + 'px';
			panelButton.style.width = this.cellSize * 1.75 + 'px';
			panelButton.style.lineHeight = this.cellSize * 1.75 + 'px';
			panelButton.style.backgroundColor = currentColor;
			if (this.game.getAvailableColors().includes(currentColor)){
				panelButton.addEventListener('click', this.playerMove.bind(this));
			} else {
				const currentPlayer = this.game.players.find((pl)=>pl.cells[0].currentColor === currentColor);
				panelButton.innerHTML = `<span>${currentPlayer.user}</span>`;
			}
			panelButtonWrapper.appendChild(panelButton);
		}
		this.colorsPanel.innerHTML = '';
		this.colorsPanel.appendChild(panelButtonWrapper);
	}

	drawPlayersPanel (currentPlayer) {
		const listWrapper = document.createElement('ul'),
			list = this.game.players.map((pl)=>{
				return `<li class=${pl.user===currentPlayer.user?'active':''}>${pl.user}:  ${pl.cells.length} cells</li>`;
			});
		listWrapper.innerHTML = list.join('');
		this.playersPanel.innerHTML = '';
		this.playersPanel.appendChild(listWrapper);
	}

	playerMove (e) {
		this.handlers.selectColor(e.currentTarget.getAttribute('data-color'));
	}

	render (currentPlayer) {
		this.drawPlayersPanel(currentPlayer);
		this.drawField();
		this.drawColorPanel();
	}
}
