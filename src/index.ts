import { check_audio_format_is_supported,
    read_audio_file_to_buffer,
    calculate_ID3_data_length_in_bytes,
    extract_ID3_magic_number,
    extract_ID3_length_bytes,
    convert_buffer_to_hex_string,
    compare_hexstring_to_ID3v2,
    extract_first_tag_header,
    readTagField,
    read_tag_header
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
    console.log(audio_file_buffer)
    
    // MN is bytes 0 to 2
    const id3_magic_number = extract_ID3_magic_number(audio_file_buffer)
    // console.log(id3_magic_number)

    const id3_magic_number_hex = convert_buffer_to_hex_string(id3_magic_number)
    // console.log(id3_magic_number_hex)

    const audio_file_is_id3 = compare_hexstring_to_ID3v2(id3_magic_number_hex)
    if (!audio_file_is_id3) throw new Error('Error: file is not ID3v2')
    // console.log('file is ID3v2')

    // The bytes that encode data length are bytes 6 to 9
    const id3_length_bytes = extract_ID3_length_bytes(audio_file_buffer)
    // console.log(id3_length_bytes)

    const id3_length = calculate_ID3_data_length_in_bytes(id3_length_bytes)
    console.log(id3_length)

    // First tag header is bytes 10 to 19
    const first_tag_header = extract_first_tag_header(audio_file_buffer)
    console.log(first_tag_header)

    const first_tag_title = first_tag_header.slice(0,4).toString()
    const first_tag_length = first_tag_header.slice(4,8).readUint32BE()
    const first_tag_flags = first_tag_header.slice(8,9)
    console.log(first_tag_title)

    const x = readTagField(audio_file_buffer, 20, first_tag_length)
    console.log('Tag Field is: ', x)
    
    const tag_header = read_tag_header(audio_file_buffer, 10)
    console.log(tag_header)

} catch (err: any) {
    console.log(err.message)
}