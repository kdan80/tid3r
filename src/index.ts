import { check_audio_format_is_supported,
    read_audio_file_to_buffer,
    calculate_ID3_data_length_in_bytes } from './read_file.js'

const id3v2_file = '/home/kd/Projects/tid3r/media/id3v2.mp3'
const id3v1_file = '/home/kd/Projects/tid3r/media/id3v1.mp3'
const flac_file = '/home/kd/Projects/tid3r/media/flac.flac'
const test_file = '/home/kd/Projects/tid3r/media/test.txt'

