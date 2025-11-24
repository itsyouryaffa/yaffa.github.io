import Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.esm.js';

export default class Bullet extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setActive(false);
    this.setVisible(false);
    this.setCollideWorldBounds(false);
  }

  fire(x, y, speed) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(speed);
    // remove when offscreen
    this.scene.time.delayedCall(3000, ()=>{ if (this.active) this.destroy(); });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > this.scene.cameras.main.scrollX + 1100 || this.x < this.scene.cameras.main.scrollX - 200) {
      this.destroy();
    }
  }
}
