import {
    get_synchsafe_integer_32,
    get_integer_24,
    read_header_flags
} from './helpers.js'

// Offsets
const MAJOR = 3
const REVISION = 4
const FLAGS = 5;
const LENGTH = 6;
const EXTENDED_HEADER = 10;
const EXTENDED_FLAGS_V3 = 14;
const EXTENDED_FLAGS_V4 = 15;
const START_EXTENDED_DATA_V3 = 20;
const START_EXTENDED_DATA_V4 = 16;
// Sizes
const HEADER_SIZE = 10;

class ID3Header {
    _length: number
    _version: string
    _major: number
    _revision: number
    _data: Buffer
    _flags: HeaderFlags
    _extendedHeader: {
        UPDATE: number,
        CRC: number,
        RESTRICTIONS: number
    };
    //_hasExtendedHeader: boolean;
    _nextFrameOffset: number;

    constructor(
        data: typeof ID3Header.prototype._data
    ) {
        this._data = data
        this._length = this.#set_length()
        this._major = this._data[MAJOR]
        this._revision = this._data[REVISION]
        this._version = `2.${this._major}.${this._revision}`
        this._flags = this.set_flags()
        
        this._extendedHeader = {
        // key: length
        'UPDATE': 0,
        'CRC': 0,
        'RESTRICTIONS': 0
        }
        this._nextFrameOffset = this._length + HEADER_SIZE;
    }

    #set_length() :number {
        // Header (10 bytes) is not included in the size.
        let length = 0

        const length_bytes = this._data.subarray(LENGTH, LENGTH + 4)

        length = get_synchsafe_integer_32(length_bytes)

        return length
    }

    set_flags() {

        const flags = read_header_flags(this._data[FLAGS])

        return flags
    }

    
}

export default ID3Header