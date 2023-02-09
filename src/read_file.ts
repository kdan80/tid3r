import * as fsp from 'fs/promises'
import path from 'path'

// Magic numbers/file signatures for various file formats stored as hex strings
const magic_number_ID3v2 = '494433'
const magic_number_ID3v1 = 'fffb'
const magic_number_flac = '664c6143'

export const check_audio_format_is_supported = (audio_file_path: string): boolean => {
    const file_extension = path.extname(audio_file_path).toLowerCase()
    return ['.mp3', '.flac'].includes(file_extension)
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

export const extract_bytes_from_buffer = (offset: number, range: number) => {

    return (audio_file_buffer: Buffer): Buffer => {
        return audio_file_buffer.slice(offset, offset + range)
    }
}

export const extract_ID3_magic_number = extract_bytes_from_buffer(0,3)
export const extract_ID3_length_bytes = extract_bytes_from_buffer(6,4)
export const extract_first_tag_header = extract_bytes_from_buffer(10,10)

export const convert_buffer_to_hex_string = (buffer: Buffer): string => {
    return buffer.toString('hex')
}

export const compare_hexstring_to_magic_number = (magic_number: string) => {
    return (hexstring: string): boolean => {
        return hexstring.toLowerCase() === magic_number
    }
}

// The following functions are used to validate whether a hexstring is a magic number
export const compare_hexstring_to_ID3v2 = compare_hexstring_to_magic_number(magic_number_ID3v2)
export const compare_hexstring_to_ID3v1 = compare_hexstring_to_magic_number(magic_number_ID3v1)
export const compare_hexstring_to_flac = compare_hexstring_to_magic_number(magic_number_flac)

export const read_tag_header = (buffer: Buffer, offset: number)  => {
    const title = buffer.slice(offset,offset + 4).toString()
    const length = buffer.slice(offset + 4, offset + 8).readUint32BE()
    return {
        title: title,
        length: length
    }
}

export const readIso8859 = (buffer: Buffer, offset: number, length = Infinity) => {
    const bytes = []
    let i = 0
    while (buffer.readUInt8(offset + i) !== 0 && i < length) {
        bytes.push(buffer.readUInt8(offset + i))
        i += 1
    }
    return [new TextDecoder("iso-8859-1").decode(Uint8Array.from(bytes)), i];
}

const readUtf16 = (buffer: Buffer, offset: number, length = Infinity) => {
    const bytes = []
    let i = 0
    while (buffer.readUInt16BE(offset + i) !== 0 && i < length) {
        bytes.push(buffer.readUInt8(offset + i))
        bytes.push(buffer.readUInt8(offset + i + 1))
        i += 2
    }
    let encoding
    if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
        encoding = "utf-16le"
    } else if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
        encoding = "utf-16be"
    }
    return [new TextDecoder(encoding).decode(Uint8Array.from(bytes.slice(2))), i]
}

export const readTagField = (buffer: Buffer, offset: number, length: number) => {
    const encodingType = buffer.readUInt8(offset)
    return encodingType === 1
        ? readUtf16(buffer, offset + 1, length - 1)[0]
        : readIso8859(buffer, offset + 1, length - 1)[0]
}







