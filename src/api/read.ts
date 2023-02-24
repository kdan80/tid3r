import Reader from '../readers/Reader.js'

const read = (file_path: string) => {
    
    const x = new Reader(file_path)
    console.log(x)
}

export default read