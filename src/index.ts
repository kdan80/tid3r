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

type Range = {
    start: number,
    end: number
}

const get_n_bytes_from_read_stream = (range: Range) => {

    return async(path: string): Promise<Buffer> => {
        const chunks = []
        for await (const chunk of fs.createReadStream(path, range)) {
        chunks.push(chunk)
    }
        return Buffer.concat(chunks)
    }
}

const get_ID3_header = get_n_bytes_from_read_stream({start: 0, end: 9})

const calculate_ID3_data_length_in_bytes = (ID3_length_bytes: Buffer) => {
    return  (ID3_length_bytes.readUInt8(0) << 21) 
            |   (ID3_length_bytes.readUInt8(1) << 14) 
            |   (ID3_length_bytes.readUInt8(2) << 7) 
            |   (ID3_length_bytes.readUInt8(3))
}

const compare_hexstring_to_magic_number = (hexstring_from_file: string): (magic_number: string) => boolean => {
    return (magic_number: string) => {
        return hexstring_from_file.toLowerCase() === magic_number
    }
}

// The following functions are used to validate whether a hexstring is a magic number
const compare_hexstring_to_ID3v2 = compare_hexstring_to_magic_number(magic_number_ID3v2)
const compare_hexstring_to_ID3v1 = compare_hexstring_to_magic_number(magic_number_ID3v1)
const compare_hexstring_to_flac = compare_hexstring_to_magic_number(magic_number_flac)


const check_audio_format_is_supported = (audio_file_path: string): boolean => {
    const file_extension = path.extname(audio_file_path).toLowerCase()
    return supported_audio_formats.includes(file_extension)
}





