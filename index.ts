
import fs from 'fs'

const file = "/home/kd/Projects/tid3r/media/cwm.mp3"

const stream = fs.createReadStream(file, {encoding: 'hex'})

let i = 0
stream.on('readable', () => {
    
    console.log('ind: ', i)	
    let chunk = stream.read()
    if (chunk.slice(0,6) === "494433") {
        console.log(chunk.slice(0,10))
    }	    

    i++
   
}); 

//console.log("file: ", file)
