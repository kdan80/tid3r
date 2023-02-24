import read from "./api/read.js"

const mp3_v2 = '/home/kd/Projects/tid3r/media/id3v2.mp3'
const flac = '/home/kd/Projects/tid3r/media/flac.flac'
const dummy = '/home/kd/Projects/tid3r/media/flac.ddd'

const data = await read(flac)

console.log('data: ', data)










// import { check_audio_format_is_supported,
//     read_audio_file_to_buffer,
//     read_id3_header,
//     read_frame_data,
//     read_frame_header,
// } from './helpers.js'
// import {MissingFrameError, FrameFormattingError} from './Errors.js'
// import Frame from './Frame.js'
// import ID3Header from './ID3Header.js'
// import * as config from './config.js'

// const id3v2_file = '/home/kd/Projects/tid3r/media/id3v2.mp3'

// try {

//     const mp3_file = id3v2_file
//     const frames = config.mp3.frames
//     let tags = config.mp3.tags
//     let improperly_formatted_frames = []
//     let errors: any = []
    
//     // This is array will be used to generate errors for missing metadata
//     let missing_frames = []

//     const file_is_supported = check_audio_format_is_supported(mp3_file)
//     if (!file_is_supported) throw new Error('Error: File is not supported')
    
//     const mp3_file_buffer = await read_audio_file_to_buffer(mp3_file)

//     const id3_headerx = new ID3Header(mp3_file_buffer.subarray(0,10))
    
    
//     const id3_header = read_id3_header(mp3_file_buffer)
//     if (id3_header.type !== 'ID3') throw new Error('Error: No ID3 magic number found')
//     if (id3_header.major !== 3) throw new Error('Error: Only version 2.3 is supported')
    
//     let i = 10
    
//     while (i < id3_header.length) {
//         const frame_header = read_frame_header(mp3_file_buffer, i)

//         if (frames.includes(frame_header.field)) {
//             const frame_data = read_frame_data(mp3_file_buffer, i + 10, frame_header.length).toString()
            
//             // If data is an empty string add it to missing frames array
//             if (!frame_data) missing_frames.push(frame_header.field)

//             const frame = new Frame(frame_header.field, frame_data, mp3_file)

//             const frame_is_valid = frame.validate()
//             if (!frame_is_valid) {
//                 //const err = new FrameFormattingError(frame_header.field, mp3_file)
//                 improperly_formatted_frames.push(frame)
//             }
//             //console.log('data: ',frame_data,'is valid: ', frame_is_valid)

//             tags = {
//                 ...tags,
//                 [`${frame_header.field}`]: frame_data
//             }

//             // If we were able to generate metadata from the frame we can remove it from [frames]
//             // Any frames that are not found will be left in the [frames] and added to [missing_frames] later
//             const index = frames.indexOf(frame_header.field)
//             frames.splice(index, 1)
//         }
        
//         // Move to the next frame
//         i = i + frame_header.length + 10
//     }

//     if (improperly_formatted_frames.length > 0) {
//         improperly_formatted_frames.forEach(frame => {
//             const err = new FrameFormattingError(frame)
//             errors.push(err)
//         })
//     }

//     // Add the unfound frames in [frames] to [missing_frames]
//     missing_frames = missing_frames.concat(frames)
//     if (missing_frames.length > 0) {
//         missing_frames.forEach(frame => {
//             const err = new MissingFrameError(frame, mp3_file)
//             errors.push(err)
//         })
        
//     }

//     if (errors.length > 0) throw errors

//     const data: Data = {
//         "track_title": tags.TIT2,
//         "artists": tags.TPE1?.split(';'),
//         "album_artist": tags.TPE2,
//         "album_title": tags.TALB,
//         "track_number": parseInt(tags.TRCK?.split('/')[0]),
//         "total_tracks": parseInt(tags.TRCK?.split('/')[1]),
//         "disc_number": parseInt(tags.TPOS?.split('/')[0]),
//         "total_discs": parseInt(tags.TPOS?.split('/')[1]),
//         "genre": tags.TCON?.split(';'),
//         "publisher": tags.TPUB,
//         "release_year": parseInt(tags.TYER),
//         "original_release_year": parseInt(tags.TORY),
//         //"duration": parseInt(tags.TLEN)
//     }

//     console.log('data: ', data)

// } catch (err: any) {
//     console.log(err)
    
//     if (err._name === 'MissingFrameError') {
//         err.log_missing_frames()
//     }

//     if (err._name === 'FrameFormattingError') {
//         err.log_frame_error()
//     }
// }
