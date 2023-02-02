import fs from 'fs'

const id3v2_file = '/home/kd/Projects/Anoid/media/id3v2.mp3'
const id3v1_file = '/home/kd/Projects/Anoid/media/id3v1.mp3'
const test_file = '/home/kd/Projects/Anoid/media/test.txt'

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

// The following functions are used to validate whether a buffer is a magic number
const compare_buffer_to_ID3v2 = compare_hexstring_to_magic_number(magic_number_ID3v2)
const compare_buffer_to_ID3v1 = compare_hexstring_to_magic_number(magic_number_ID3v1)
const compare_buffer_to_flac = compare_hexstring_to_magic_number(magic_number_flac)

const x = await get_first_4_bytes_as_hexstring_from_file(id3v2_file)
const z = compare_buffer_to_ID3v2(x.slice(0,6))


