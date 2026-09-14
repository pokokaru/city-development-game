// Map system
class Map {
    constructor(width, height, cellSize) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.grid = this.initializeGrid();
    }

    initializeGrid() {
        const grid = [];
        for (let x = 0; x < this.width; x++) {
            grid[x] = [];
            for (let y = 0; y < this.height; y++) {
                grid[x][y] = {
                    type: 'empty',
                    building: null,
                    population: 0,
                    happiness: 50
                };
            }
        }
        return grid;
    }

    getGridPos(x, y) {
        const gridX = Math.floor(x / this.cellSize);
        const gridY = Math.floor(y / this.cellSize);
        
        if (gridX >= 0 && gridX < this.width && gridY >= 0 && gridY < this.height) {
            return { x: gridX, y: gridY };
        }
        return null;
    }

    canBuild(gridX, gridY) {
        if (gridX < 0 || gridX >= this.width || gridY < 0 || gridY >= this.height) {
            return false;
        }
        return this.grid[gridX][gridY].type === 'empty';
    }

    setBuild(gridX, gridY, buildingType) {
        if (this.canBuild(gridX, gridY)) {
            this.grid[gridX][gridY].type = buildingType;
            return true;
        }
        return false;
    }

    removeBuild(gridX, gridY) {
        if (this.grid[gridX][gridY].type !== 'empty') {
            this.grid[gridX][gridY].type = 'empty';
            this.grid[gridX][gridY].building = null;
            return true;
        }
        return false;
    }

    draw(ctx) {
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);

        // Draw grid
        ctx.strokeStyle = '#1a3a3a';
        ctx.lineWidth = 1;
        for (let x = 0; x <= this.width; x++) {
            ctx.beginPath();
            ctx.moveTo(x * this.cellSize, 0);
            ctx.lineTo(x * this.cellSize, this.height * this.cellSize);
            ctx.stroke();
        }
        for (let y = 0; y <= this.height; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * this.cellSize);
            ctx.lineTo(this.width * this.cellSize, y * this.cellSize);
            ctx.stroke();
        }

        // Draw buildings
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const cell = this.grid[x][y];
                if (cell.type !== 'empty') {
                    const px = x * this.cellSize;
                    const py = y * this.cellSize;
                    
                    ctx.fillStyle = this.getColorForType(cell.type);
                    ctx.fillRect(px + 1, py + 1, this.cellSize - 2, this.cellSize - 2);
                    
                    // Draw icon
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 20px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(this.getIconForType(cell.type), px + this.cellSize / 2, py + this.cellSize / 2);
                }
            }
        }
    }

    getColorForType(type) {
        const colors = {
            'road': '#444',
            'house': '#FF6B6B',
            'shop': '#FFA500',
            'factory': '#8B4513',
            'park': '#4CAF50'
        };
        return colors[type] || '#666';
    }

    getIconForType(type) {
        const icons = {
            'road': '═',
            'house': '🏠',
            'shop': '🏪',
            'factory': '🏭',
            'park': '🌳'
        };
        return icons[type] || '?';
    }
}
