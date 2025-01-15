import DungeonScene from './src/scenes/DungeonScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1d1d1d',
  pixelArt: true,
  scene: [DungeonScene],
};

const game = new Phaser.Game(config);
