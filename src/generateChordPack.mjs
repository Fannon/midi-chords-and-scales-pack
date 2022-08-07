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
fs.ensureDirSync('./dist/essential')

for (const note of notes) {
    for (const chordExtensionName in chordTypes) {
        const chordExtension = chordTypes[chordExtensionName]
        
        const filePath = `dist/essential/${note}/${note}${chordExtensionName}.mid`
        
        let command = 'python src/chords2midi/c2m.py '
        command += `${note}${chordExtension} `
        command += `-t 5 -p long -d 4 -B --key ${note} `
        command += `-N ${note}${chordExtensionName} `
        command += `--output ${filePath}`
        
        fs.ensureDirSync(`./dist/essential/${note}`)
        
        console.log(`--> ${filePath}`)
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            if (stdout) {
                console.log(stdout)
            }
        });
        
    }
}
