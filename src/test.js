export const get_synchsafe_integer_32 = (buffer) => {
    // 0x7f = 0b01111111
    return  (buffer[0] << 21) 
        |   (buffer[1] << 14) 
        |   (buffer[2] << 7) 
        |   (buffer[3])
}

const buff = Buffer.from([0,0,2,12])

const x = get_synchsafe_integer_32(buff)

console.log(buff)