import * as fsp from 'fs/promises'
import path from 'path'

// The ID3 Tag header is encoded in the first 10 bytes of an ID3 Mp3 file
// $49 44 33 yy yy xx zz zz zz zz
// Where; 49 44 33 = ID3, yy is less than $FF, xx is the ‘flags’ byte and zz is less than $80.

// Magic numbers/file signatures for various file formats stored as hex strings
const magic_number_ID3v2 = '494433'
const magic_number_ID3v1 = 'fffb'
const magic_number_flac = '664c6143'

// Convert a number to 8 bit encoded byte
const to_bin = (num: number) => {
    return ("000000000" + num.toString(2)).substr(-8)
}


export const check_audio_format_is_supported = (audio_file_path: string): boolean => {
    const file_extension = path.extname(audio_file_path).toLowerCase()
    return ['.mp3', '.flac'].includes(file_extension)
}

export const read_audio_file_to_buffer = async(audio_file_path: string): Promise<Buffer> => {
    const audio_file_buffer = await fsp.readFile(audio_file_path);
    return audio_file_buffer;
}

export const calculate_ID3_data_length_in_bytes = (ID3_length_bytes: Buffer) => {
    return  (ID3_length_bytes.readUInt8(0) << 21) 
            |   (ID3_length_bytes.readUInt8(1) << 14) 
            |   (ID3_length_bytes.readUInt8(2) << 7) 
            |   (ID3_length_bytes.readUInt8(3))
}

export const get_synchsafe_integer_32 = (buffer: Buffer) => {
    return  (buffer[0] << 21) 
        |   (buffer[1] << 14) 
        |   (buffer[2] << 7) 
        |   (buffer[3])
}

export const get_integer_24 = (buffer: Buffer) => {
    return  (buffer[0] << 16)
        |   (buffer[1] << 8) 
        |   (buffer[2])
    
  }

export const read_header_flags = (flags_byte: number) => {
    return {
        unsynchronisation: Boolean(flags_byte & (1 << 7)),
        extended_header: Boolean(flags_byte & (1 << 6)),
        experimental_indicator: Boolean(flags_byte & (1 << 5))
    }
}

export const read_id3_header = (buffer: Buffer) => {
    const type = buffer.subarray(0,3).toString()
    if (type !== 'ID3') return {
        type: undefined,
        version: undefined,
        major: undefined,
        revision: undefined,
        length: undefined
    }

    const major = buffer[3]
    const revision = buffer[4]
    const version = `2.${major}.${revision}`
    const length = calculate_ID3_data_length_in_bytes(buffer.subarray(6,10))
    const flags = read_header_flags(buffer[5])

    return {type, version, major, revision, flags, length}
}

export const read_frame_header = (buffer: Buffer, offset: number)  => {
    const field = buffer.subarray(offset,offset + 4).toString()
    const length = buffer.subarray(offset + 4, offset + 8).readUint32BE()
    return {
        field: field,
        length: length
    }
}

export const readIso8859 = (buffer: Buffer, offset: number, length = Infinity) => {
    const bytes = []
    let i = 0
    while (buffer.readUInt8(offset + i) !== 0 && i < length) {
        bytes.push(buffer.readUInt8(offset + i))
        i += 1
    }
    return [new TextDecoder("iso-8859-1").decode(Uint8Array.from(bytes)), i]
}

const readUtf16 = (buffer: Buffer, offset: number, length = Infinity) => {
    const bytes = []
    let i = 0
    while (buffer.readUInt16BE(offset + i) !== 0 && i < length) {
        bytes.push(buffer.readUInt8(offset + i))
        bytes.push(buffer.readUInt8(offset + i + 1))
        i += 2
    }
    let encoding
    if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
        encoding = "utf-16le"
    } else if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
        encoding = "utf-16be"
    }
    return [new TextDecoder(encoding).decode(Uint8Array.from(bytes.slice(2))), i]
}

export const read_frame_data = (buffer: Buffer, offset: number, length: number) => {
    const encodingType = buffer.readUInt8(offset)
    return encodingType === 1
        ? readUtf16(buffer, offset + 1, length - 1)[0]
        : readIso8859(buffer, offset + 1, length - 1)[0]
}

validate_id3_v2() :boolean {

    const v2_magic_number = Buffer.from([49,44,33])
    const header_magic_number = this._data.subarray(0,2)
    const buffer_comparison = Buffer.compare(v2_magic_number, header_magic_number)
    
    return (buffer_comparison === 0)
}

validate_header() {
    return (
        this.validate_id3_v2()
    )
}

set_length() :number {
    // Header (10 bytes) is not included in the size.
    let length = 0
    const length_bytes = this._data.subarray(LENGTH, LENGTH + 4)
    length = get_synchsafe_integer_32(length_bytes)
    return length
}

set_major_version() :number {
    if (this._data[MAJOR] > 0xFE) throw Error('MAJOR version is out of range.')
    return this._data[MAJOR]
}

set_revision_version() :number {
    if (this._data[REVISION] > 0xFE) throw Error('REVISION version is out of range.')
    return this._data[REVISION]
}

set_flags() {

    const flags = read_header_flags(this._data[FLAGS])
    return flags
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

// addFrame(
//     id: string,
//     data: Buffer,
//     flags?: FrameFlags,
//     noFlagsDataLength?: number
// ) {
//     let length = 0
//     let frame_flags = [0, 0]

//     if (flags) {
//         flags.message = flags.message || {}
//         flags.format = flags.format || {}
//     }

//     // data = data || Buffer.from([0,0,0,0])

//     let data_length = data.length

//     // x & (1 << 7) will evaluate to 128 if the MSB is set and 0 if not
//     // If the MSB is set then the unsynchronisation flag is set
//     let frame_uses_unsync_scheme = Boolean(this._contents[FLAGS] & (1 << 7))

//     if (frame_uses_unsync_scheme) {
//         let unsync_byte_count = 0;

//         for (let i = 0; i < data.length - 1; i++) {
//             if (data[i] === 0xff && data[i+1] === 0x00) {
//                 unsync_byte_count++
//             }
//         }

//         data_length -= unsync_byte_count;
//     }

//     if (this._major === 2) {
//         length = get_integer_24(data_length)
        
//     } else if (this._major === 3) {
//         length = get_integer_24(data_length)
//         if (flags) {
//             frame_flags[0] |= (flags.message.tag_alter_preservation ? 1 : 0) << 7;
//             frame_flags[0] |= (flags.message.file_alter_preservation ? 1 : 0) << 6;
//             frame_flags[0] |= (flags.message.read_only ? 1 : 0) << 5;
//             frame_flags[1] |= (flags.format.compression ? 1 : 0) << 7;
//             frame_flags[1] |= (flags.format.encryption ? 1 : 0) << 6;
//             frame_flags[1] |= (flags.format.grouping_identity ? 1 : 0) << 5;
//         }
//     } else if (this._major === 4) {
//       if (flags) {
//         frame_flags[0] |= (flags.message.tag_alter_preservation ? 1 : 0) << 6;
//         frame_flags[0] |= (flags.message.file_alter_preservation ? 1 : 0) << 5;
//         frame_flags[0] |= (flags.message.read_only ? 1 : 0) << 4;
//         frame_flags[1] |= (flags.format.grouping_identity ? 1 : 0) << 6;
//         frame_flags[1] |= (flags.format.compression ? 1 : 0) << 3;
//         frame_flags[1] |= (flags.format.encryption ? 1 : 0) << 2;
//         frame_flags[1] |= (flags.format.unsynchronisation ? 1 : 0) << 1;
//         frame_flags[1] |= flags.format.data_length_indicator ? 1 : 0;
//         if (flags.format.data_length_indicator) {
//             data_length += 4;
//         }
//       }
//       length = get_synchsafe_integer_32(data_length)
//     } else {
//       throw Error("Major version not supported");
//     }

//     let frame: Frame = {
//         id,
//         length,
//         //flags: frame_flags,
//         data,
//         // flags && flags.format.data_length_indicator && noFlagsDataLength
//         //     ? get_synchsafe_integer_32(noFlagsDataLength)
//         //     : [],
      
//     }

//     if (!this._frames[id]) {
//       this._frames[id] = [];
//     }
//     this._frames[id].push(frame);
//     this._addData(this._nextFrameOffset, frame);

//     this._update_size();
//     return this;
//   }