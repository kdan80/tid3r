import * as validators from './validators.js'
import path from 'path'

class Frame {
    frame: string
    frame_data: string
    path: string
    file: string
    correct_format: string

    constructor(
        frame: typeof Frame.prototype.frame,
        frame_data: typeof Frame.prototype.frame_data,
        file: typeof Frame.prototype.file,
    ) {
        this.frame = frame
        this.path = path.dirname(file)
        this.file = path.basename(file)
        this.frame_data = frame_data
        this.correct_format = `${this.frame} encodes ` + this.#compose_format_message()
    }

    validate() {
        switch (this.frame) {
            case 'TPE1':
            case 'TPE2':
            case 'TIT2':
            case 'TALB':
            case 'TCON':
            case 'TPUB':
                return validators.is_valid_string(this.frame_data)
            case 'TYER':
            case 'TORY':
                return validators.is_valid_year(this.frame_data)
            case 'TRCK':
            case 'TPOS':
                return validators.is_valid_set(this.frame_data)
            default:
                return false
        }
    }

    #compose_format_message() {
        switch (this.frame) {
            case 'TPE1':
                return `the artist(s) name. Multiple artists should be separated with a semi-colon e.g. artist 1; artist 2; artist 3.`
            case 'TPE2':
                return `the album artist name. It can be different from the track artist e.g. Various Artists for a compilation album.`
            case 'TIT2':
                return `the track title or name.`
            case 'TALB':
                return `the album title or name.`
            case 'TCON':
                return `the genre(s) or content type. Multiple genres should be separated by a forward slash e.g. rock/indie/garage.`
            case 'TPUB':
                return `the publisher or record label.`
            case 'TYER':
                return `the year the track/album was released. It may be different from TORY (original release year) if it is part of a remaster/re-release.`
            case 'TORY':
                return 'the original release year of the track/album.'
            case 'TRCK':
                return 'the track number. It should be formatted as current/total e.g. 1/12 for the first track, 2/12 for the second etc.'
            case 'TPOS':
                return 'the disc number. It should be formatted as current/total e.g. 1/2 for disc one, 2/2 for disc two etc.'
            default:
                return 'Unable to determine format.'
        }
    }


}

export default Frame