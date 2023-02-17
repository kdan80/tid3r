class MissingFramesError extends Error {
    _frames: string[]
    _name: string
    _file: string

    constructor(
        frames: typeof MissingFramesError.prototype._frames,
        file: typeof MissingFramesError.prototype._file) {
        super()
        this._frames = frames
        this._name = 'MissingFramesError'
        this._file = file
    }
  
    getMissingFrames() {
        return this._frames;
    }

    log_missing_frames() {
        return this._frames.forEach(frame => {
            console.error('\x1b[31m',`MissingFrame: ${frame} is required`)
        })
    }
}

class FrameFormattingError extends Error {
    frame: string
    name: string
    file: string
    message: string
    correct_format: string

    constructor(
        frame: typeof FrameFormattingError.prototype.frame,
        file: typeof FrameFormattingError.prototype.file) {
        super()
        this.name = 'FrameFormattingError'
        this.file = file
        this.frame = frame
        this.message = `${this.frame}: was improperly formatted. ${this.file} will be skipped.`
        this.correct_format = this.#compose_message()
    }

    log_frame_error() {
        console.error('\x1b[31m',`FrameFormattingError: ${this.frame} is improperly formatted`)
    }

    #compose_message() {
        switch (this.frame) {
            case 'TPE1':
                return `Artist(s) name. Multiple artists should be separated with a semi-colon only (no whitespace).`
            case 'TPE2':
                return `Album artist name. Can be different from the track artist e.g. Various Artists for a compilation album.`
            case 'TIT2':
                return `Track title or name.`
            case 'TALB':
                return `Album title or name.`
            case 'TCON':
                return `Genre or content type. Multiple genres should be separated by a forward slash only (no whitespace).`
            case 'TPUB':
                return `Publisher. Record label etc.`
            case 'TYER':
                return `Year the track/album was released. May be different from TORY (original release year) if part of a remaster/re-release.`
            case 'TORY':
                return 'Original release year of the track/album.'
            case 'TRCK':
                return 'Track number. Should be formatted as current/total e.g. 1/12 for the first track, 2/12 for the second etc.'
            case 'TPOS':
                return 'Disc number. Should be formatted as current/total e.g. 1/2 for disc one, 2/2 for disc two etc.'
            default:
                return 'Unable to determine formatting error.'
        }
    }
}

export {
    MissingFramesError,
    FrameFormattingError
}
