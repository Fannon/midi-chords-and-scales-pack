import { exec } from "child_process";
import * as fs from "fs-extra"

/** 
 * Notes that we want to generate chords for 
 */
const notes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']

/** 
 * Chord types to generate. Left (key) is filename, right (value) is the chords2midi name 
 */
const chordTypes = {
    'Maj': '',
    'min': 'm',
    '5': '5',
    'sus2': 'sus2',
    'sus4': 'sus4',
    'Major7': 'M7',
    'min7': 'm7',
    'Major9': 'M9',
    'min9': 'm9',
    'dim': 'dim',
    '2': '2',
    '6': '6',
    '7': '7',
    '9': '9',
    '69': '69',
    'aug': 'aug',
    'add9': 'add9',
    'add11': 'add11',
}

fs.emptyDirSync('./dist')

for (const note of notes) {

    console.log(`--> ${note}`)

    for (const chordExtensionName in chordTypes) {
        const chordExtension = chordTypes[chordExtensionName]
                
        const commandExecutable = 'python src/chords2midi/c2m.py '

        let createChords = commandExecutable
        createChords += `${note}${chordExtension} `
        createChords += `-t 5 -p long -d 4 `
        createChords += `-N ${note}${chordExtensionName} `
        createChords += `--output dist/chords/${note}/${note}${chordExtensionName}.mid`
        
        fs.ensureDirSync(`./dist/chords/${note}`)
        executeCommand(createChords)

        let createChordsWithBass = commandExecutable
        createChordsWithBass += `${note}${chordExtension} `
        createChordsWithBass += `-t 5 -p long -d 4 -B --key ${note} `
        createChordsWithBass += `-N ${note}${chordExtensionName} `
        createChordsWithBass += `--output dist/chords-with-bass/${note}/${note}${chordExtensionName}.mid`
        
        fs.ensureDirSync(`./dist/chords-with-bass/${note}`)
        executeCommand(createChordsWithBass)
    }
}

function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return console.log(`error: ${error.message}`);
        } else if (stderr) {
            return console.log(`stderr: ${stderr}`);
        } else if (stdout) {
            console.log(stdout)
        }
    });
}