
import fs from 'fs'

interface TagHeader {
	major_version?: string
	minor_version?: string
	unsynchronisation?: boolean
	extended_header?: boolean
	experimental?: boolean
	footer?: boolean
	flags?: any
	size?: any
}

const file = "/home/kd/Projects/tid3r/media/cwm.mp3"

const stream = fs.createReadStream(file, {encoding: 'hex'})

let i = 0

let tag_header: TagHeader = {}

const hex2bin = (hex: string) => {
	return (parseInt(hex, 16).toString(2)).padStart(8, '0')
}

stream.on('readable', () => {

    let chunk = stream.read()
	if (chunk === null) return
    if (chunk.slice(0,6) !== "494433" && i === 0) return 


  	if ( i === 0 ){
		tag_header.major_version = chunk.slice(6,8)
		tag_header.minor_version = chunk.slice(9,11)
		const flags = hex2bin(chunk.slice(12,13))
		tag_header.flags = flags
		console.log('head: ', tag_header)

	}

	i++
   
}); 

//console.log("file: ", file)
