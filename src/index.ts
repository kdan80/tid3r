import { check_audio_format_is_supported,
    read_audio_file_to_buffer,
    calculate_ID3_data_length_in_bytes,
    extract_ID3_magic_number,
    extract_ID3_length_bytes,
    convert_buffer_to_hex_string,
    compare_hexstring_to_ID3v2,
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
    
    const id3_magic_number = extract_ID3_magic_number(audio_file_buffer)
    // console.log(id3_magic_number)

    const id3_magic_number_hex = convert_buffer_to_hex_string(id3_magic_number)
    // console.log(id3_magic_number_hex)

    const audio_file_is_id3 = compare_hexstring_to_ID3v2(id3_magic_number_hex)
    if (!audio_file_is_id3) throw new Error('Error: file is not ID3v2')
    // console.log('file is ID3v2')

    const id3_length_bytes = extract_ID3_length_bytes(audio_file_buffer)
    // console.log(id3_length_bytes)

    const id3_length = calculate_ID3_data_length_in_bytes(id3_length_bytes)
    console.log(id3_length)

} catch (err: any) {
    console.log(err.message)
}