export default class Player {
  constructor(scene, x, y, bulletsGroup) {
    this.scene = scene;
    this.bullets = bulletsGroup;
    this.sprite = scene.physics.add.sprite(x, y, 'player').setCollideWorldBounds(false);
    this.sprite.setBodySize(40,28);
    this.sprite.setBounce(0);
    this.speed = 220;
    this.jumpSpeed = -450;
    this.shootCooldown = 250;
    this.lastShot = 0;

    // auto-run to the right
    this.sprite.setVelocityX(120);
  }

  update(input) {
    // horizontal manual control modifies auto-run slightly
    if (input.left) this.sprite.setVelocityX(-this.speed);
    else if (input.right) this.sprite.setVelocityX(this.speed);
    else this.sprite.setVelocityX(120); // default run

    if (input.up && this.sprite.body.blocked.down) {
      this.sprite.setVelocityY(this.jumpSpeed);
    }

    if (input.shoot && (this.scene.time.now - this.lastShot > this.shootCooldown)) {
      this.shoot();
      this.lastShot = this.scene.time.now;
    }
  }

  shoot() {
    const x = this.sprite.x + 28;
    const y = this.sprite.y;
    const bullet = this.bullets.get(x, y, 'bullet');
    if (bullet) {
      bullet.fire(x, y, 600);
    }
  }
}
