const is_valid_string = (frame_data: string) => {
    return frame_data.length > 0
}

// ID3 track and disc numbers are formatted as sets eg 1/12 2/2
// Splitting the string via the / delimeter should yield an array of 2 numbers
const is_valid_set = (frame_data: string) => {
    const arr = frame_data.split('/')
    if (arr.length !== 2) return false

    // Check that both values in the array are actually numbers
    if (isNaN(parseInt(arr[0])) || isNaN(parseInt(arr[1]))) return false
    return true
}

const is_valid_year = (frame_data: string) => {
    if (frame_data.length !== 4) return false

    const year = parseInt(frame_data)
    return !isNaN(year)
}

const is_valid_length = (frame_data: string) => {
    const length = parseInt(frame_data)

    if (isNaN(length)) return false
    return length > 0
}

export {
    is_valid_length,
    is_valid_set,
    is_valid_year,
    is_valid_string
}