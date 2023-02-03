import * as fsp from 'fs/promises'
import path from 'path'

// Supported file extensions
const supported_audio_formats = [
    '.mp3',
    '.flac'
]

// Magic numbers/file signatures for various file formats stored as hex strings
const magic_number_ID3v2 = '494433'
const magic_number_ID3v1 = 'fffb'
const magic_number_flac = '664c6143'

export const check_audio_format_is_supported = (audio_file_path: string): boolean => {
    const file_extension = path.extname(audio_file_path).toLowerCase()
    return supported_audio_formats.includes(file_extension)
}

export const read_audio_file_to_buffer = async(audio_file_path: string): Promise<Buffer> => {
    const audio_file_buffer = await fsp.readFile(audio_file_path);
    return audio_file_buffer;
}

export const calculate_ID3_data_length_in_bytes = (ID3_length_bytes: Buffer) => {
    return  (ID3_length_bytes.readUInt8(0) << 21) 
            |   (ID3_length_bytes.readUInt8(1) << 14) 
            |   (ID3_length_bytes.readUInt8(2) << 7) 
            |   (ID3_length_bytes.readUInt8(3))
}

export const compare_hexstring_to_magic_number = (hexstring_from_file: string): (magic_number: string) => boolean => {
    return (magic_number: string) => {
        return hexstring_from_file.toLowerCase() === magic_number
    }
}

// The following functions are used to validate whether a hexstring is a magic number
const compare_hexstring_to_ID3v2 = compare_hexstring_to_magic_number(magic_number_ID3v2)
const compare_hexstring_to_ID3v1 = compare_hexstring_to_magic_number(magic_number_ID3v1)
const compare_hexstring_to_flac = compare_hexstring_to_magic_number(magic_number_flac)








