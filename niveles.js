import ROT from 'rot-js';

export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DungeonScene' });
  }

  preload() {
    this.load.image('tiles', './assets/tilesets/dungeon.png'); // Agrega tu tileset aquí
    this.load.image('chest', './assets/images/chest.png'); // Cofre
    this.load.image('trap', './assets/images/trap.png'); // Trampa
  }

  create() {
    this.mapWidth = 50;
    this.mapHeight = 50;
    this.tileSize = 16;

    // Crear mapa
    this.dungeon = new ROT.Map.Digger(this.mapWidth, this.mapHeight, {
      roomWidth: [5, 10],
      roomHeight: [5, 10],
      corridorLength: [3, 6],
    });

    this.tiles = [];
    this.rooms = [];
    this.objects = []; // Para cofres y trampas

    // Generar el mapa con ROT.js
    this.dungeon.create((x, y, wall) => {
      if (!this.tiles[x]) this.tiles[x] = [];
      this.tiles[x][y] = wall ? 1 : 0;
    });

    // Almacenar las habitaciones generadas
    this.dungeon.getRooms().forEach((room) => {
      this.rooms.push({
        x1: room.getLeft(),
        y1: room.getTop(),
        x2: room.getRight(),
        y2: room.getBottom(),
      });
    });

    // Renderizar el mapa
    this.renderMap();

    // Generar objetos como cofres y trampas
    this.spawnObjects();
  }

  renderMap() {
    this.tiles.forEach((row, x) => {
      row.forEach((tile, y) => {
        const color = tile === 1 ? 0x000000 : 0xffffff; // Negro para muros, blanco para suelo
        this.add.rectangle(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize, color).setOrigin(0);
      });
    });
  }

  spawnObjects() {
    const objectTypes = ['chest', 'trap'];

    this.rooms.forEach((room) => {
      const centerX = Math.floor((room.x1 + room.x2) / 2);
      const centerY = Math.floor((room.y1 + room.y2) / 2);

      // Escoger un tipo de objeto al azar
      const objectType = objectTypes[Math.floor(Math.random() * objectTypes.length)];

      // Crear el objeto
      const objectSprite = this.add.image(centerX * this.tileSize, centerY * this.tileSize, objectType);
      objectSprite.setOrigin(0.5);

      // Guardar en la lista de objetos
      this.objects.push({ x: centerX, y: centerY, type: objectType });
    });
  }

  update(time, delta) {
    // Aquí manejaremos la lógica de turnos y las interacciones del jugador con el entorno
  }
}
