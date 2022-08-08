import { Chord } from "@tonaljs/tonal";
import * as midiWriter from 'midi-writer-js'

import * as fs from "fs-extra"

/** 
 * Notes that we want to generate chords for 
 */
 const notes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']

/** Octave to generate the chords for */
const noteOctave = 4

 /** 
  * Chord types to generate. Left (key) is title / filename, right (value) is the tonal library alias 
  */
 const chordTypes: {[title: string]: string} = {
     'Maj': '',
     'min': 'm',
     '5': '5',
     'sus2': 'sus2',
     'sus4': 'sus4',
     'Maj7': 'M7',
     'min7': 'm7',
     'aug': 'aug',
     'dim': 'dim',
     '2': '2',
     '6': '6',
     '7': '7',
     '9': '9',
     '69': '69',
     'add9': 'add9',
     'Maj9': 'maj9',
     'min9': 'm9',
     'min6': 'm6',
     'aug7': 'aug7',
     'dim7': 'dim7',
     '7b5': '7b5'
}

fs.ensureDirSync('./dist')
fs.emptyDirSync('./dist')

generateChords(notes, chordTypes, 4)

function generateChords(notes: string[], chordTypes: {[title: string]: string}, octave: number) {

    for (const currentNote of notes) {

        for (const chordExtensionName in chordTypes) {
    
            // Generate Chord
            const chordExtension = chordTypes[chordExtensionName]
            const chord = Chord.getChord(chordExtension, `${currentNote}${noteOctave}`);
             
            console.log(' ')
            console.log('---------------------------------------------------------------')
            console.log(`${currentNote}${chordExtensionName}:`, chord.symbol, chord.aliases, chord.notes)
            // console.debug(chord)
            if (chord.empty) {
                console.error(chord)
                throw new Error(`Could not process chord alias: "${currentNote}${chordExtension}"`)
            }
            
            // Create MIDI track
            const track = new midiWriter.Track()
            track.addTrackName(`${currentNote}${chordExtensionName}`)
            track.addCopyright(`https://github.com/Fannon/midi-chord-pack`)
            const note = new midiWriter.NoteEvent({pitch: chord.notes as midiWriter.Pitch[], duration: '1'});
            track.addEvent(note);
            
            // Write to MIDI file
            const filePath = `./dist/chords/${currentNote}/${currentNote}${chordExtensionName}.mid`
            const write = new midiWriter.Writer(track);
            fs.ensureDirSync(`./dist/chords/${currentNote}`)
            fs.writeFileSync(filePath, write.buildFile())
            console.log(`Output: ${filePath}`)
            console.log('---------------------------------------------------------------')
        }
    }
    
}
