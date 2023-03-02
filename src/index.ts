import read_file_to_buffer from './utils/read_file_to_buffer.js'

const mp3_v2 = '/home/kd/Projects/tid3r/media/id3v2.mp3'
const flac = '/home/kd/Projects/tid3r/media/flac.flac'

const mp3_v1 = '/home/kd/Projects/tid3r/media/id3v1.mp3'

const err_flac = '/home/kd/Projects/tid3r/media/err.flac'
const err_mp3 = '/home/kd/Projects/tid3r/media/err.mp3'

const main = async() => {

    const file = mp3_v2

    const { ok, data } = await read_file_to_buffer(file)
    if (!ok) return console.log('err: ', data)


    
    
}

main()