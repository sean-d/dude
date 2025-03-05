import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    console.log("Preloading assets...");

    // Load player sprite
    this.load.image("player", "src/assets/player.png");

    // You can load more assets here (backgrounds, enemy sprites, etc.)
  }

  create() {
    console.log("Assets loaded. Starting MainScene...");

    // Switch to the main game scene
    this.scene.start("MainScene");
  }
}

export default PreloadScene;
