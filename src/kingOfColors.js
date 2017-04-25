export default function KingOfColors(w, h) {
    this.field = new Field(w, h);
    this.player = new Player('Oleh');
    this.field.cells[0][0].owner = this.player.name; // todo hardcode
    this.player.cells = this.grabCells([this.field.cells[0][0]]);
    console.log(this.player);
}

KingOfColors.prototype.grabCells = function (cells) {
    for (var i = 0; i < cells.length; i++) {
        var newCellsArr = this.checkNearestCells(cells[i], this.field.cells);
        console.log(newCellsArr);
        cells = cells.concat(newCellsArr);
    }
    return cells;
};

KingOfColors.prototype.checkNearestCells = function (cell, cellsArray) {
    var newCellsArr = [],
        x = cell.coords.x,
        y = cell.coords.y,
        mapCells = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1]
        ];
    for (var i = 0; i < mapCells.length; i++) {
        var nextX = x+mapCells[i][0],
            nextY = y+mapCells[i][1];
        if(this.isCellExist(nextX, nextY, cellsArray)){
            var nextCell = cellsArray[nextX][nextY];
            if(this.isNextCellApproach(cell, nextCell)){
                nextCell.owner = cell.owner;
                newCellsArr.push(nextCell);
            }
        }
    }
    return newCellsArr;
};

KingOfColors.prototype.isCellExist = function (x, y, arr) {
    return x>=0 && y>=0 && x<arr.length && y<arr[0].length;
};

KingOfColors.prototype.isNextCellApproach = function (currentCell, nextCell) {
    return nextCell.owner === 'empty' &&
        nextCell.currentColor === currentCell.currentColor;
};

function Player(name) {
    this.name = name;
    this.cells = null;
    this.currentColor = '';
    this.collectedBonuses = [];
}

function Field(w, h) {
    this.width = w || 20;
    this.height = h || 20;
    this.colors = ['red', 'blue', 'green', 'Gold', 'Magenta', 'Chocolate', 'Indigo'];
    this.bonuses = ['bomb', 'freeze', 'mixCells', 'newCells', 'night'];
    this.FREQUANCY_BONUSES = 0.025;
    this.cells = [];
    this.createField();
}

Field.prototype.chooseRandomElementArray = function (array) {
    var randomNumber = Math.floor(Math.random()*(array.length)-0.001);// -0.001 to never get array.length
    return array[randomNumber];
};

Field.prototype.createField = function () {
    for (var i = 0; i < this.width; i++) {
        this.cells[i] = [];
        for (var j = 0; j < this.height; j++) {
            var cell = new Cell();
            cell.currentColor = this.chooseRandomElementArray(this.colors);
            cell.coords = {x: i, y: j};
            this.cells[i].push(cell);
        }
    }

    var numberOfBonuses = parseInt(this.width*this.height*this.FREQUANCY_BONUSES);
    for (i = 0; i < numberOfBonuses; i++) {
        var bonusCellX = Math.floor(Math.random()*this.cells.length),
            bonusCellY = Math.floor(Math.random()*this.cells[i].length);
        if (this.cells[bonusCellX][bonusCellY].owner == 'empty'){
            this.cells[bonusCellX][bonusCellY].bonus = this.chooseRandomElementArray(this.bonuses);
        } else{
            i--;
            //i ? (i--) : (i=0);
        }
    }
};

function Cell() {
    this.coords = null;
    this.currentColor = '';
    this.owner = 'empty';
    this.bonus = '';
}