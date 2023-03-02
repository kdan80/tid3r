import * as fsp from 'fs/promises'
import fs from 'fs'

const read_file_async = (file_path: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path,(err, data) => {
            if (err) return reject(err)
            return resolve(data)
        })
    })
}

const read_file_to_buffer = async(file_path: string): Promise<Result<Buffer, "FAILED">> => {
    try {
        const audio_file_buffer = await read_file_async(file_path)
        return {
            ok: true,
            data: audio_file_buffer
        }
    } catch (err)  {
        console.log(err)
        return {
            ok: false,
            data: 'FAILED'
        }
    }
}

export default read_file_to_buffer