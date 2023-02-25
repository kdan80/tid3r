import MediaFileReader from "./MediaFileReader.js"

class FlacReader extends MediaFileReader {

    constructor(
        file_path: string,
    ) {
        super(
            file_path,
        )

        this.reader_type = 'flac_reader'
    }
}

export default FlacReader