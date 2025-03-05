import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    console.log("Preloading assets...");

    this.load.image("player", "src/assets/player.png");
    this.load.image("bullet", "src/assets/bullet.png");
    this.load.image("bullet", "src/assets/bullet.png");
  }

  create() {
    console.log("Assets loaded. Starting MainScene...");

    // Switch to the main game scene
    this.scene.start("MainScene");
  }
}

export default PreloadScene;
