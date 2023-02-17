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
    _frame: string
    _name: string
    _file: string

    constructor(
        frame: typeof FrameFormattingError.prototype._frame,
        file: typeof FrameFormattingError.prototype._file) {
        super()
        this._name = 'FrameFormattingError'
        this._file = file
        this._frame = frame
    }

    log_frame_error() {
        console.error('\x1b[31m',`FrameFormattingError: ${this._frame} is improperly formatted`)
    }
}

export {
    MissingFramesError,
    FrameFormattingError
}
