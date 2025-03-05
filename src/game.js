import Phaser from "phaser";
import PreloadScene from "./preload.js";

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    // Create the player sprite
    this.player = this.physics.add.sprite(400, 300, "player");

    // Ensure player stops exactly at the world edges
    this.player.setCollideWorldBounds(true);

    // Adjust the collision box to prevent clipping at the edges
    this.player.body.setSize(this.player.width, this.player.height);
    this.player.setOrigin(0.5, 0.5); // Ensure the hitbox is centered correctly

    // Scale the sprite (if needed)
    this.player.setScale(1);

    // Set world boundaries
    this.physics.world.setBounds(0, 0, 1280, 720);

    // Store reference to connected gamepad
    this.gamepad = null;

    // Listen for gamepad connection
    if (this.input.gamepad) {
      this.input.gamepad.once("connected", (pad) => {
        console.log("Gamepad connected:", pad);
        this.gamepad = pad;
      });
    } else {
      console.warn("Gamepad input is not available.");
    }
  }

  update() {
    if (!this.gamepad) return; // If no gamepad, exit update

    // Get left stick movement
    const xAxis = this.gamepad.axes[0].getValue(); // Left stick X
    const yAxis = this.gamepad.axes[1].getValue(); // Left stick Y

    // Adjust player position based on stick movement
    const speed = 5; // Adjust speed if needed
    this.player.x += xAxis * speed;
    this.player.y += yAxis * speed;
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1280, // ✅ Set width to 720p resolution
  height: 720, // ✅ Set height to 720p resolution
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  input: {
    gamepad: true, // ✅ Ensures gamepad input is enabled
  },
  scene: [PreloadScene, MainScene],
};

export default new Phaser.Game(config);
