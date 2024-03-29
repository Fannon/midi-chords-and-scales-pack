import { Chord } from "@tonaljs/tonal";
import * as midiWriter from 'midi-writer-js'
import * as fs from "fs-extra"

interface ChordInfo {
    /** Chord symbol, as understood by tonal.js */
    symbol: string
    /** Filename. Falls back to symbol if not given */
    fileName?: string
    /** MIDI title. Falls back to symbol if not given */
    title?: string
}

/** 
 * Notes that we want to generate chords for 
 */
 const notes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']

/** Octave to generate the chords for */
const noteOctave = 3

 /** 
  * Chord types to generate. 
  * @see https://github.com/tonaljs/tonal/blob/main/packages/chord-type/data.ts for theoretically supported chord types
  */
 const chordTypesVariant1: ChordInfo[] = [
    { symbol: '', fileName: 'maj'},
    { symbol: 'm', fileName: 'min'},
    { symbol: 'sus2' },
    { symbol: 'sus4' },
    { symbol: '5' },
    { symbol: '7' },
    { symbol: 'maj7'},
    { symbol: 'm7', fileName: 'min7' },
    { symbol: '2' },
    { symbol: '6' },
    { symbol: 'm6', fileName: 'min6' },
    { symbol: '69' },
    { symbol: '9' },
    { symbol: 'maj9' },
    { symbol: 'm9', fileName: 'min9' },
    { symbol: 'add9' },
    { symbol: '13' },
    { symbol: 'm13', fileName: 'min13' },
    { symbol: 'maj13'},
    { symbol: 'dim' },
    { symbol: 'dim7' },
    { symbol: '7b5' },
    { symbol: 'aug' },
    { symbol: 'aug7' },
 ]

fs.ensureDirSync('./dist')

generateChords('chords', notes, chordTypesVariant1, 4, true)
generateChords('chords-without-title', notes, chordTypesVariant1, 4, false)

function generateChords(variantName: string, notes: string[], chordTypes: ChordInfo[], octave: number, writeTitle: boolean) {

    fs.ensureDirSync(`./dist/${variantName}`)
    fs.emptyDirSync(`./dist/${variantName}`)

    for (const currentNote of notes) {

        for (const chordInfo of chordTypes) {

            const chordSymbol = chordInfo.symbol
            const chordFileName = chordInfo.fileName != null ? chordInfo.fileName : chordSymbol
            const chordTitle = chordInfo.title != null ? chordInfo.title : chordSymbol

            // Generate Chord
            const chord = Chord.getChord(chordSymbol, `${currentNote}${noteOctave}`);
             
            console.log(' ')
            console.log('---------------------------------------------------------------')
            console.log(`${variantName}/${currentNote} ${chordFileName}.mid`, chord.symbol, chord.aliases, chord.notes)
            // console.debug(chord)
            if (chord.empty) {
                console.error(chord)
                throw new Error(`Could not process chord alias: "${currentNote}${chordSymbol}"`)
            }
            
            // Create MIDI track
            const track = new midiWriter.Track()
            if (writeTitle) {
                track.addTrackName(`${currentNote}${chordTitle}`)
            }
            track.addCopyright(`https://github.com/Fannon/midi-chord-pack`)
            const note = new midiWriter.NoteEvent({pitch: chord.notes as midiWriter.Pitch[], duration: '1', velocity: 64 });
            track.addEvent(note);

            // Write to MIDI file
            const filePath = `./dist/${variantName}/${chordFileName}/${currentNote} ${chordFileName}.mid`
            const write = new midiWriter.Writer(track);
            fs.ensureDirSync(`./dist/${variantName}/${chordFileName}`)
            fs.writeFileSync(filePath, write.buildFile())
            console.log(`Output: ${filePath}`)
            console.log('---------------------------------------------------------------')
        }
    }
    
}
