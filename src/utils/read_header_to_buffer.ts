import fs from 'fs'

async function read_header_to_buffer(path: fs.PathLike): Promise<Buffer> {
    const chunks = [];
    for await (let chunk of fs.createReadStream(path, { start: 0, end: 9 })) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}

export default read_header_to_buffer