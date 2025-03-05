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

    // Bullet group
    this.bullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 50, // Limit the number of bullets
    });

    // Fire rate control
    this.lastFired = 0; // Stores last fired timestamp

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

    // Left Stick Movement
    const xAxis = this.gamepad.axes[0].getValue();
    const yAxis = this.gamepad.axes[1].getValue();
    const speed = 5;

    this.player.x += xAxis * speed;
    this.player.y += yAxis * speed;

    // Right Stick Rotation & Firing
    const rightX = this.gamepad.axes[2].getValue();
    const rightY = this.gamepad.axes[3].getValue();

    if (Math.abs(rightX) > 0.1 || Math.abs(rightY) > 0.1) {
      // Prevents jitter when stick is neutral
      const angle = Math.atan2(rightY, rightX) * (180 / Math.PI); // Convert radians to degrees
      this.player.setAngle(angle); // Rotate player

      // Fire bullet
      this.fireBullet(Phaser.Math.DegToRad(angle)); // Convert back to radians for velocity calculations
    }
  }

  fireBullet(angle) {
    if (!this.bullets || this.time.now < this.lastFired) return;

    const speed = 300; // Bullet speed
    const fireRate = 200; // Milliseconds between shots
    const bulletOffset = 20; // Distance in pixels from player

    // Calculate bullet spawn position slightly in front of the player
    const spawnX = this.player.x + Math.cos(angle) * bulletOffset;
    const spawnY = this.player.y + Math.sin(angle) * bulletOffset;

    // Get a bullet from the group
    const bullet = this.bullets.get(spawnX, spawnY, "bullet");

    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.setRotation(angle);

      // Set bullet velocity
      bullet.body.velocity.x = Math.cos(angle) * speed;
      bullet.body.velocity.y = Math.sin(angle) * speed;

      // Destroy bullet after 2 seconds
      this.time.delayedCall(2000, () => {
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.destroy();
      });

      this.lastFired = this.time.now + fireRate; // Update fire rate timer
    }
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
