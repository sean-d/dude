# Music Intensity Map Generator Tool

## Overview

The Music Intensity Map Generator is a standalone tool that allows users to create custom intensity maps for songs to be used in the Dude game. These intensity maps will drive gameplay dynamics, enemy spawning, visual effects, and power-up behaviors based on the music's characteristics.

## Why a Standalone Tool?

1. **Reduced Game Size**: The final game distribution will be smaller without the audio analysis code and dependencies.

2. **Performance Optimization**: The game can focus solely on gameplay without the overhead of audio analysis functionality.

3. **Separation of Concerns**: Game plays music and follows intensity maps; tool creates intensity maps.

4. **User Experience**: Players who just want to play the game don't need the map generation functionality.

5. **Development Focus**: You can develop and update the tool independently from the game.

6. **Resource Usage**: Audio analysis can be CPU-intensive, so keeping it separate prevents it from competing with game resources.

7. **Modding Community**: A standalone tool makes it easier for a community to form around creating and sharing custom intensity maps.

8. **Simplified Testing**: You can test the game with pre-generated maps without worrying about the map generation code.

## Technology Choice: Electron/Node.js

After considering Golang, Rust, and Electron/Node.js, we've chosen **Electron/Node.js** for the following reasons:

### Pros:

- Seamless integration with the existing Electron game
- Rich ecosystem of audio processing libraries (Web Audio API, node-audio, etc.)
- Easier UI development with web technologies
- JavaScript knowledge transfers directly to the game code
- Can leverage browser-based visualizations for intensity maps

### Cons (with mitigations):

- Larger distribution size due to Electron runtime (acceptable for a utility tool)
- Not as performant as compiled languages (but sufficient for the audio processing needs)
- Requires Node.js runtime components (bundled with Electron)

## Intensity Map Format

The tool will generate JSON files with the following structure:

```json
{
  "songMetadata": {
    "title": "Song Title",
    "artist": "Artist Name",
    "duration": 180.5, // in seconds
    "bpm": 120, // beats per minute (if detectable)
    "fileHash": "md5hash" // to verify correct song is being used
  },
  "intensityMap": [
    {
      "timestamp": 0.0, // time in seconds
      "intensity": 0.2, // normalized value 0.0-1.0
      "isBeat": false, // is this a significant beat
      "isSection": false // is this a new section of the song
    },
    {
      "timestamp": 1.5,
      "intensity": 0.4,
      "isBeat": true,
      "isSection": false
    }
    // ... more data points
  ],
  "sections": [
    {
      "startTime": 0.0,
      "endTime": 30.0,
      "type": "intro"
    },
    {
      "startTime": 30.0,
      "endTime": 60.0,
      "type": "verse"
    }
    // ... more sections
  ],
  "frequencyHighlights": [
    {
      "timestamp": 15.2,
      "duration": 2.0,
      "dominantFrequency": "bass", // bass, mid, treble
      "strength": 0.8
    }
    // ... more frequency highlights
  ]
}
```

## Core Features

1. **Audio File Loading**:

   - Support for common audio formats (MP3, WAV, FLAC, OGG)
   - Audio playback controls (play, pause, seek)
   - Waveform visualization

2. **Automatic Analysis**:

   - Beat detection
   - Intensity analysis based on volume and frequency distribution
   - Section detection (intro, verse, chorus, bridge, etc.)
   - Frequency analysis (bass, mid, treble dominance)

3. **Manual Editing**:

   - Adjust automatically detected intensity points
   - Add/remove/modify intensity markers
   - Mark important sections or moments
   - Set custom intensity values

4. **Visualization**:

   - Audio waveform display
   - Intensity graph overlay
   - Beat markers
   - Section markers
   - Frequency distribution visualization

5. **Preview Mode**:

   - Simulated gameplay effects based on the intensity map
   - Visual representation of how intensity affects game elements

6. **Export/Import**:
   - Save intensity maps as JSON files
   - Load and edit existing intensity maps
   - Batch processing for multiple songs

## Implementation Plan

### Phase 1: Project Setup and Basic Audio Handling

- Create Electron project structure
- Implement audio file loading and playback
- Basic waveform visualization
- Simple UI layout

### Phase 2: Audio Analysis

- Implement beat detection algorithm
- Create intensity analysis based on volume
- Add frequency analysis (bass, mid, treble)
- Develop section detection

### Phase 3: Visualization and Editing

- Create interactive waveform display
- Add intensity graph overlay
- Implement editing tools for manual adjustments
- Build section marking interface

### Phase 4: Export/Import and Preview

- Implement JSON export/import functionality
- Create preview mode with simulated game effects
- Add batch processing capabilities
- Finalize UI and user experience

### Phase 5: Testing and Refinement

- Test with various music genres and styles
- Refine analysis algorithms based on testing
- Optimize performance
- Polish UI and user experience

## Integration with the Game

The game will:

1. Load intensity map JSON files
2. Match them with the corresponding audio files
3. Use the intensity data to drive gameplay dynamics
4. Verify file integrity using the hash in the metadata

## Distribution

The tool will be:

1. Packaged as a standalone Electron application
2. Distributed separately from the game
3. Available for Windows, macOS, and Linux
4. Potentially offered on the game's website or Steam Workshop

## Future Enhancements

1. **Community Sharing**: Platform for sharing custom intensity maps
2. **Advanced Analysis**: Machine learning-based analysis for better accuracy
3. **Template System**: Predefined templates for different game modes
4. **Batch Processing**: Process entire music libraries automatically
5. **Plugin System**: Allow for custom analysis algorithms
