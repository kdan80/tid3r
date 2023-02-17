class MissingFramesError extends Error {
    _frames: string[]
    _name: string
    _file: string

    constructor(
        frames: typeof MissingFramesError.prototype._frames,
        file: typeof MissingFramesError.prototype._file) {
        super()
        this._frames = frames
        this._name = 'MissingFrames'
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

export default MissingFramesError
