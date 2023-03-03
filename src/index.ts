import read_file_to_buffer from './utils/read_file_to_buffer.js'
import determine_tag_type from './utils/determine_tag_type.js'

const mp3_v2 = '/home/kd/Projects/tid3r/media/id3v2.mp3'
const flac = '/home/kd/Projects/tid3r/media/flac.flac'

const mp3_v1 = '/home/kd/Projects/tid3r/media/id3v1.mp3'

const err_flac = '/home/kd/Projects/tid3r/media/err.flac'
const err_mp3 = '/home/kd/Projects/tid3r/media/err.mp3'

const main = async() => {

    const file = mp3_v2

    const { ok: file_successfully_read, data: file_data } = await read_file_to_buffer(file)
    if (!file_successfully_read) return console.log('read err: ', file_data)

    const { ok: tag_was_determined, data: data_2 } = determine_tag_type(file_data)
    if (!tag_was_determined) return console.log('parse err: ', data_2)
    console.log('tag_type: ', data_2)

}

main()