import path from 'path'

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
        this._file = path.basename(file)
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
    frame: any
    name: string
    path: string
    file: string
    message: string
    correct_format: string

    constructor(
        frame: typeof FrameFormattingError.prototype.frame
        ) {
            super()
            this.name = 'FrameFormattingError'
            this.path = frame.path
            this.file = frame.file
            this.frame = frame.frame
            this.message = `${this.frame}: was improperly formatted. ${this.file} will be skipped.`
            this.correct_format = frame.correct_format
    }

    log_frame_error() {
        console.error('\x1b[31m',`FrameFormattingError: ${this.frame} is improperly formatted`)
    }
}

export {
    MissingFramesError,
    FrameFormattingError
}
