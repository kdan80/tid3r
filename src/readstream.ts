import fs from 'fs'

const get_n_bytes_from_read_stream = (offset: number, range: number) => {

    return async(path: string): Promise<Buffer> => {
        const chunks = []
        for await (const chunk of fs.createReadStream(path, {start: offset, end: offset + range})) {
        chunks.push(chunk)
    }
        return Buffer.concat(chunks)
    }
}

const get_ID3_header = get_n_bytes_from_read_stream(0, 9)
const get_first_frame_header = get_n_bytes_from_read_stream(10, 3)