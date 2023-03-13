import { IOEither } from 'fp-ts/lib/IOEither.js'
import * as fsp from 'fs/promises'
import * as IO from 'fp-ts/lib/IOEither.js'
import path from 'path'
import match from './match.js'


export const f = (x: boolean): IOEither<string,string> => {
    return x ? IO.right('pass') : IO.left('fail')
}

const read_file_to_buffer = async (file_path: string): Promise<Result<Buffer, string>> => {
    try {
        const audio_file_buffer = await fsp.readFile(file_path)
        return {
            ok: true,
            data: audio_file_buffer
        }
    } catch (err)  {

        // Node errors are of the standard js Error type
        if (err instanceof Error) {
            const code = err.code
            const file_name = path.basename(file_path)

            const error_message = match(code)
                .on((code) => code === 'ENOENT' && file_name !== '', () => { return `${file_name} does not exist.` })
                .on((code) => code === 'ENOENT', () => { return 'No filename detected.' })
                .on((code) => code === 'EISDIR', () => { return 'File is a directory.' })
                .otherwise(x => { return 'There was an error trying to read the file.' })

            return {
                ok: false,
                data: error_message
            }
        }
        
        return {
            ok: false,
            data: `Unable to read file.`
        }
    }
}

export default read_file_to_buffer























// import * as fsp from 'fs/promises'
// import path from 'path'
// import match from './match.js'

// const read_file_to_buffer = async (file_path: string): Promise<Result<Buffer, string>> => {
//     try {
//         const audio_file_buffer = await fsp.readFile(file_path)
//         return {
//             ok: true,
//             data: audio_file_buffer
//         }
//     } catch (err)  {

//         // Node errors are of the standard js Error type
//         if (err instanceof Error) {
//             const code = err.code
//             const file_name = path.basename(file_path)

//             const error_message = match(code)
//                 .on((code) => code === 'ENOENT' && file_name !== '', () => { return `${file_name} does not exist.` })
//                 .on((code) => code === 'ENOENT', () => { return 'No filename detected.' })
//                 .on((code) => code === 'EISDIR', () => { return 'File is a directory.' })
//                 .otherwise(x => { return 'There was an error trying to read the file.' })

//             return {
//                 ok: false,
//                 data: error_message
//             }
//         }
        
//         return {
//             ok: false,
//             data: `Unable to read file.`
//         }
//     }
// }

// export default read_file_to_buffer