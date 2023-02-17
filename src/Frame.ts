import * as validators from './validators.js'

class Frame {
    _frame: string
    _frame_data: string
    _mp3_file: string

    constructor(
        frame: typeof Frame.prototype._frame,
        frame_data: typeof Frame.prototype._frame_data,
        mp3_file: typeof Frame.prototype._mp3_file,
    ) {
        this._frame = frame,
        this._mp3_file = mp3_file
        this._frame_data = frame_data
    }

    validate() {
        switch (this._frame) {
            case 'TPE1':
            case 'TPE2':
            case 'TIT2':
            case 'TALB':
            case 'TCON':
            case 'TPUB':
                return validators.is_valid_string(this._frame_data)
            case 'TYER':
            case 'TORY':
                return validators.is_valid_year(this._frame_data)
            case 'TRCK':
            case 'TPOS':
                return validators.is_valid_set(this._frame_data)
            case 'TLEN':
                return validators.is_valid_length(this._frame_data)
            default:
                return false
        }
    }
}

export default Frame