import FileStat from '../readers/FileStat.js'
import read_header_to_buffer from '../utils/read_header_to_buffer.js'
import FlacReader from '../readers/FlacReader.js'
import ID3Reader from '../readers/ID3Reader.js'
import path from 'path'
import {f} from '../utils/read_file_to_buffer.js'

const read = async(bool: boolean) => {
    
    const x = f(true)
    
    console.log(f)
}

export default read

















// import FileStat from '../readers/FileStat.js'
// import read_header_to_buffer from '../utils/read_header_to_buffer.js'
// import FlacReader from '../readers/FlacReader.js'
// import ID3Reader from '../readers/ID3Reader.js'
// import path from 'path'

// const read = async(file_path: string) => {
    
//     try {

//         // We read the file first as this will confirm that both the path and file are valid
//         const file_header = await read_header_to_buffer(file_path)
//         console.log('file_header: ', file_header)
        
//         const file_stat = new FileStat(file_path, file_header)
//         console.log(file_stat)
        
//         const tag_type = file_stat.tag_type
//         if (!tag_type) throw new Error('No supported tag found.')

//         const Reader = (tag_type === 'id3') ? ID3Reader : FlacReader

//         const reader = new Reader(file_path, file_header)

//         const type = reader.type
//         console.log('reader: ', reader)

//     } catch(err) {
//         console.log(err)
//     }

// }

// export default read