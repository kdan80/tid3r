import path from 'path'

class MissingFrameError extends Error {
    frame: string
    name: string
    file: string

    constructor(
        frame: typeof MissingFrameError.prototype.frame,
        file: typeof MissingFrameError.prototype.file) {
        super()
        this.frame = frame
        this.name = 'MissingFrameError'
        this.file = path.basename(file)
    }
  
    getMissingFrames() {
        return this.frame;
    }

    log_missing_frames() {
        return console.error('\x1b[31m',`MissingFrame: ${this.frame} is required`)
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
    MissingFrameError,
    FrameFormattingError
}
