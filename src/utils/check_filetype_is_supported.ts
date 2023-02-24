import { supported_filetypes } from '../config/config.js'

const check_filetype_is_supported = (file_extension: string): boolean => {
    return supported_filetypes.includes(file_extension)
}

export default check_filetype_is_supported