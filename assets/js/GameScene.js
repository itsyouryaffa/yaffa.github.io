import Player from '../Player.js';
import Bullet from '../Bullet.js';
import Enemy from '../Enemy.js';

export default class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  preload() {
    // no external assets; textures generated in create
  }

  create() {
    // simple texture generation
    const g = this.add.graphics();
    g.fillStyle(0x1abc9c); g.fillRect(0,0,48,32); g.generateTexture('player',48,32); g.clear();
    g.fillStyle(0xe74c3c); g.fillRect(0,0,28,20); g.generateTexture('enemy',28,20); g.clear();
    g.fillStyle(0xffff00); g.fillRect(0,0,8,4); g.generateTexture('bullet',8,4); g.clear();

    // world
    this.cameras.main.setBackgroundColor('#87CEEB');
    this.physics.world.setBounds(0,0,Number.MAX_SAFE_INTEGER,480);

    // groups
    this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    this.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });

    // player
    this.player = new Player(this, 120, 360, this.bullets);

    // ground
    const ground = this.add.rectangle(400, 470, 1600, 20, 0x2c3e50);
    this.physics.add.existing(ground, true);
    this.physics.add.collider(this.player.sprite, ground);
    this.physics.add.collider(this.enemies, ground);

    // camera follows player horizontally
    this.cameras.main.startFollow(this.player.sprite, true, 0.05, 0.05);
    this.cameras.main.setBounds(0,0,Number.MAX_SAFE_INTEGER,480);

    // collisions
    this.physics.add.overlap(this.bullets, this.enemies, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player.sprite, this.enemies, this.playerHit, null, this);

    // input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // spawn enemies
    this.time.addEvent({ delay: 1400, loop: true, callback: this.spawnEnemy, callbackScope: this });

    // ui
    this.score = 0;
    this.health = 5;
    this.scoreText = this.add.text(10,10,'Score: 0',{fontSize:'18px', fill:'#000'}).setScrollFactor(0);
    this.healthText = this.add.text(10,30,'Health: 5',{fontSize:'18px', fill:'#000'}).setScrollFactor(0);
  }

  spawnEnemy() {
    const x = this.cameras.main.scrollX + 900;
    const y = 360;
    const enemy = new Enemy(this, x, y);
    this.enemies.add(enemy);
    enemy.setVelocityX(-200 - Phaser.Math.Between(0,150));
  }

  hitEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.damage();
    if (enemy.dead) {
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
    }
  }

  playerHit(playerSprite, enemy) {
    enemy.destroy();
    this.health -= 1;
    this.healthText.setText('Health: ' + this.health);
    // temporary invulnerability
    playerSprite.setTint(0xff0000);
    this.time.delayedCall(200, ()=>playerSprite.clearTint());
    if (this.health <= 0) {
      this.scene.restart();
    }
  }

  update(time, delta) {
    const left = this.cursors.left.isDown;
    const right = this.cursors.right.isDown;
    const up = Phaser.Input.Keyboard.JustDown(this.cursors.up);
    const shoot = Phaser.Input.Keyboard.JustDown(this.keySpace);
    this.player.update({ left, right, up, shoot });
  }
}
