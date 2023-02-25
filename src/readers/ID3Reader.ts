import MediaFileReader from "./MediaFileReader.js"

class ID3Reader extends MediaFileReader {

    constructor(
        file_path: string,
    ) {
        super(
            file_path
        )

        this.reader_type = 'id3_reader'
    }


}

export default ID3Reader