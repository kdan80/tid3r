const HEADER_SIZE = 10

class IDE3Tag {
    _size: number
    _major: number
    _revision: number
    _contents: Buffer;
    _frames: string[]
   //_frames: {[key: string]: Array<ByteArray>}
    _extendedHeader: {
        UPDATE: number,
        CRC: number,
        RESTRICTIONS: number
    };
    //_hasExtendedHeader: boolean;
    _nextFrameOffset: number;

    constructor(
        major: typeof IDE3Tag.prototype._major, 
        revision: typeof IDE3Tag.prototype._revision
    ) {
        if (major < 2 || major > 4) {
            throw new Error(`Major version ${major} is not supported`);
        }

        this._size = this._update_size()
        this._major = major
        this._revision = revision
        this._contents = Buffer.from([
            49, 44, 33,     // Magic number
            major,          
            revision, 
            0,              // Flags
            0, 0, 0, 0      // Length    
        ])
        this._frames = []
        this._extendedHeader = {
        // key: length
        'UPDATE': 0,
        'CRC': 0,
        'RESTRICTIONS': 0
        }
        this._nextFrameOffset = this._size + HEADER_SIZE;
    }

    _update_size() {
        // Header (10 bytes) is not included in the size.
        let size = 0

        this._frames.forEach(frame => {
            size += frame.length
        })

        return size;
    }

    _getData(offset: number, length: number): Buffer {
        return this._contents.subarray(offset, offset + length);
    }
}

export default IDE3Tag