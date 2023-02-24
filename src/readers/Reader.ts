import path from 'path'

const file_readers = new Map([
    ['.mp3', 'id3_reader'],
    ['.wma', 'id3_reader'],
    ['.flac', 'flac_reader']
])

class Reader {

    _file_path: string
    _file_extension: string
    _file_reader: string | null

    constructor(
        file_path: typeof Reader.prototype._file_path 
    ) {

        this._file_path = file_path
        this._file_extension = path.extname(file_path).toLowerCase()
        this._file_reader = this.set_file_reader()
    }


    read() {
        const file_reader = 0
    }

    set_file_reader() {

        try {
            if (!file_readers.has(this._file_extension)) throw new Error(`${this._file_extension} format is not supported`)
            return file_readers.get(this._file_extension)!
        } catch(err) {
            console.log(err)
            return null
        }
        
    }

}

export default Reader