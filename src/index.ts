import fs from 'fs'

type bytes = {
    start: number
    end: number
}

// This function returns a specified number of bytes from a file
// It takes in a file and a start & stop value as parameters
// e.g passing in (song.mp3, {0, 2}) will return the first 3 bytes of song.mp3 
// This function is called by other functions to look for magic numbers/file signatures
// N.B. This function uses a readStream rather than reading the entire file into ram
const get_n_bytes_from_file = async(path: string, { start, end }: bytes): Promise<Buffer> => {
    
    const chunks = []
    for await (const chunk of fs.createReadStream(path, { start, end })) {
        chunks.push(chunk)
    }
    
    return Buffer.concat(chunks)
}


// This function determines if a file is truly an mp3 with ID3v2 metadata
// It looks for the magic number/file signature <49 44 33> at the start of the file
const file_is_ID3v2_mp3 = (buffer: Buffer ): boolean => {
    const ID3v2 = Buffer.from('494433', 'hex')
    const buffer_comparison = Buffer.compare(buffer, ID3v2)

    // If 2 buffers are equal Buffer.compare() will return 0
    // Therefore we need to !invert the result in order to return true
    return !buffer_comparison
}

