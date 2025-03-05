import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('logo', 'logo.png');
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: MainScene
};

export default new Phaser.Game(config);
