import path from 'path'
import FlacReader from './FlacReader.js'
import ID3Reader from './ID3Reader.js'
import MediaFileReader from './MediaFileReader.js'

const file_readers = new Map([
    ['.mp3', ID3Reader],
    ['.wma', ID3Reader],
    ['.flac', FlacReader]
])

const id3v2_magic_number = Buffer.from('ID3')
const flac_magic_number = Buffer.from('fLaC')

class Reader {

    file_path: string
    file_header: Buffer
    file_extension: string
    tag_type: string
    file_reader: typeof MediaFileReader | null

    constructor(
        file_path: typeof Reader.prototype.file_path,
        file_header: typeof Reader.prototype.file_header
    ) {

        this.file_path = file_path
        this.file_header = file_header
        this.file_extension = path.extname(file_path).toLowerCase()
        this.tag_type = this.set_file_type()
        this.file_reader = this.set_file_reader()
        
    }

    set_file_reader() {

        try {
            if (!file_readers.has(this.file_extension)) {
                const err_message = this.file_extension 
                    ? `${(this.file_extension)} format is not supported.` 
                    : 'Could not determine file type'

                throw new Error(err_message)
            }
            return file_readers.get(this.file_extension)!
        } catch(err) {
            console.log(err)
            return null
        }
        
    }

    set_file_type() {
        
        const is_id3v2 = (Buffer.compare(
            id3v2_magic_number,
            this.file_header.subarray(0,3)
        ) === 0)

        if (is_id3v2) return 'id3_v2'

        const is_flac = (Buffer.compare(
            flac_magic_number,
            this.file_header.subarray(0,4)
        ) === 0)

        if (is_flac) return 'flac'

        return ''
    }

    check_file_is_supported() {
        return file_readers.has(this.file_extension)
    }

}

export default Reader