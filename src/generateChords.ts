import { Chord } from "@tonaljs/tonal";
import * as midiWriter from 'midi-writer-js'
import * as fs from "fs-extra"

interface ChordInfo {
    /** Chord symbol, as understood by tonal.js */
    symbol: string
    /** Filename. Falls back to symbol if not given */
    fileName?: string
}

/** 
 * Notes that we want to generate chords for 
 */
 const notes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']

/** Octave to generate the chords for */
const noteOctave = 4

 /** 
  * Chord types to generate. Left (key) is title / filename, right (value) is the tonal library alias 
  */
 const chordTypesVariant1: ChordInfo[] = [
    { symbol: '', fileName: 'Maj'},
    { symbol: 'm', fileName: 'min' },
    { symbol: 'sus2' },
    { symbol: 'sus4' },
    { symbol: '5' },
    { symbol: '7' },
    { symbol: 'M7', fileName: 'Maj7' },
    { symbol: 'm7', fileName: 'min7' },
    { symbol: '2' },
    { symbol: '6' },
    { symbol: '69' },
    { symbol: '9' },
    { symbol: 'maj9', fileName: 'Maj9' },
    { symbol: 'm9', fileName: 'min9' },
    { symbol: 'add9' },
    { symbol: 'aug' },
    { symbol: 'aug7' },
    { symbol: 'dim' },
    { symbol: 'dim7' },
    { symbol: '7b5' },
 ]

fs.ensureDirSync('./dist')
fs.emptyDirSync('./dist')

generateChords('chords-variant-1', notes, chordTypesVariant1, 4)

function generateChords(variantName: string, notes: string[], chordTypes: ChordInfo[], octave: number) {

    for (const currentNote of notes) {

        for (const chordInfo of chordTypes) {

            const chordSymbol = chordInfo.symbol
            const chordFileName = chordInfo.fileName != null ? chordInfo.fileName : chordSymbol

            // Generate Chord
            const chord = Chord.getChord(chordSymbol, `${currentNote}${noteOctave}`);
             
            console.log(' ')
            console.log('---------------------------------------------------------------')
            console.log(`${variantName}/${currentNote}${chordFileName}.mid]`, chord.aliases, chord.notes)
            // console.debug(chord)
            if (chord.empty) {
                console.error(chord)
                throw new Error(`Could not process chord alias: "${currentNote}${chordSymbol}"`)
            }
            
            // Create MIDI track
            const track = new midiWriter.Track()
            track.addCopyright(`https://github.com/Fannon/midi-chord-pack`)
            const note = new midiWriter.NoteEvent({pitch: chord.notes as midiWriter.Pitch[], duration: '1', velocity: 64 });
            track.addEvent(note);

            // Write to MIDI file
            const filePath = `./dist/${variantName}/${currentNote}/${currentNote}${chordFileName}.mid`
            const write = new midiWriter.Writer(track);
            fs.ensureDirSync(`./dist/${variantName}/${currentNote}`)
            fs.writeFileSync(filePath, write.buildFile())
            console.log(`Output: ${filePath}`)
            console.log('---------------------------------------------------------------')
        }
    }
    
}
