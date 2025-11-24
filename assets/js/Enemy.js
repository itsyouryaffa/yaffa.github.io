import Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.esm.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(false);
    this.setOrigin(0.5,0.5);
    this.hp = 1;
    this.dead = false;
    this.setImmovable(false);
  }

  setVelocityX(v) {
    this.body.setVelocityX(v);
  }

  damage() {
    this.hp -= 1;
    if (this.hp <= 0) {
      this.dead = true;
      this.destroy();
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    // destroy if far left behind camera
    if (this.x < this.scene.cameras.main.scrollX - 400) this.destroy();
  }
}
