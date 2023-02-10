import { check_audio_format_is_supported,
    read_audio_file_to_buffer,
    calculate_ID3_data_length_in_bytes,
    extract_ID3_magic_number,
    extract_ID3_length_bytes,
    convert_buffer_to_hex_string,
    compare_hexstring_to_ID3v2,
    read_id3_header,
    read_frame,
    read_frame_header,
} from './read_file.js'

const id3v2_file = '/home/kd/Projects/tid3r/media/id3v2.mp3'
const id3v1_file = '/home/kd/Projects/tid3r/media/id3v1.mp3'
const flac_file = '/home/kd/Projects/tid3r/media/flac.flac'
const test_file = '/home/kd/Projects/tid3r/media/test.txt'

try {

    const audio_file = id3v2_file

    const file_is_supported = check_audio_format_is_supported(audio_file)
    if (!file_is_supported) throw new Error('Error: File is not supported')
    
    const audio_file_buffer = await read_audio_file_to_buffer(audio_file)
    // console.log(audio_file_buffer)
    
    const id3_header = read_id3_header(audio_file_buffer)
    console.log(id3_header)
    if (id3_header.major !== 3) throw new Error('Error: Only version 2.3 (and it\'s revisions) is supported')
    
    let i = 10
    let data = []
    while (i < id3_header.length) {
        const frame_header = read_frame_header(audio_file_buffer, i)
        const frame_data = read_frame(audio_file_buffer, i + 10, frame_header.length)
        const tag = {
            field: frame_header.field,
            data: frame_data
        }
        data.push(tag)
        i = i + frame_header.length + 10
    }

    console.log(data)

} catch (err: any) {
    console.log(err.message)
}