# Dude: Twin-Stick Shooter Development Plan

## Useful Links for Reference
* Electron info portal: https://www.electronjs.org/docs/latest/
* Electron api: https://www.electronjs.org/docs/latest/api/app
* Phaser examples: https://phaser.io/examples/v3.85.0
* Phaser docs: https://docs.phaser.io/phaser/getting-started/what-is-phaser
* Phaser api: https://docs.phaser.io/api-documentation/api-documentation
* typescript docs: https://www.typescriptlang.org/docs/

## 1. Core Game Overview
- **Game Type**: 2D **top-down twin-stick shooter**.
- **Engine & Tech Stack**: **Electron + Phaser + TypeScript**.
- **Local Co-op**: **Two players**, each using **their own controller** (no keyboard/mouse).
- **Platforms**: **Windows (AMD64), Linux (AMD64), macOS (AMD64)**.
- **Distribution**: Planned **Steam release**.

## 2. Gameplay Features
- **Fast-paced twin-stick combat** where players fight enemies in a top-down view.
- **Wave-based enemy spawning** that increases in difficulty.
- **Gamepad-only controls** for movement, aiming, and shooting.
- **Predefined 12-song soundtrack**, with gameplay synced to music intensity.

## 3. Music-Driven Gameplay (Intensity Maps)

### **Wave System**
- Waves of enemies spawn at **regular intervals**.
- **Story Mode** uses **static waves** with pre-planned enemy sequences.
- **Playlist Mode** uses **music-driven waves** where enemy spawns, difficulty, and attack speed shift dynamically based on intensity maps.
- - **Precomputed intensity maps** for each song (stored as JSON).
- Maps include **timestamps, intensity levels, and beat events**.
- **Intensity affects**:
  - Enemy movement speed and bullet speed.
  - The glow/effects of all projectiles.
  - The effects of pickup items (currency, special items).
- **Higher bass = stronger attacks + greater visual intensity.**

### **Enemy Types & Music-Based Spawns**
- **Story Mode:** Enemy types are **pre-planned per wave** and do not change dynamically.
- **Playlist Mode:** Enemy types **shift dynamically based on music frequencies** (e.g., bass-heavy parts spawn tankier enemies, high-treble sections spawn faster ones).

### **Special Items & Music-Driven Power-ups**
- Players can purchase and equip **special items** from the **In-Game Store**.
- These are assigned to **R1, R2, L1, L2** and provide **temporary or consumable effects**.
- **Special Item Examples:**
  - **Shields**: Lower intensity = **longer duration**, higher intensity = **shorter but stronger effect**.
  - **Speed Boosts**: Higher intensity = **faster movement, shorter duration**.
  - **Weapon Damage Buffs**: Higher intensity = **greater damage, shorter effect**.
  - **Slow Enemy Field**: A deployable item that **slows all enemies in an area**.
  - **Turret Drop**: Deploys a **stationary turret** that auto-fires at enemies.
  - **Orb Shield**: Spawns **orbiting projectiles** that **damage enemies on contact**.
  - **Healing Field**: Drops a **regenerative area** that absorbs some incoming damage.

- Power-up effects are **influenced by music intensity**.
- Higher intensity = **shorter power-up duration**.
- Lower intensity = **longer-lasting power-ups**.
- This ensures **gameplay dynamically scales in challenge** with the music.
- Currently, **power-ups will remain consistent regardless of music intensity.**
- **Possible future option:** A mode toggle in settings where:
  - Higher intensity = shorter power-up duration.
  - Lower intensity = longer-lasting power-ups.
- This could provide **dynamic challenge scaling** if enabled.

## 4. Difficulty, Revives, and Hardcore Mode

### **Co-op Revival System**
- **By default, there is NO revive ability** (once you’re dead, you stay dead unless you have lives left).
- **Players can unlock the revive mechanic through currency upgrades in the shop.**
- **Revival works by touching the downed player before the timer runs out.**
- **Upgrades increase the revival window** (e.g., starts at 3 seconds, maxes out at 10 seconds).

### **Special Revival Shards**
- **If a player collects 4 revival shards, they get an instant revival.**
- **Works in both Co-op and Singleplayer (revive yourself in singleplayer).**
- **Does NOT require touching a teammate—it just brings you back instantly.**
- **Button TBD for triggering the revival manually in single-player.**

### **Elite & Boss Damage Scaling**
- **Elites deal more punishing attacks**, but still **one-hit kill the player**.
- **Bosses remain one-hit kills**, but...  
- **Consideration:** Harder difficulties or special modes could introduce a **player health bar**, allowing for multiple hits before death.

### **Shield Mechanics**
- Shields **fully protect the player for 10 seconds** (not just one-hit absorption).
- If **both players have shields**, they can **push aggressively without risk**.

### **Hardcore Mode Consideration**
- **One life only** (no revives, no continues).  
- **Enemies are far more aggressive.**  
- **Limited resources, potentially fewer power-ups.**  
- **Designed for extreme challenge seekers.**  

## 5. Playlist Mode Considerations

### **How Playlist Transitions Work**
- **Game will NOT force artificial pauses or breaks.**
- **Everything follows the intensity map of each song naturally.**
- **If song A is fast-paced, the game remains intense.**
- **If song B starts slow, everything (enemies, projectiles, visuals) will naturally slow down.**
- **No forced “breather” moments—only what the music dictates.**
- **Items are still collectable during transitions.**

## 6. Boss AI Adaptation Considerations
- **Bosses will change attack patterns dynamically** based on player behavior.
- Possible adaptations:
  - **Dodging too much?** Boss speeds up attacks or uses AoE to limit movement.
  - **Staying too far?** Boss uses tracking projectiles or fast closing attacks.
  - **Always in close range?** Boss counters with melee or knockback effects.
  - **Spamming attacks?** Boss raises shields or bullet-reflecting abilities.

## 7. Gameplay Considerations

To ensure the game **feels responsive and satisfying**, the following design principles will be implemented:

### **1. Responsive Controls**
- Ensure **low input latency** for movement and shooting.
- Avoid input lag by **minimizing physics-based movement delays**.
- Fine-tune **acceleration/deceleration curves** for smooth movement.

### **2. Balanced Visual Effects**
- Use **glow and pulsing effects dynamically**, but avoid **visual clutter**.
- Ensure projectiles, enemy attacks, and player actions are **clearly visible** at all times.
- Keep the screen readable even at high-intensity moments.

### **3. Effective Sound Design**
- Implement **punchy, satisfying weapon sounds** for feedback.
- Use **dynamic music intensity adjustments** to enhance the action.
- Ensure enemies provide **distinct audio cues** for attacks and movement.

### **4. Input Buffering for Smooth Gameplay**
- Allow **input buffering** for shooting and dodging mechanics.
- Ensure that **quick actions** (e.g., changing direction, dodging) feel responsive.

### **5. Clear Visual Feedback**
- Ensure **enemy hit effects** are visually distinct.
- Implement **damage indicators** to make it clear when the player is hit.
- Add **screen shake and impact effects** for significant gameplay moments.

By prioritizing these considerations, the game will **feel polished, responsive, and engaging**, making it a high-quality twin-stick shooter experience.
## 8. In-Game Store
- Players earn **currency from defeated enemies**.
- Currency **persists across runs** and can be used to buy **permanent upgrades**.
- Available purchases:
  - **Additional starting lives** (increase beyond three).
  - **Weapon upgrades** (fire rate, damage, bullet speed, etc.).
  - **Shields** (increase duration, number of uses, or faster cooldown).
  - **Revival time extension** (in co-op, extends the time a downed player can be revived).

## 9. Game Modes
### **Story Mode (Static Waves)**
- A **curated experience** where enemy waves are **pre-designed**.
- Each song has a **fixed sequence** of enemy spawns, ensuring a structured challenge.
- Enemies still **react to music intensity**, but spawn types and timing are **fixed**.
- **Boss battles** occur at **pre-planned moments**.
- Supports **both single-player and local co-op**.

### **Playlist & Single-Song Mode (Music-Driven Waves)**
- **Dynamically generated** enemy waves based on **music intensity**.
- Higher intensity = **More enemies, stronger enemies, or faster attacks**.
- Enemy types can be influenced by **frequency bands** (e.g., bass-heavy songs spawn tankier enemies, high-treble songs spawn faster enemies).
- **Boss battles** may be triggered by **reaching peak intensity levels**.
- Supports **both single-player and local co-op**.

## 8. Co-op Revive System
- **Revival Shards are per-run only** and **reset at the start of each game**.
- Revivals created from shards are also **per-run**.
- The only persistent revival-related upgrades are:
  - The **perk that enables Revival Shards**.
  - Upgrades that **increase the time window to revive a co-op player**.
- **If a player dies mid-wave**, they will **automatically revive at the start of the next wave** if their partner survives.
- **Story Mode Specific:** If a player dies **in a section**, they will rejoin when advancing to the next section.
- **Mid-Wave Revives:**
  - A player can **spend currency** (if they have the **'Pay to Win, The EA Way' perk**) to instantly revive their partner.
  - **Revival Shards:**
    - **Dropped exclusively by bosses.**
    - Collect **3 shards** to gain an **instant revival**.
    - The UI will show how many revival shards are available.
    - Press **X** to revive (button is configurable in settings).

- If a player dies, they can be **revived when the next wave starts**.
- Alternatively, the surviving player can **collect a revive item or spend currency** to bring them back instantly.
- In later waves, the cost of reviving a co-op partner may **increase** to add challenge.

## 8. Co-op Revive System
- **Revival Shards are per-run only** and **reset at the start of each game**.
- Revivals created from shards are also **per-run**.
- The only persistent revival-related upgrades are:
  - The **perk that enables Revival Shards**.
  - Upgrades that **increase the time window to revive a co-op player**.
- **If a player dies mid-wave**, they will **automatically revive at the start of the next wave** if their partner survives.
- **Story Mode Specific:** If a player dies **in a section**, they will rejoin when advancing to the next section.
- **Mid-Wave Revives:**
  - A player can **spend currency** (if they have the **'Pay to Win, The EA Way' perk**) to instantly revive their partner.
  - **Revival Shards:**
    - **Dropped exclusively by bosses.**
    - Collect **3 shards** to gain an **instant revival**.
    - The UI will show how many revival shards are available.
    - Press **X** to revive (button is configurable in settings).
- **If a player dies mid-wave**, they will **automatically revive at the start of the next wave** if their partner survives.
- **Story Mode Specific:** If a player dies **in a section**, they will rejoin when advancing to the next section.
- **Mid-Wave Revives:**
  - A player can **spend currency** (if they have the **'Pay to Win, The EA Way' perk**) to instantly revive their partner.
  - **Revival Shards**: Bosses drop **Revival Shards**, and collecting **3 shards** allows an **instant revive** without needing to touch a downed teammate.

## 9. Perk Mode: Shared vs. Individual
- Players can **choose how perks work** before starting a run.
- **Game Setting:**
  - **Shared Perks**: Both players share the same set of perks.
  - **Individual Perks**: Each player selects their own set of perks.
- **Unlocking Perk Slots:**
  - All players start with **2 perk slots**.
  - **Money collected is shared** and used to unlock more perk slots.
  - Once unlocked, **all players gain access to the new slots**.
- **Perk Selection Mechanics:**
  - Once a run starts, **perk selections are locked in and cannot be changed until the next run.**
  - Once unlocked, **perks can be freely set before each new game**.
  - If using **Shared Mode**, one player picks perks for the team.
  - If using **Individual Mode**, each player selects their own perks.
- **Perk Balancing & Stacking Rules:**
  - If both players **equip the same perk**, its effect scales, but with diminishing returns.
  - Example: The **Extra Currency Drop** perk:
    - **1 player equipped** = **1.5x currency drop**.
    - **Both players equipped** = **2x currency drop** (not 3x).
- **Perk Drafting System (Optional Future Idea):**
  - If using Individual Mode, both players **cannot equip the same perk at the same time**.
  - Players must **strategically divide perks** to maximize effectiveness.
  - If there are 5 unlocked perks but only 3 slots per player, **one perk remains unused**.

## 10. Debug Console & Cheat Options

- Players can open a **debug console** using the **tilde (`~`) key**.
- The debug console will include **real-time system stats, debugging tools, and cheat options**.

### **Debug Tools**
- **Log Output**: Debug logs will be **displayed on-screen and saved to a log file** **only when debugging mode is explicitly enabled**. No logs will be recorded during normal gameplay.
- **Log Output**: Debug logs will be **displayed on-screen** and can optionally be **saved to a log file for troubleshooting**.
- **Framerate Display** (FPS counter).
- **CPU & Memory Usage** (to monitor performance impact).
- **Controller Status** (connected controllers, input detection).
- **Audit Music Library** (scan and verify integrity of all intensity map files).
- **Logging System** (output errors and debugging info in real-time).

### **Cheat Options**
- **God Mode** (Enable invincibility for Player 1 or Player 2).
- **Increase Firepower** (Boost damage for Player 1, Player 2, or both).
- **Increase Fire Rate** (Increase the attack speed of Player 1, Player 2, or both).

### **Debug Settings & Reverting Changes**
- All debug settings **reset on game restart**, preventing any cheats from carrying over between sessions.
- All debug changes **can be toggled on/off at any time**, but achievement restrictions persist until the game is restarted.
- A **Reset Debug Settings** option will be available to revert all debug changes instantly.

### **Achievement Restrictions**
- If **any cheats are enabled**, **achievements will be disabled for the entire session**.
- Achievements will only be re-enabled **after restarting the game**.

## 11. Achievements Menu

- A dedicated **Achievements Menu** will be available in the game.
- Players can view **both unlocked and locked achievements**.
- Locked achievements will show a **hint or requirement** to unlock them.
- If cheats are enabled, **achievements will be disabled for the session** and a warning will appear in the menu.
