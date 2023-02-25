import read_file_to_buffer from '../utils/read_file_to_buffer.js'

class MediaFileReader {

    reader_type: string
    file_path: string
    data?: Buffer

    constructor(
        file_path: typeof MediaFileReader.prototype.file_path,
    ) {
        this.reader_type = 'media_file_reader'
        this.file_path = file_path
    }

    public get type() {
        return this.reader_type
    }
}

export default MediaFileReader