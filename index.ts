
import fs from 'fs'

const file = "/home/kd/Projects/tid3r/media/cwm.mp3"

const stream = fs.createReadStream(file, {encoding: 'hex'})

stream.on('data', function (chunk) {
   
    if (chunk.slice(0,6) === "494433") {
        console.log(chunk.slice(0,10))
    }	    
   
}); 

//console.log("file: ", file)
