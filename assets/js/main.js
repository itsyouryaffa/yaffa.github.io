import Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.esm.js';
import GameScene from '../GameScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 1000 }, debug: false }
  },
  scene: [GameScene]
};

new Phaser.Game(config);
