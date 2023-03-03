import match from './match.js'

const compare_buffers = (buff_1: Buffer, buff_2: Buffer) => {
    const result = Buffer.compare(buff_1, buff_2)
    return result === 0
}

const determine_tag_type = (file: Buffer): Result<string,string> => {

    const id3_bytes = Buffer.from('ID3')
    const flac_bytes = Buffer.from('fLaC')
    
    const result = match(file)
                .on((file) => compare_buffers(file.subarray(0,3), id3_bytes) , () => { return { ok: true, data: 'id3'} })
                .on((file) => compare_buffers(file.subarray(0,4), flac_bytes), () => { return { ok: true, data: 'flac'} })
                .otherwise(x => { return { ok: false, data: 'unknown'} })

    return result as Result<string,string>
}

export default determine_tag_type