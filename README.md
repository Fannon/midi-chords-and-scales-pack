# MIDI Chords

## Description

This projects can generate MIDI chords and produces a MIDI Chord pack.
It only covers chords and no chord progressions.

The goal is to have the MIDI files for quickly building a chord track, e.g. by searching for the chord in the DAW clip browser.

A non-goal is to generate chord progressions. If you are looking for this, consider:
* https://github.com/ldrolez/free-midi-chords
* Dedicated Tools / Plugins
    * My personal favorite is [Plugin Boutique Scaler 2](https://www.pluginboutique.com/meta_products/6414)

> Download it in the Release Page!

## Installation

This is only necessary if you want to customize and build your own chord pack, or contribute.

Prerequisites
* [Node.js](https://nodejs.org/en/)
* [Python 3](https://www.python.org/downloads/)

```bash
# Install Python dependencies
pip install -r requirements.txt --user 

# Install Node.js dependencies
npm install

# Generate Chords -> will be written to ./dist/essential/
npm start
```

The generator script can be found in [src/generateChordPack.mjs](./src/generateChordPack.mjs).

## Background

Don't get scammed by paying money for chord packs :) 
There are free and better alternatives out there and this project should add one more that fits my own needs. 

I explicitly did not want to add chord progressions because I believe that this is done better by understanding a bit of music theory (e.g. [Circle of Fifths](https://en.wikipedia.org/wiki/Circle_of_fifths)) or using music theory related tools. By being forced to explicitly construct chord progressions from individual chords, much more interesting things and happy accidents can happen. 

## Attribution 

* Uses https://github.com/Miserlou/chords2midi for generating the chord MIDI. All the hard work is done there.
* Inspired by https://github.com/ldrolez/free-midi-chords 
