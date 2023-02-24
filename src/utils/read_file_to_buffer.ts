import * as fsp from 'fs/promises'

const read_file_to_buffer = async(file_path: string): Promise<Buffer> => {
    const audio_file_buffer = await fsp.readFile(file_path);
    return audio_file_buffer;
}

export default read_file_to_buffer