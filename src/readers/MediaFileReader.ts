import read_file_to_buffer from '../utils/read_file_to_buffer.js'

class MediaFileReader {

    type: string
    file_path: string
    data?: Buffer

    constructor(
        file_path: typeof MediaFileReader.prototype.file_path
    ) {
        this.type = 'media_file_reader'
        this.file_path = file_path
    }
}

export default MediaFileReader