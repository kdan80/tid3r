import MediaFileReader from "./MediaFileReader.js"

const MAJOR = 3
const REVISION = 4
const LENGTH = 5
const FLAGS = 6

class ID3Reader extends MediaFileReader {

    flags: string | null
    length: number | null
    major: number | null
    revision: number | null
    version: string | null
    frames: string[] | null
    header: Buffer

    constructor(
        file_path: string,
        header: typeof ID3Reader.prototype.header
    ) {
        super(
            file_path
        )

        this.reader_type = 'id3_reader'
        this.header = header
        this.flags = null
        this.length = null
        this.frames = null
        this.major = (this.header[MAJOR] > 0xFE) ? null : this.header[MAJOR]
        this.revision = (this.header[REVISION] > 0xFE) ? null : this.header[REVISION]
        this.version = `2.${this.major}.${this.revision}`

    }

    
    


}

export default ID3Reader