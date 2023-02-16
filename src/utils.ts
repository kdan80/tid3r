
const split_string_to_array = (string: string, delimiter: string) => {
    return string.split(delimiter)
}

const checker = (arr: any) => {
    const tags = ["TPE1","TPE2","TIT2","TALB","TRCK","TPOS","TCON","TDAT","TYER","TORY","TLEN","TPUB"]
    return tags.every(tag => arr.includes(tag))
}