import { check_audio_format_is_supported,
    read_audio_file_to_buffer,
    read_id3_header,
    read_frame,
    read_frame_header,
} from './read_file.js'
import * as config from './config.js'

const id3v2_file = '/home/kd/Projects/tid3r/media/id3v2.mp3'

const FRAMES = new Map([
    ['TIT2', 'Title'],
    ['TIT3', 'Subtitle'],
    ['TPE1', 'Artist'],
    ['TLEN', 'Length'],
    ['TPE2', 'Additional Artists'],
    ['TPUB', 'Publisher'],
    ['TRCK', 'Track Number'],
    ['TPOS', 'Disc Number'],
    ['TALB', 'Album'],
    ['TIME', 'Time'],
    ['TCON', 'Genre'],
    ['TYER', 'Year'],
    ['TORY', 'Original Release Year'],
    ['TDAT', 'Date'],
    ['TLEN', 'Length']
]) 

try {

    const audio_file = id3v2_file
    let data = config.data
    let tags = data.tags

    const file_is_supported = check_audio_format_is_supported(audio_file)
    if (!file_is_supported) throw new Error('Error: File is not supported')
    
    const audio_file_buffer = await read_audio_file_to_buffer(audio_file)
    // console.log(audio_file_buffer)
    
    const id3_header = read_id3_header(audio_file_buffer)
    // console.log(id3_header)
    if (id3_header.major !== 3) throw new Error('Error: Only version 2.3 is supported')
    data = {
        ...data,
        ...id3_header
    }
    
    let i = 10
    
    while (i < id3_header.length) {
        const frame_header = read_frame_header(audio_file_buffer, i)

        if (FRAMES.has(frame_header.field)) {
            const frame_data = read_frame(audio_file_buffer, i + 10, frame_header.length)
            tags = {
                ...tags,
                [`${frame_header.field}`]: frame_data,
            }
        }
        
        i = i + frame_header.length + 10
    }

    data = {
        ...data,
        "tags": tags
    }

    console.log('data: ', data)

} catch (err: any) {
    console.log(err.message)
}