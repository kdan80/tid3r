const ID3v2 = Buffer.from('494433', 'hex')

export const data: Data = {
  "track_title": undefined,
  "artists": undefined,
  "album_artist": undefined,
  "track_number": undefined,
  "total_tracks": undefined,
  "disc_number": undefined,
  "total_discs": undefined,
  "album_title": undefined,
  "genre": undefined,
  "publisher": undefined,
  "release_year": undefined,
  "original_release_year": undefined,
  //"duration": undefined,
}

export const frames = [
  "TPE1", // Artist
  "TPE2", // Album Artist
  "TIT2", // Track Title
  "TALB", // Album Title
  "TRCK", // Track Number eg 1/12
  "TPOS", // Disc Number eg 1/2
  "TCON", // Genre
  "TYER", // Release year
  "TORY", // Original releas year
  //"TLEN", // Length
  "TPUB", // Publisher
]

const tags: Tags = {
  "TPE1": "",
  "TPE2": "",
  "TIT2": "",
  "TALB": "",
  "TRCK": "",
  "TPOS": "",
  "TCON": "",
  "TYER": "",
  "TORY": "",
  "TLEN": "",
  "TPUB": ""
}

export const mp3 = {
  tags: tags,
  frames: frames,
}