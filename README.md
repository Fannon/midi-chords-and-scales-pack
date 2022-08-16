# MIDI Chords and Scales Pack

## Description

This projects generates (~400) MIDI chords and (~300) MIDI scales, which can be downloaded as a [free MIDI pack](https://github.com/Fannon/midi-chords/releases).

The goal is to have the MIDI files for quickly building a chord track, e.g. by searching for the chord in the DAW clip browser. When placed in the DAW the MIDI clips have a readable chord title.
A MIDI scale could, e.g. help with quantizing the notes.

<img src="./assets/bitwig-example.png" width="500" title="Bitwig for a 'chord track' and use of the clip browser" />

A non-goal (see [background](#background)) is to generate chord progressions. If you are looking for this, consider instead:

* https://github.com/ldrolez/free-midi-chords
* Dedicated Tools / Plugins
    * My personal favorite is [Plugin Boutique Scaler 2](https://www.pluginboutique.com/meta_products/6414)

If you are missing any chords or have other feedback, feel free to reach out via [KVR Thread](https://www.kvraudio.com/forum/viewtopic.php?t=585287) or [GitHub issues](https://github.com/Fannon/midi-chord-pack/issues).

## Download

Downloads can be found in the [releases page](https://github.com/Fannon/midi-chords/releases).

The can be multiple variants, depending on your needs. Currently there are:
* `chords` (recommended)
    * Contains a MIDI track title, which some DAWs (e.g. Ableton Live) display in the imported Clip
    * The chord title may differ from the filename, as it can be shorter and case sensitive (which does not work well for the file names)
* `chords-without-title`:
    * Contains no MIDI track title
    * For a DAW (e.g. Reaper) that displays both MIDI title AND filename, this might work better.
* `scales` (recommended)
* `scales-without-title`

## Installation

This is only necessary if you want to customize and build your own chord pack, or contribute.

Prerequisites
* [Node.js](https://nodejs.org/en/)

```bash
# Install Node.js dependencies
npm install

# Generate Chords -> will be written to ./dist/
npm start
```

The generator script can be found in [src/generateChords.ts](./src/generateChords.ts).

## Background

Don't get scammed by paying money for chord packs :) 
There are free and better alternatives out there and this project should add one more that fits my own needs. 

I explicitly did not want to add chord progressions because I believe that this is usually done better by understanding a bit of music theory (e.g. [Circle of Fifths](https://en.wikipedia.org/wiki/Circle_of_fifths)) or using music theory related tools. By being forced to explicitly construct chord progressions from individual chords, much more interesting things ("happy accidents") can happen.

## Attribution 

* Uses the following libraries that do the heavy lifting:
    * https://www.npmjs.com/package/@tonaljs/tonal 
    * https://www.npmjs.com/package/midi-writer-js
* Inspired by https://github.com/ldrolez/free-midi-chords 
