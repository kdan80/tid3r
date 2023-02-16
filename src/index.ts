import { check_audio_format_is_supported,
    read_audio_file_to_buffer,
    read_id3_header,
    read_frame_data,
    read_frame_header,
} from './read_file.js'
import * as config from './config.js'

const id3v2_file = '/home/kd/Projects/tid3r/media/id3v2.mp3'

const FRAMES = [
    "TPE1", // Artist
    "TPE2", // Album Artist
    "TIT2", // Track Title
    "TALB", // Album Title
    "TRCK", // Track Number eg 1/12
    "TPOS", // Disc Number eg 1/2
    "TCON", // Genre
    "TYER", // Release year
    "TORY", // Original releas year
    "TLEN", // Length
    "TPUB", // Publisher
    //"TEST" // For Error Testing
]

try {

    const audio_file = id3v2_file
    let tags = config.tags
    
    // This is array will be used to generate errors for missing metadata
    let missing_frames = []

    const file_is_supported = check_audio_format_is_supported(audio_file)
    if (!file_is_supported) throw new Error('Error: File is not supported')
    
    const audio_file_buffer = await read_audio_file_to_buffer(audio_file)
    // console.log(audio_file_buffer)
    
    const id3_header = read_id3_header(audio_file_buffer)
    // console.log(id3_header)
    if (id3_header.type !== 'ID3') throw new Error('Error: No ID3 magic number found')
    if (id3_header.major !== 3) throw new Error('Error: Only version 2.3 is supported')
    
    let i = 10
    
    while (i < id3_header.length) {
        const frame_header = read_frame_header(audio_file_buffer, i)

        if (FRAMES.includes(frame_header.field)) {
            const frame_data = read_frame_data(audio_file_buffer, i + 10, frame_header.length)
            
            // If data is an empty string add it to missing frames array
            if (!frame_data) missing_frames.push(frame_header.field)

            //console.log(frame_header.field, frame_data, typeof(frame_data))

            tags = {
                ...tags,
                [`${frame_header.field}`]: frame_data
            }

            // If we were able to generate metadata from the frame we can remove it from [FRAMES]
            // Any frames that are not found will be left in the [FRAMES] and added to [missing_frames] later
            const index = FRAMES.indexOf(frame_header.field)
            FRAMES.splice(index, 1)
        }
        
        // Move to the next frame
        i = i + frame_header.length + 10
    }

    // Add the unfound frames in [FRAMES] to [missing_frames]
    missing_frames = missing_frames.concat(FRAMES)
    console.log('missing frames', missing_frames)
    if (missing_frames.length !== 0) throw new Error('Error: missing data')

    console.log('tags: ', tags)

    const data: Data = {
        "track_title": tags.TIT2,
        "artists": tags.TPE1?.split(';'),
        "album_artist": tags.TPE2,
        "album_title": tags.TALB,
        "track_number": parseInt(tags.TRCK?.split('/')[0]),
        "total_tracks": parseInt(tags.TRCK?.split('/')[1]),
        "disc_number": parseInt(tags.TPOS?.split('/')[0]),
        "total_discs": parseInt(tags.TPOS?.split('/')[1]),
        "genre": tags.TCON?.split(';'),
        "publisher": tags.TPUB,
        "release_year": parseInt(tags.TYER),
        "original_release_year": parseInt(tags.TORY),
        "duration": parseInt(tags.TLEN)
    }

    console.log('data: ', data)
    

} catch (err: any) {
    console.log(err.message)
}
