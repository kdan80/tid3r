declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    
    interface Tags {
        "TPE1": string | undefined
        "TPE2": string | undefined
        "TIT2": string | undefined
        "TIT3": string | undefined
        "TALB": string | undefined
        "TRCK": string | undefined
        "TPOS": string | undefined
        "TPUB": string | undefined
        "TCON": string | undefined
        "TDAT": string | undefined
        "TYER": string | undefined
        "TORY": string | undefined
        "TLEN": string | undefined
    }

    interface Data {
        "type": string | undefined
        "version": string | undefined
        "major": number | undefined
        "revision": number | undefined
        "flags": {
            "unsynchronisation": boolean,
            "extended_header": boolean,
            "experimental_indicator": boolean,
            "footer_present": boolean
        }
        "length": number | undefined,
        "tags": Tags
    }
}

export {}