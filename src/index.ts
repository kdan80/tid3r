import fs from 'fs'
import path from 'path'

const id3v2_file = '/home/kd/Projects/Anoid/media/id3v2.mp3'
const id3v1_file = '/home/kd/Projects/Anoid/media/id3v1.mp3'
const flac_file = '/home/kd/Projects/Anoid/media/flac.flac'
const test_file = '/home/kd/Projects/Anoid/media/test.txt'

// Supported file extensions
const supported_audio_formats = [
    '.mp3',
    '.flac'
]

// Magic numbers/file signatures for various file formats stored as hex strings
const magic_number_ID3v2 = '494433'
const magic_number_ID3v1 = 'fffb'
const magic_number_flac = '664c6143'

const get_first_4_bytes_as_hexstring_from_file = async(path: string): Promise<string> => {
    
    const chunks = []
    for await (const chunk of fs.createReadStream(path, { start: 0, end: 3})) {
        chunks.push(chunk)
    }
    
    return Buffer.concat(chunks).toString('hex')
}

const compare_hexstring_to_magic_number = (hexstring_from_file: string): (magic_number: string) => boolean => {
    
    return (magic_number: string) => {
        return hexstring_from_file.toLowerCase() === magic_number
    }
}

const check_audio_format_is_supported = (audio_file_path: string): boolean => {
    const file_extension = path.extname(audio_file_path).toLowerCase()
    return supported_audio_formats.includes(file_extension)
}


// The following functions are used to validate whether a hexstring is a magic number
const compare_hexstring_to_ID3v2 = compare_hexstring_to_magic_number(magic_number_ID3v2)
const compare_hexstring_to_ID3v1 = compare_hexstring_to_magic_number(magic_number_ID3v1)
const compare_hexstring_to_flac = compare_hexstring_to_magic_number(magic_number_flac)

