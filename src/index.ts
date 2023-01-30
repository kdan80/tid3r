import fs from 'fs'

// async function example() {
//   try {
//     const data = await fs.readFile('/home/kd/Projects/Anoid/media/intro.mp3', { encoding: 'base64' });
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }
// example();

async function readFirstNBytes(path: fs.PathLike, n: number): Promise<Buffer> {
    const chunks = [];
    for await (let chunk of fs.createReadStream(path, { start: 0, end: n })) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}

try {
    const magicNumber = await readFirstNBytes('/home/kd/Projects/Anoid/media/intro.mp3', 2)
    console.log(magicNumber)
} catch(err: any) {
    console.log('There was an error')
}

