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

    type FrameFlags = {
        message: {
            tag_alter_preservation: boolean
            file_alter_preservation: boolean
            read_only: boolean
        },
        format: {
            grouping_identity: boolean
            compression: boolean
            encryption: boolean
            unsynchronisation: boolean
            data_length_indicator: boolean
        }
    }

    type HeaderFlags = {
        unsynchronisation: boolean
        extended_header: boolean
        experimental_indicator: boolean
        footer_present: boolean
    }

    type Frame = {
        id: string
        description?: string
        data: Buffer
        flags?: FrameFlags
        length: number
    }
    
    type ID3Header = {
        version: string
        major: number
        revision: number
        flags?: HeaderFlags
        length: number
    }
}

export {}

