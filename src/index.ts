import fs from 'fs'

const file = '/home/kd/Projects/Anoid/media/intro.mp3'

// Magic numbers/file signatures for various file formats
const magic_number_ID3v2 = Buffer.from('494433', 'hex')

type bytes = {
    start: number
    end: number
}


// This function returns a specified number of bytes (buffer) from a file
// It takes in a file and a start & stop value as parameters
// e.g passing in (song.mp3, {0, 2}) will return the first 3 bytes of song.mp3 as a buffer object
// This function is called by other functions to look for magic numbers/file signatures
// N.B. This function uses a readStream rather than reading the entire file into ram
const get_buffer_from_file = async(path: string, { start, end }: bytes): Promise<Buffer> => {
    
    const chunks = []
    for await (const chunk of fs.createReadStream(path, { start, end })) {
        chunks.push(chunk)
    }
    
    return Buffer.concat(chunks)
}

// This is a currying function
// It takes in a magic number/buffer as a parameter and returns a function that can check
// if a provided buffer is equal to the magic number
// It only checks for equality and discards other results
// It will be used to create child functions that check if a file is ID3v2, ID3v1, flac etc
const compare_buffer_to_magic_number = (n_bytes_from_file: Buffer): (magic_number: Buffer) => boolean => {
    
    // If 2 buffers are equal Buffer.compare() will return 0
    // Therefore we need to !invert the result in order to return true
    return (magic_number: Buffer) => {
        const buffer_comparison = Buffer.compare(n_bytes_from_file, magic_number)
        return !buffer_comparison
    }
}

// The following functions are used to validate whether a buffer is a magic number
const compare_buffer_to_ID3v2 = compare_buffer_to_magic_number(magic_number_ID3v2)


const mp3_buffer = await get_buffer_from_file(file, {start: 0, end: 2})
const is_mp3 = compare_buffer_to_ID3v2(mp3_buffer)
console.log(is_mp3)

