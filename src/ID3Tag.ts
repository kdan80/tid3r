// import {
//     get_synchsafe_integer_32,
//     get_integer_24
// } from './helpers.js'

// // Offsets
// const FLAGS = 5;
// const SIZE = 6;
// const EXTENDED_HEADER = 10;
// const EXTENDED_FLAGS_V3 = 14;
// const EXTENDED_FLAGS_V4 = 15;
// const START_EXTENDED_DATA_V3 = 20;
// const START_EXTENDED_DATA_V4 = 16;
// // Sizes
// const HEADER_SIZE = 10;

// class IDE3Tag {
//     _size: number
//     _major: number
//     _revision: number
//     _contents: Buffer
//     _frames: Frame[]
//     _extendedHeader: {
//         UPDATE: number,
//         CRC: number,
//         RESTRICTIONS: number
//     };
//     //_hasExtendedHeader: boolean;
//     _nextFrameOffset: number;

//     constructor(
//         major: typeof IDE3Tag.prototype._major, 
//         revision: typeof IDE3Tag.prototype._revision
//     ) {
//         if (major < 2 || major > 4) {
//             throw new Error(`Major version ${major} is not supported`);
//         }

//         this._size = this._update_size()
//         this._major = major
//         this._revision = revision
//         this._contents = Buffer.from([
//             49, 44, 33,     // ID3 magic number
//             major,          
//             revision, 
//             0,              // Flags
//             0, 0, 0, 0      // Length    
//         ])
//         this._frames = [{
//             id: '',
//             description: '',
//             data: Buffer.from([0]),
//             length: 0
//         }]
//         this._extendedHeader = {
//         // key: length
//         'UPDATE': 0,
//         'CRC': 0,
//         'RESTRICTIONS': 0
//         }
//         this._nextFrameOffset = this._size + HEADER_SIZE;
//     }

    

//     _update_size(): number {
//         // Header (10 bytes) is not included in the size.
//         let size = 0

//         this._frames.forEach(frame => {
//             size += frame.length
//         })

//         return size;
//     }

//     _getData(offset: number, length: number): Buffer {
//         return this._contents.subarray(offset, offset + length);
//     }

//     addFrame(
//         id: string,
//         data: Buffer,
//         flags?: FrameFlags,
//         noFlagsDataLength?: number
//     ) {
//         let length = 0
//         let frame_flags = [0, 0]

//         if (flags) {
//             flags.message = flags.message || {}
//             flags.format = flags.format || {}
//         }

//         // data = data || Buffer.from([0,0,0,0])
    
//         let data_length = data.length

//         // x & (1 << 7) will evaluate to 128 if the MSB is set and 0 if not
//         // If the MSB is set then the unsynchronisation flag is set
//         let frame_uses_unsync_scheme = Boolean(this._contents[FLAGS] & (1 << 7))

//         if (frame_uses_unsync_scheme) {
//             let unsync_byte_count = 0;
    
//             for (let i = 0; i < data.length - 1; i++) {
//                 if (data[i] === 0xff && data[i+1] === 0x00) {
//                     unsync_byte_count++
//                 }
//             }

//             data_length -= unsync_byte_count;
//         }
    
//         if (this._major === 2) {
//             length = get_integer_24(data_length)
            
//         } else if (this._major === 3) {
//             length = get_integer_24(data_length)
//             if (flags) {
//                 frame_flags[0] |= (flags.message.tag_alter_preservation ? 1 : 0) << 7;
//                 frame_flags[0] |= (flags.message.file_alter_preservation ? 1 : 0) << 6;
//                 frame_flags[0] |= (flags.message.read_only ? 1 : 0) << 5;
//                 frame_flags[1] |= (flags.format.compression ? 1 : 0) << 7;
//                 frame_flags[1] |= (flags.format.encryption ? 1 : 0) << 6;
//                 frame_flags[1] |= (flags.format.grouping_identity ? 1 : 0) << 5;
//             }
//         } else if (this._major === 4) {
//           if (flags) {
//             frame_flags[0] |= (flags.message.tag_alter_preservation ? 1 : 0) << 6;
//             frame_flags[0] |= (flags.message.file_alter_preservation ? 1 : 0) << 5;
//             frame_flags[0] |= (flags.message.read_only ? 1 : 0) << 4;
//             frame_flags[1] |= (flags.format.grouping_identity ? 1 : 0) << 6;
//             frame_flags[1] |= (flags.format.compression ? 1 : 0) << 3;
//             frame_flags[1] |= (flags.format.encryption ? 1 : 0) << 2;
//             frame_flags[1] |= (flags.format.unsynchronisation ? 1 : 0) << 1;
//             frame_flags[1] |= flags.format.data_length_indicator ? 1 : 0;
//             if (flags.format.data_length_indicator) {
//                 data_length += 4;
//             }
//           }
//           length = get_synchsafe_integer_32(data_length)
//         } else {
//           throw Error("Major version not supported");
//         }

//         let frame: Frame = {
//             id,
//             length,
//             //flags: frame_flags,
//             data,
//             // flags && flags.format.data_length_indicator && noFlagsDataLength
//             //     ? get_synchsafe_integer_32(noFlagsDataLength)
//             //     : [],
          
//         }

//         if (!this._frames[id]) {
//           this._frames[id] = [];
//         }
//         this._frames[id].push(frame);
//         this._addData(this._nextFrameOffset, frame);
    
//         this._update_size();
//         return this;
//       }
// }

// export default IDE3Tag