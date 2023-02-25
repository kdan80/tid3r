import path from 'path'

const tag_types = new Map([
    ['.mp3', 'id3'],
    ['.wma', 'id3'],
    ['.flac', 'vorbis']
])

const id3v2_magic_number = Buffer.from('ID3')
const flac_magic_number = Buffer.from('fLaC')

class FileStat {

    file_path: string
    file_name: string
    file_header: Buffer
    file_extension: string | null
    tag_type: string | null

    constructor(
        file_path: typeof FileStat.prototype.file_path,
        file_header: typeof FileStat.prototype.file_header
    ) {

        this.file_path = path.dirname(file_path)
        this.file_name = path.basename(file_path)
        this.file_header = file_header
        this.file_extension = this.set_file_extension()
        this.tag_type = this.set_tag_type()
    }

    set_file_extension() {
        const file_ext = path.extname(this.file_name).toLowerCase()
        return (file_ext) ? file_ext : null
    }

    set_tag_type() {

        if (!this.file_extension || !tag_types.has(this.file_extension)) return null

        const tag_type = tag_types.get(this.file_extension)!
        if (tag_type === 'id3') {
            const is_id3v2 = (Buffer.compare(
                id3v2_magic_number,
                this.file_header.subarray(0,3)
            ) === 0)

            return (is_id3v2) ? tag_type : null 
        }

        if (tag_type === 'vorbis') {
            const is_flac = (Buffer.compare(
                flac_magic_number,
                this.file_header.subarray(0,4)
            ) === 0)
            
            return (is_flac) ? tag_type : null
        }

        return null
    }
}

export default FileStat