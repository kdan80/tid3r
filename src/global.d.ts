declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    
    interface Tags {
        "TPE1": string
        "TPE2": string
        "TIT2": string
        "TALB": string
        "TRCK": string
        "TPOS": string
        "TCON": string
        "TYER": string 
        "TLEN": string
        "TORY": string
        "TPUB": string
    }

    interface Data {
        "track_title": string | undefined
        "artists": string[] | undefined
        "album_artist": string | undefined
        "track_number": number | undefined
        "total_tracks": number | undefined
        "disc_number": number | undefined
        "total_discs": number | undefined
        "album_title": string | undefined
        "genre": string[] | undefined
        "publisher": string | undefined
        "release_year": number | undefined
        "original_release_year": number | undefined
        //"duration": number | undefined
    }
}

export {}

