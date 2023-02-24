import Reader from '../readers/Reader.js'
import read_header_to_buffer from '../utils/read_header_to_buffer.js'

const read = async(file_path: string) => {
    
    try {

        const file_header = await read_header_to_buffer(file_path)
        console.log('file_header: ', file_header)
        
        let x = new Reader(file_path, file_header)
        console.log(x)

        x.set_file_type()
        

    } catch(err) {
        console.log(err)
    }

}

export default read