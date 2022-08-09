import { Scale } from "@tonaljs/tonal";
import * as midiWriter from 'midi-writer-js'
import * as fs from "fs-extra"

interface ScaleInfo {
    /** scale symbol, as understood by tonal.js */
    symbol: string
    /** Filename. Falls back to symbol if not given */
    fileName?: string
    /** MIDI title. Falls back to symbol if not given */
    title?: string
}

/** 
 * Notes that we want to generate scales for 
 */
 const notes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']

/** Octave to generate the scales for */
const noteOctave = 4

 /** 
  * Scales to generate. 
  * @see https://github.com/tonaljs/tonal/blob/main/packages/scale-type/data.ts for theoretically supported scale types
  */
 const scaleTypesVariant1: ScaleInfo[] = [
    // 5-note scales
    { symbol: 'major pentatonic'},
    { symbol: 'minor pentatonic'},

     // 6-note scales
     { symbol: 'major blues'},
     { symbol: 'minor blues'},
     
     // 7-note scales
     { symbol: 'major'},
     { symbol: 'minor'},
     { symbol: 'dorian'},
     { symbol: 'phrygian'},
     { symbol: 'lydian'},
     { symbol: 'mixolydian'},
     { symbol: 'locrian'},
     { symbol: 'harmonic minor'},
     { symbol: 'harmonic major'},
     { symbol: 'melodic minor'},
     
     // 8-note scales
     { symbol: 'bebop major'},
     { symbol: 'bebop minor'},
     
     // 12-note scales
     { symbol: 'chromatic'},
 ]

fs.ensureDirSync('./dist')

generateScales('scales', notes, scaleTypesVariant1, 4, true)
generateScales('scales-without-title', notes, scaleTypesVariant1, 4, false)

function generateScales(variantName: string, notes: string[], scaleTypes: ScaleInfo[], octave: number, writeTitle: boolean) {

    fs.ensureDirSync(`./dist/${variantName}`)
    fs.emptyDirSync(`./dist/${variantName}`)

    for (const currentNote of notes) {

        for (const scaleInfo of scaleTypes) {

            const scaleSymbol = scaleInfo.symbol
            const scaleFileName = scaleInfo.fileName != null ? scaleInfo.fileName : scaleSymbol
            const scaleTitle = scaleInfo.title != null ? scaleInfo.title : scaleSymbol

            // Generate scale
            const scale = Scale.get(`${currentNote}${noteOctave} ${scaleSymbol}`);
             
            console.log(' ')
            console.log('---------------------------------------------------------------')
            console.log(`${variantName}/${currentNote}${scaleFileName}.mid`, scale.aliases, scale.notes)
            // console.debug(scale)
            if (scale.empty) {
                console.error(scale)
                throw new Error(`Could not process scale alias: "${currentNote}${scaleSymbol}"`)
            }
            
            // Create MIDI track
            const track = new midiWriter.Track()
            if (writeTitle) {
                track.addTrackName(`${currentNote} ${scaleTitle}`)
            }
            track.addCopyright(`https://github.com/Fannon/midi-scale-pack`)
            const note = new midiWriter.NoteEvent({pitch: scale.notes as midiWriter.Pitch[], duration: '1', velocity: 64 });
            track.addEvent(note);

            // Write to MIDI file
            const filePath = `./dist/${variantName}/${scaleFileName}/${currentNote} ${scaleFileName}.mid`
            const write = new midiWriter.Writer(track);
            fs.ensureDirSync(`./dist/${variantName}/${scaleFileName}`)
            fs.writeFileSync(filePath, write.buildFile())
            console.log(`Output: ${filePath}`)
            console.log('---------------------------------------------------------------')
        }
    }
    
}
