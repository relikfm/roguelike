import ROT from 'rot-js';

export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DungeonScene' });
  }

  preload() {
    this.load.image('tiles', './assets/tilesets/dungeon.png'); // Agrega un tileset
  }

  create() {
    this.mapWidth = 50;
    this.mapHeight = 50;

    // Crear mapa con ROT.js
    this.dungeon = new ROT.Map.Digger(this.mapWidth, this.mapHeight);
    this.tiles = [];

    this.dungeon.create((x, y, wall) => {
      if (!this.tiles[x]) this.tiles[x] = [];
      this.tiles[x][y] = wall ? 1 : 0;
    });

    // Renderizar el mapa con Phaser
    const tileSize = 16;
    this.tiles.forEach((row, x) => {
      row.forEach((tile, y) => {
        const color = tile === 1 ? 0x000000 : 0xffffff; // Negro para muros, blanco para suelos
        this.add.rectangle(x * tileSize, y * tileSize, tileSize, tileSize, color).setOrigin(0);
      });
    });
  }

  update(time, delta) {
    // Aquí agregaremos la lógica del jugador y los turnos
  }
}
