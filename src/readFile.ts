import fs from 'fs'

const get_n_bytes_from_file_stream = async(path: string): Promise<Buffer> => {
    const chunks = []
    for await (const chunk of fs.createReadStream(path)) {
        chunks.push(chunk)
    }
    return Buffer.concat(chunks)
}

export default get_n_bytes_from_file_stream