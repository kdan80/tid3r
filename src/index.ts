import fs from 'fs'

const ID3v2 = Buffer.from('494433', 'hex')

async function readFirstNBytes(path: fs.PathLike, n: number): Promise<Buffer> {
    const chunks = []
    for await (const chunk of fs.createReadStream(path, { start: 0, end: n })) {
      chunks.push(chunk)
    }
    
    return Buffer.concat(chunks)
}

try {
    const magicNumber = await readFirstNBytes('/home/kd/Projects/Anoid/media/intro.mp3', 2)
    const bufferComparison = Buffer.compare(magicNumber, ID3v2)
    
    if (bufferComparison === 0) console.log('Valid mp3 file')
} catch(err: any) {
    console.log('There was an error')
}

